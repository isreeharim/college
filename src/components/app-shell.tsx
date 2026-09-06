import { type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bookmark,
  Briefcase,
  CircleUser,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const APP_NAV = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Search },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/applications", label: "Tracker", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: CircleUser },
] as const;

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="size-8 animate-pulse rounded-full bg-secondary" />;
  if (user) return <UserButton />;
  return (
    <Button asChild size="sm" variant="outline">
      <Link to="/login">Sign in</Link>
    </Button>
  );
}

export function MarketingChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark className="size-8 text-primary" />
          <span className="font-display text-lg font-medium">CollegeCentre</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/pricing">Pricing</Link>
          </Button>
          <AuthSlot />
        </div>
      </header>
      {children}
    </div>
  );
}

export function StudentChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-background pb-20">
      <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-sm">
        <Link to="/dashboard" className="flex items-center gap-2">
          <LogoMark className="size-7 text-primary" />
          <span className="font-display text-lg font-medium">CollegeCentre</span>
        </Link>
        <div className="ml-auto">
          <AuthSlot />
        </div>
      </header>
      <main className="mx-auto w-full max-w-lg px-4 py-5">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-1 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {APP_NAV.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px] font-medium",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2 : 1.6} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const student =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/jobs") ||
    pathname.startsWith("/saved") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/pay");
  if (student) return <StudentChrome>{children}</StudentChrome>;
  return <MarketingChrome>{children}</MarketingChrome>;
}
