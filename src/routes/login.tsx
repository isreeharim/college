import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0] || "Student",
          callbackURL: "/",
        });
        if (res.error) throw new Error(res.error.message || "Could not create account");
      } else {
        const res = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/",
        });
        if (res.error) throw new Error(res.error.message || "Could not sign in");
      }
      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md py-6">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Account
      </p>
      <h1 className="font-display mt-2 text-4xl font-medium tracking-tight">
        Sign in
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Save your planner across devices. Campus stays anonymous either way.
      </p>

      {!authEnabled ? (
        <p className="mt-8 text-sm text-muted-foreground">Sign-in is disabled.</p>
      ) : (
        <div className="mt-8 space-y-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full"
            disabled={busy}
            onClick={() => {
              setBusy(true);
              setError(null);
              void authClient.signIn
                .social({ provider: "google", callbackURL: "/" })
                .then((res) => {
                  if (res.error) throw new Error(res.error.message || "Google sign-in failed");
                  if (res.data?.url) window.location.href = res.data.url;
                })
                .catch((err) => {
                  setError(
                    err instanceof Error
                      ? err.message
                      : "Google sign-in is not connected yet",
                  );
                  setBusy(false);
                });
            }}
          >
            Continue with Google
          </Button>
          {GROK_PROVIDERS.filter((p) => p.idp !== "google").map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant="outline"
              className="h-11 w-full"
              disabled={busy}
              onClick={() => {
                setBusy(true);
                setError(null);
                void signIn(p.providerId, { callbackURL: "/" }).catch((err) => {
                  setError(err instanceof Error ? err.message : "Sign-in failed");
                  setBusy(false);
                });
              }}
            >
              Continue with {p.label}
            </Button>
          ))}

          <div className="flex items-center gap-3 py-2">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs tracking-wide text-faint uppercase">or email</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-3" onSubmit={onEmail}>
            {mode === "up" ? (
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            ) : null}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={mode === "up" ? "new-password" : "current-password"}
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : null}
            <Button type="submit" className="h-11 w-full" disabled={busy}>
              {busy
                ? "Please wait…"
                : mode === "up"
                  ? "Create account"
                  : "Sign in with email"}
            </Button>
          </form>

          <button
            type="button"
            className="w-full pt-1 text-center text-sm text-muted-foreground hover:text-foreground"
            onClick={() => {
              setMode(mode === "in" ? "up" : "in");
              setError(null);
            }}
          >
            {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-faint">
        <Link to="/" className="hover:text-foreground">
          Back to home
        </Link>
      </p>
    </div>
  );
}
