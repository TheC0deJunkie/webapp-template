import { Link, Outlet } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";

// App shell: sticky header (logo + theme toggle), routed content, footer.
// Pages rendered inside this layout via <Outlet /> inherit the chrome.
export const MainLayout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <Logo className="h-7 w-auto" />
        </Link>
        <nav className="flex items-center gap-2">
          <ModeToggle />
        </nav>
      </div>
    </header>

    <main className="flex-1">
      <Outlet />
    </main>

    <footer className="border-t border-border">
      <div className="container flex h-14 items-center text-sm text-muted-foreground">
        Built from webapp-template.
      </div>
    </footer>
  </div>
);

export default MainLayout;
