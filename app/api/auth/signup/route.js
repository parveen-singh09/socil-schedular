import { cookies } from "next/headers";
import { createUser, createSession } from "@/app/lib/auth-store";
import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/app/lib/auth-config";

// TODO(security): Add CSRF token validation for production.
// TODO(security): Add rate limiting to prevent brute-force attacks.

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // --- Input Validation ---
    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return Response.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return Response.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return Response.json(
        { error: "Password must not exceed 128 characters." },
        { status: 400 }
      );
    }

    // --- Create User ---
    const user = await createUser(name, email, password);
    if (!user) {
      // Generic error message to prevent user enumeration
      return Response.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // --- Create Session ---
    const sessionToken = createSession(user.id);

    // Set HttpOnly session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, SESSION_COOKIE_OPTIONS);

    return Response.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch {
    // Generic error - do not expose internal details
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
