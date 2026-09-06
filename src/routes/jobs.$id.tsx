import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToJob, getJob, toggleSave } from "@/lib/hunt";
import { ExpiredGate } from "@/components/pass-lock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/jobs/$id")({ component: JobDetail });

function JobDetail() {
  const { id } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const qc = useQueryClient();
  const job = useQuery({ queryKey: ["job", id], queryFn: () => getJob({ data: { id } }) });
  const save = useMutation({
    mutationFn: () => toggleSave({ data: { jobId: id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["job", id] }),
  });
  const apply = useMutation({
    mutationFn: () => applyToJob({ data: { jobId: id } }),
    onSuccess: () => {
      const url = job.data && job.data.ok ? job.data.job.applicationUrl : "";
      if (url) window.open(url, "_blank", "noopener");
      void qc.invalidateQueries({ queryKey: ["job", id] });
    },
  });

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;
  if (job.data?.ok === false && job.data.reason === "locked") return <ExpiredGate />;
  if (job.data?.ok === false) {
    return (
      <p className="text-sm">
        Listing missing. <Link to="/jobs">Back to jobs</Link>
      </p>
    );
  }
  if (!job.data?.ok) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const card = job.data.job;
  const m = card.match;

  return (
    <article className="space-y-5">
      <p className="text-xs text-muted-foreground">
        <Link to="/jobs">Jobs</Link> / {card.company}
      </p>
      <h1 className="font-display text-3xl font-medium tracking-tight">{card.title}</h1>
      <p className="text-sm text-muted-foreground">
        {card.company} · {card.location}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="outline">{card.salary}</Badge>
        <Badge variant="outline">{card.workMode}</Badge>
        <Badge variant="outline">{card.experience}</Badge>
        {card.fresherOk ? <Badge variant="outline">Fresher</Badge> : null}
      </div>
      <section className="rounded-2xl border border-border bg-card p-4">
        <p className="text-sm font-medium">{m.total}% match</p>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          <li>Skills match: {m.skills}%</li>
          <li>Education match: {m.education}%</li>
          <li>Experience match: {m.experience}%</li>
          <li>Location match: {m.location}%</li>
          <li>Fresher eligibility: {m.fresher}%</li>
        </ul>
      </section>
      <p className="text-sm leading-relaxed">{card.description}</p>
      <p className="text-xs text-faint">
        {card.education} · Apply by {card.deadline ?? "rolling"} · Source {card.source}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => save.mutate()}>
          {card.saved ? "Saved" : "Save"}
        </Button>
        <Button className="flex-1" onClick={() => apply.mutate()} disabled={!job.data.access.active && !card.applicationStatus}>
          {card.applicationStatus ? "Applied — open form" : "Apply"}
        </Button>
      </div>
    </article>
  );
}
