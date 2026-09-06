import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { buyPass, getHuntState } from "@/lib/hunt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-extrabold tracking-[1.7px] text-[#777] uppercase">24-hour pass</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Start your job hunt</h1>
      </div>
      <Card>
        <CardHeader>
          <CardDescription>Dummy checkout — no real charge.</CardDescription>
          <CardTitle className="text-[40px] font-extrabold">
            ₹199 <span className="text-sm font-medium text-muted-foreground">/ 24 hours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Search, match, save and apply until the clock ends.</p>
        </CardContent>
      </Card>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button className="h-12 w-full rounded-[10px] font-bold" disabled={busy} onClick={() => void pay()}>
        {busy ? "Confirming…" : "Pay ₹199"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        <Link to="/dashboard">Back to dashboard</Link>
      </p>
    </div>
  );
}
