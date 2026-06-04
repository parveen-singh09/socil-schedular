import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import clientPromise from "./mongodb";

// TODO(security): For production, MongoDB access policies should restrict DB user privileges (RBAC).

/**
 * Get database instance.
 */
async function getDb() {
  const client = await clientPromise;
  return client.db("social_scheduler");
}

/**
 * Find a user by email (case-insensitive).
 */
export async function findUserByEmail(email) {
  if (typeof email !== "string") {
    return null;
  }
  const db = await getDb();
  const normalizedEmail = email.toLowerCase().trim();
  return await db.collection("users").findOne({ email: normalizedEmail });
}

/**
 * Create a new user with hashed password.
 * Returns the created user (without passwordHash) or null if email exists.
 */
export async function createUser(name, email, password) {
  if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
    return null;
  }

  const db = await getDb();
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user already exists
  const existingUser = await db.collection("users").findOne({ email: normalizedEmail });
  if (existingUser) {
    return null; // user already exists
  }

  // Hash password with bcrypt (cost factor 10)
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: uuidv4(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  await db.collection("users").insertOne(user);

  return { id: user.id, name: user.name, email: user.email };
}

/**
 * Verify a user's password.
 * Returns user info (without passwordHash) or null if invalid.
 */
export async function verifyUser(email, password) {
  if (typeof email !== "string" || typeof password !== "string") {
    return null;
  }
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return { id: user.id, name: user.name, email: user.email };
}

/**
 * Create a new session for a user.
 * Returns the session token.
 */
export async function createSession(userId) {
  if (typeof userId !== "string") {
    throw new Error("Invalid userId");
  }
  const db = await getDb();

  // Clean up expired sessions (older than 7 days)
  const now = Date.now();
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const cutoff = new Date(now - SEVEN_DAYS).toISOString();
  await db.collection("sessions").deleteMany({
    createdAt: { $lt: cutoff }
  });

  const token = uuidv4();
  await db.collection("sessions").insertOne({
    token,
    userId,
    createdAt: new Date().toISOString(),
  });

  return token;
}

/**
 * Validate a session token.
 * Returns user info or null if invalid/expired.
 */
export async function validateSession(token) {
  if (!token || typeof token !== "string") return null;

  const db = await getDb();
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return null;

  // Check expiration (7 days)
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - new Date(session.createdAt).getTime() > SEVEN_DAYS) {
    // Remove expired session
    await db.collection("sessions").deleteOne({ token });
    return null;
  }

  const user = await db.collection("users").findOne({ id: session.userId });
  if (!user) return null;

  return { id: user.id, name: user.name, email: user.email };
}

/**
 * Delete a session (logout).
 */
export async function deleteSession(token) {
  if (!token || typeof token !== "string") return;
  const db = await getDb();
  await db.collection("sessions").deleteOne({ token });
}

/**
 * Delete all sessions for a user.
 */
export async function deleteAllUserSessions(userId) {
  if (typeof userId !== "string") return;
  const db = await getDb();
  await db.collection("sessions").deleteMany({ userId });
}
