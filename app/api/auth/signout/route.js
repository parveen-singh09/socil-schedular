import { cookies } from "next/headers";
import { deleteSession } from "@/app/lib/auth-store";
import { SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/app/lib/auth-config";

export const dynamic = "force-dynamic";

// TODO(security): Add CSRF token validation for production.

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (sessionCookie && sessionCookie.value) {
      await deleteSession(sessionCookie.value);
    }

    // Clear the session cookie
    cookieStore.set(SESSION_COOKIE_NAME, "", {
      ...SESSION_COOKIE_OPTIONS,
      maxAge: 0, // Expire immediately
    });

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
