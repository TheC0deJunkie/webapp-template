// Route guard for authenticated pages.
//
//   no token / 401  → loading=false, user=null → redirect to LOGIN_PATH
//   probe ok        → loading=false, user set  → render children
//
// AuthContext performs the probe on mount; while it runs, loading=true and a
// neutral splash is shown instead of flashing a redirect.

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LOGIN_PATH } from "@/lib/api";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/10 animate-pulse" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to={LOGIN_PATH} replace />;

  return <>{children}</>;
};
