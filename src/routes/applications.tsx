import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listApplications, updateApplication } from "@/lib/hunt";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { STATUSES } from "@/lib/types";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/applications")({ component: AppsPage });

function AppsPage() {
  const { user, isPending } = useCurrentUserState();
  const qc = useQueryClient();
  const apps = useQuery({ queryKey: ["apps"], queryFn: () => listApplications() });
  const update = useMutation({
    mutationFn: (payload: {
      jobId: string;
      status: (typeof STATUSES)[number];
      notes: string;
      reminder: string;
    }) => updateApplication({ data: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["apps"] }),
  });

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-medium tracking-tight">Applications</h1>
      <p className="text-sm text-muted-foreground">
        Change status anytime — even weeks after a pass expires.
      </p>
      {apps.data?.length
        ? apps.data.map((item) => (
            <article key={item.appId} className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <h2 className="font-display text-lg font-medium">{item.job.title}</h2>
              <p className="text-sm text-muted-foreground">
                {item.job.company} · {item.job.location}
              </p>
              <Badge variant="outline" className="mt-2">
                {item.status}
              </Badge>
              <SelectField
                className="mt-3"
                value={item.status}
                onChange={(e) =>
                  update.mutate({
                    jobId: item.job.id,
                    status: e.target.value as (typeof STATUSES)[number],
                    notes: item.notes,
                    reminder: item.reminder,
                  })
                }
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </SelectField>
              <Textarea
                className="mt-3"
                defaultValue={item.notes}
                placeholder="Notes, recruiter name, next step"
                onBlur={(e) =>
                  update.mutate({
                    jobId: item.job.id,
                    status: item.status,
                    notes: e.target.value,
                    reminder: item.reminder,
                  })
                }
              />
              <Input
                className="mt-3"
                defaultValue={item.reminder}
                placeholder="Reminder — e.g. follow up Friday"
                onBlur={(e) =>
                  update.mutate({
                    jobId: item.job.id,
                    status: item.status,
                    notes: item.notes,
                    reminder: e.target.value,
                  })
                }
              />
              <p className="mt-2 text-xs text-faint">Applied {item.appliedAt.slice(0, 10)}</p>
            </article>
          ))
        : (
          <p className="text-sm text-muted-foreground">No applications yet.</p>
        )}
    </div>
  );
}
