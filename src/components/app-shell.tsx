import { type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bookmark,
  Briefcase,
  CircleUser,
  LayoutDashboard,
  Search,
  Sparkles,
} from "lucide-react";
import { Wordmark } from "@/components/logo";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const APP_NAV = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Search },
  { to: "/agent", label: "Agent", icon: Sparkles },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/applications", label: "Tracker", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: CircleUser },
] as const;

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <div className="size-9 animate-pulse rounded-[10px] bg-secondary" />;
  if (user) return <UserButton />;
  return (
    <Button asChild size="sm" variant="outline" className="rounded-[10px]">
      <Link to="/login">Profile</Link>
    </Button>
  );
}

export function MarketingChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border bg-card px-[6%]">
        <Link to="/" className="flex items-center">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link to="/pricing" className="hidden text-sm text-[#333] sm:inline">
            Pricing
          </Link>
          <Link to="/login" className="hidden text-sm text-[#333] sm:inline">
            Jobs
          </Link>
          <AuthSlot />
        </nav>
      </header>
      {children}
    </div>
  );
}

export function StudentChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-background pb-20">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card px-4">
        <Link to="/dashboard">
          <Wordmark />
        </Link>
        <AuthSlot />
      </header>
      <main className="mx-auto w-full max-w-lg px-4 py-5 md:max-w-5xl">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card px-1 pt-1 pb-[max(0.4rem,env(safe-area-inset-bottom))]">
        <ul className="mx-auto grid max-w-lg grid-cols-6">
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
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.2 : 1.6} />
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
    pathname.startsWith("/agent") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/pay");
  if (student) return <StudentChrome>{children}</StudentChrome>;
  return <MarketingChrome>{children}</MarketingChrome>;
}
