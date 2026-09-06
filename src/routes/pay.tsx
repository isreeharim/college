import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { buyPass, getHuntState } from "@/lib/hunt";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/pay")({ component: Pay });

function Pay() {
  const { user, isPending } = useCurrentUserState();
  const nav = useNavigate();
  const state = useQuery({ queryKey: ["hunt"], queryFn: () => getHuntState() });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  async function pay() {
    setBusy(true);
    setError(null);
    try {
      await buyPass();
      await state.refetch();
      nav({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">Payment</p>
      <h1 className="font-display mt-2 text-3xl font-medium tracking-tight">Unlock for ₹199</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Dummy checkout for the MVP. This records a paid pass and starts your 24-hour clock immediately.
      </p>
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-card">
        <p className="text-sm">Job Hunt Pass</p>
        <p className="font-display mt-1 text-3xl">₹199</p>
        <p className="mt-2 text-sm text-muted-foreground">24 hours of search, match, save, and apply.</p>
      </div>
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
      <Button className="mt-6 h-12 w-full" disabled={busy} onClick={() => void pay()}>
        {busy ? "Confirming…" : "Pay ₹199 — start hunt"}
      </Button>
      <p className="mt-4 text-center text-sm text-faint">
        <Link to="/dashboard">Back to dashboard</Link>
      </p>
    </div>
  );
}
