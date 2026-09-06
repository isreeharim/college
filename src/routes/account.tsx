import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getHuntState } from "@/lib/hunt";
import { PassChip } from "@/components/pass-lock";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/client";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const { user, isPending } = useCurrentUserState();
  const me = useCurrentUser();
  const hunt = useQuery({ queryKey: ["hunt"], queryFn: () => getHuntState() });

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="space-y-5">
      <h1 className="font-display text-3xl font-medium tracking-tight">Account</h1>
      <p className="text-sm">{me?.displayName || me?.primaryEmail}</p>
      {hunt.data ? <PassChip access={hunt.data.access} /> : null}
      <div className="flex flex-col gap-2">
        <Button asChild variant="outline">
          <Link to="/profile">Edit profile</Link>
        </Button>
        <Button asChild>
          <Link to="/pay">Get 24 Hours — ₹199</Link>
        </Button>
        <Button variant="outline" onClick={() => void signOut()}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
