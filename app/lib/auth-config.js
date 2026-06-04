// Shared cookie configuration for auth sessions.
// __Secure- prefix requires HTTPS; use plain name in development.
// TODO(security): In production, use __Host- prefix if no subdomain cookies are needed.

const isProduction = process.env.NODE_ENV === "production";

export const SESSION_COOKIE_NAME = isProduction
  ? "__Secure-postai-session"
  : "postai-session";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};
