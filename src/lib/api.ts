// Authenticated fetch wrapper for your backend API.
//
// Pattern: a single wrapper owns the token (localStorage), the base URL (env),
// and the 401 handling. Data hooks import apiFetch from here rather than
// calling fetch/localStorage directly.

export const AUTH_TOKEN_KEY = "app_auth_token";

// Where unauthenticated users are sent. Create this page when you add auth.
export const LOGIN_PATH = "/signin";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

// Called on 401 to clear the stale token. A full location.replace is
// intentional — it guarantees all in-memory user state is cleared.
function forceLogout(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  if (!window.location.pathname.startsWith(LOGIN_PATH)) {
    window.location.replace(LOGIN_PATH);
  }
}

// Drop-in replacement for fetch() on authenticated API routes.
// - Prepends API_BASE so callers write apiFetch("/api/me"), not a full URL.
// - Attaches Authorization: Bearer <token> if a token is present.
// - On 401: clears the token + redirects to LOGIN_PATH.
// - Throws on network errors; returns the Response on any non-401 status so
//   callers can handle 4xx/5xx themselves.
export async function apiFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const headers = new Headers(init.headers ?? {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (res.status === 401) {
    forceLogout();
    // Return the response so the caller doesn't crash (they'll be redirected
    // before they can do anything with it).
    return res;
  }

  return res;
}
