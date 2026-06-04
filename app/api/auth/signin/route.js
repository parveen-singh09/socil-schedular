import { cookies } from "next/headers";
import { verifyUser, createSession } from "@/app/lib/auth-store";
import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/app/lib/auth-config";

// TODO(security): Add CSRF token validation for production.
// TODO(security): Add rate limiting to prevent brute-force attacks.

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // --- Input Validation ---
    if (!email || typeof email !== "string") {
      return Response.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string") {
      return Response.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    // --- Verify Credentials ---
    const user = await verifyUser(email, password);
    if (!user) {
      // Generic error message to prevent credential enumeration
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // --- Create Session ---
    const sessionToken = await createSession(user.id);

    // Set HttpOnly session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, SESSION_COOKIE_OPTIONS);

    return Response.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch {
    // Generic error - do not expose internal details
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
