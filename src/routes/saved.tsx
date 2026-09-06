import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listSaved, toggleSave } from "@/lib/hunt";
import { JobCard } from "@/components/job-card";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/saved")({ component: SavedPage });

function SavedPage() {
  const { user, isPending } = useCurrentUserState();
  const qc = useQueryClient();
  const saved = useQuery({ queryKey: ["saved"], queryFn: () => listSaved() });
  const unsave = useMutation({
    mutationFn: (jobId: string) => toggleSave({ data: { jobId } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved"] }),
  });

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-medium tracking-tight">Saved jobs</h1>
      <p className="text-sm text-muted-foreground">These stay on your account after the pass ends.</p>
      {saved.data?.length
        ? saved.data.map((job) => (
            <JobCard key={job.id} job={job} onSave={() => unsave.mutate(job.id)} />
          ))
        : (
          <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
        )}
    </div>
  );
}
