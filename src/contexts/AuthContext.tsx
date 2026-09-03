import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { apiFetch, AUTH_TOKEN_KEY, LOGIN_PATH } from "@/lib/api";

// Shape of the authenticated user returned by your backend's "who am I"
// endpoint. Adjust to match your API.
export interface AuthUser {
  id: string;
  name?: string;
  email?: string;
}

// Your backend's session-probe endpoint. It should return the AuthUser JSON
// for a valid bearer token and 401 otherwise.
const ME_ENDPOINT = "/api/me";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Probe the stored token, if any, exactly once on boot.
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await apiFetch(ME_ENDPOINT);
        if (cancelled) return;
        if (res.ok) {
          const data: AuthUser = await res.json();
          setUser(data);
        } else {
          // 401 handled inside apiFetch (token cleared + redirect). Other
          // non-ok statuses: clear locally and let ProtectedRoute redirect.
          localStorage.removeItem(AUTH_TOKEN_KEY);
          setUser(null);
        }
      } catch {
        if (cancelled) return;
        // Network-level failure (offline, or the fetch was aborted by a
        // navigation). Do NOT clear the token here: it says nothing about
        // token validity, and wiping it turns transient failures into forced
        // logouts. A genuinely bad token is cleared by the 401 path.
        setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setUser(null);
    window.location.replace(LOGIN_PATH);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
