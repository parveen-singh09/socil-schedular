import { cookies } from "next/headers";
import { validateSession } from "@/app/lib/auth-store";
import { SESSION_COOKIE_NAME } from "@/app/lib/auth-config";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie || !sessionCookie.value) {
      return Response.json({ user: null }, { status: 401 });
    }

    const user = await validateSession(sessionCookie.value);
    if (!user) {
      return Response.json({ user: null }, { status: 401 });
    }

    return Response.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 200 }
    );
  } catch {
    return Response.json({ user: null }, { status: 500 });
  }
}
