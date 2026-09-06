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
  const [minSalary, setMinSalary] = useState(0);
  const [experience, setExperience] = useState("");
  const [sort, setSort] = useState<"match" | "newest">("match");
  const jobs = useQuery({
    queryKey: ["jobs", q, location, workMode, category, fresherOnly, minSalary, experience, sort],
    queryFn: () =>
      listJobs({
        data: { q, location, workMode, category, fresherOnly, minSalary, experience, sort },
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
        <SelectField value={String(minSalary)} onChange={(e) => setMinSalary(Number(e.target.value))}>
          <option value="0">Any salary</option>
          <option value="3">₹3 LPA+</option>
          <option value="4">₹4 LPA+</option>
          <option value="5">₹5 LPA+</option>
          <option value="6">₹6 LPA+</option>
        </SelectField>
        <SelectField value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option value="">Any experience</option>
          <option value="0">0 years / fresher</option>
          <option value="1">0–1 years</option>
        </SelectField>
        <SelectField value={sort} onChange={(e) => setSort(e.target.value as "match" | "newest")}>
          <option value="match">Best match</option>
          <option value="newest">Newest</option>
        </SelectField>
        <label className="col-span-2 flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm">
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
