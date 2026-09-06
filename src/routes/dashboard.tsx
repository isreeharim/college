import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { dashboardStats, getHuntState } from "@/lib/hunt";
import { JobCard } from "@/components/job-card";
import { ExpiredGate, PassChip } from "@/components/pass-lock";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const { user, isPending } = useCurrentUserState();
  const stats = useQuery({ queryKey: ["dash"], queryFn: () => dashboardStats() });
  const hunt = useQuery({ queryKey: ["hunt"], queryFn: () => getHuntState() });

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  const data = stats.data;
  const profile = hunt.data?.profile;
  const incomplete = !profile?.college || !profile.skills;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Your job hunt
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-medium tracking-tight">24-hour pass</h1>
          {data ? <PassChip access={data.access} /> : null}
        </div>
      </div>

      {incomplete ? (
        <div className="rounded-2xl border border-border bg-card p-4 text-sm">
          Finish your profile so matches make sense.{" "}
          <Link to="/profile" className="font-medium underline-offset-4 hover:underline">
            Edit profile
          </Link>
        </div>
      ) : null}

      {data && !data.access.active ? <ExpiredGate /> : null}

      {data?.access.active ? (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="Jobs matched" value={data.matched} />
          <Stat label="High match" value={data.high} />
          <Stat label="Remote" value={data.remote} />
          <Stat label="Posted today" value={data.today} />
        </dl>
      ) : (
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <Stat label="Saved" value={data?.saved ?? 0} />
          <Stat label="Applied" value={data?.applied ?? 0} />
        </dl>
      )}

      {data?.access.active && data.recommended.length ? (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-medium">Recommended for you</h2>
          {data.recommended.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
          <Button asChild variant="outline" className="w-full">
            <Link to="/jobs">Browse all jobs</Link>
          </Button>
        </section>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-display mt-1 text-2xl font-medium">{value}</dd>
    </div>
  );
}
