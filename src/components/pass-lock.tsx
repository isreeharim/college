import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Access } from "@/lib/types";

export function formatRemaining(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  return `${h}h ${m}m`;
}

export function PassChip({ access }: { access: Access }) {
  const [left, setLeft] = useState(access.remainingMs);
  useEffect(() => {
    setLeft(access.remainingMs);
    if (!access.active || !access.expiresAt) return;
    const end = new Date(access.expiresAt).getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [access.active, access.expiresAt, access.remainingMs]);

  if (!access.active || left <= 0) {
    return (
      <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
        Pass expired
      </span>
    );
  }
  return (
    <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-primary">
      {formatRemaining(left)} left
    </span>
  );
}

export function ExpiredGate() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
        Locked
      </p>
      <h2 className="font-display mt-2 text-2xl font-medium tracking-tight">
        Your 24-hour Job Hunt Pass has expired.
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Your saved jobs and application tracker are still available. Get another
        24-hour pass for ₹199 to continue finding and applying to jobs.
      </p>
      <Button asChild className="mt-6 h-12 w-full">
        <Link to="/pay">Get 24 Hours — ₹199</Link>
      </Button>
    </section>
  );
}
