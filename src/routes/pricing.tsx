import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({ component: Pricing });

function Pricing() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Pricing
      </p>
      <h1 className="font-display mt-2 text-4xl font-medium tracking-tight">
        One pass. Twenty-four hours.
      </h1>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
        <p className="text-sm text-muted-foreground">Job Hunt Pass</p>
        <p className="font-display mt-2 text-4xl font-medium">₹199</p>
        <p className="mt-1 text-sm text-muted-foreground">Unlocks job discovery for 24 hours from payment.</p>
        <ul className="mt-6 space-y-2 text-sm leading-relaxed text-foreground">
          <li>Search, filter, and open every listing</li>
          <li>Match scores against your profile</li>
          <li>Save and apply during the window</li>
          <li>Tracker stays open after expiry</li>
        </ul>
        <Button asChild className="mt-6 h-12 w-full">
          <Link to="/signup">Get 24 Hours — ₹199</Link>
        </Button>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        There is no free job-search tier. Your account, profile, saved jobs, and
        applications are never deleted when a pass expires.
      </p>
    </div>
  );
}
