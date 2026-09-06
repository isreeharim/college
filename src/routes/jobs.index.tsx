import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToJob, listJobs, toggleSave } from "@/lib/hunt";
import { JobCard } from "@/components/job-card";
import { ExpiredGate } from "@/components/pass-lock";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { CATEGORIES, WORK_MODES } from "@/lib/types";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/jobs/")({ component: JobsPage });

function JobsPage() {
  const { user, isPending } = useCurrentUserState();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("Any");
  const [category, setCategory] = useState("");
  const [fresherOnly, setFresherOnly] = useState(false);
  const jobs = useQuery({
    queryKey: ["jobs", q, location, workMode, category, fresherOnly],
    queryFn: () =>
      listJobs({
        data: { q, location, workMode, category, fresherOnly, minSalary: 0 },
      }),
  });
  const save = useMutation({
    mutationFn: (jobId: string) => toggleSave({ data: { jobId } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
  const apply = useMutation({
    mutationFn: (jobId: string) => applyToJob({ data: { jobId } }),
    onSuccess: (_d, jobId) => {
      const card = jobs.data?.jobs.find((j) => j.id === jobId);
      if (card) window.open(card.applicationUrl, "_blank", "noopener");
      void qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl font-medium tracking-tight">Find jobs</h1>
      <Input placeholder="Keyword, company, skill" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="City" value={location} onChange={(e) => setLocation(e.target.value)} />
        <SelectField value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
          {WORK_MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </SelectField>
        <SelectField value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm">
          <input type="checkbox" checked={fresherOnly} onChange={(e) => setFresherOnly(e.target.checked)} />
          Freshers only
        </label>
      </div>
      {jobs.data?.locked ? <ExpiredGate /> : null}
      {jobs.data && !jobs.data.locked
        ? jobs.data.jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={() => save.mutate(job.id)}
              onApply={() => apply.mutate(job.id)}
            />
          ))
        : null}
      {jobs.data && !jobs.data.locked && jobs.data.jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No listings match those filters.</p>
      ) : null}
    </div>
  );
}
