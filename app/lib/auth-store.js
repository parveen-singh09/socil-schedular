import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const DATA_PATH = path.join(process.cwd(), "data", "users.json");

// TODO(security): For production, replace JSON file store with a real database (PostgreSQL, MongoDB, etc.)
// with proper mTLS connection, least-privilege DB user, and parameterized queries.

/**
 * Read the store from disk.
 */
function getStore() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { users: [], sessions: [] };
  }
}

/**
 * Write the store to disk.
 */
function saveStore(store) {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), "utf-8");
}

/**
 * Find a user by email (case-insensitive).
 */
export function findUserByEmail(email) {
  const store = getStore();
  const normalizedEmail = email.toLowerCase().trim();
  return store.users.find((u) => u.email === normalizedEmail) || null;
}

/**
 * Create a new user with hashed password.
 * Returns the created user (without passwordHash) or null if email exists.
 */
export async function createUser(name, email, password) {
  const store = getStore();
  const normalizedEmail = email.toLowerCase().trim();

  if (store.users.find((u) => u.email === normalizedEmail)) {
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

  store.users.push(user);
  saveStore(store);

  return { id: user.id, name: user.name, email: user.email };
}

/**
 * Verify a user's password.
 * Returns user info (without passwordHash) or null if invalid.
 */
export async function verifyUser(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return { id: user.id, name: user.name, email: user.email };
}

/**
 * Create a new session for a user.
 * Returns the session token.
 */
export function createSession(userId) {
  const store = getStore();

  // Clean up expired sessions (older than 7 days)
  const now = Date.now();
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  store.sessions = store.sessions.filter(
    (s) => now - new Date(s.createdAt).getTime() < SEVEN_DAYS
  );

  const token = uuidv4();
  store.sessions.push({
    token,
    userId,
    createdAt: new Date().toISOString(),
  });

  saveStore(store);
  return token;
}

/**
 * Validate a session token.
 * Returns user info or null if invalid/expired.
 */
export function validateSession(token) {
  if (!token) return null;

  const store = getStore();
  const session = store.sessions.find((s) => s.token === token);
  if (!session) return null;

  // Check expiration (7 days)
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - new Date(session.createdAt).getTime() > SEVEN_DAYS) {
    // Remove expired session
    store.sessions = store.sessions.filter((s) => s.token !== token);
    saveStore(store);
    return null;
  }

  const user = store.users.find((u) => u.id === session.userId);
  if (!user) return null;

  return { id: user.id, name: user.name, email: user.email };
}

/**
 * Delete a session (logout).
 */
export function deleteSession(token) {
  if (!token) return;
  const store = getStore();
  store.sessions = store.sessions.filter((s) => s.token !== token);
  saveStore(store);
}

/**
 * Delete all sessions for a user.
 */
export function deleteAllUserSessions(userId) {
  const store = getStore();
  store.sessions = store.sessions.filter((s) => s.userId !== userId);
  saveStore(store);
}
