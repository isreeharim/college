import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { authClient, authEnabled } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await authClient.signIn.email({ email, password, callbackURL: "/dashboard" });
      if (res.error) throw new Error(res.error.message || "Could not sign in");
      window.location.assign("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="font-display text-3xl font-medium tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your tracker stays with this account.</p>
      {!authEnabled ? (
        <p className="mt-6 text-sm text-muted-foreground">Sign-in is disabled.</p>
      ) : (
        <div className="mt-8 space-y-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full"
            disabled={busy}
            onClick={() => {
              setBusy(true);
              void authClient.signIn
                .social({ provider: "google", callbackURL: "/dashboard" })
                .then((res) => {
                  if (res.error) throw new Error(res.error.message || "Google unavailable");
                  if (res.data?.url) window.location.href = res.data.url;
                  else setBusy(false);
                })
                .catch((err) => {
                  setError(err instanceof Error ? err.message : "Google sign-in failed");
                  setBusy(false);
                });
            }}
          >
            Continue with Google
          </Button>
          <form className="space-y-3 pt-2" onSubmit={onSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="h-11 w-full" disabled={busy}>
              {busy ? "Please wait…" : "Sign in"}
            </Button>
          </form>
        </div>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/signup" className="text-foreground underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
