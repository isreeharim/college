import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToJob, listJobs, toggleSave } from "@/lib/hunt";
import { JobCard } from "@/components/job-card";
import { ExpiredGate } from "@/components/pass-lock";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [category, setCategory] = useState("all");
  const [fresherOnly, setFresherOnly] = useState(false);
  const [minSalary, setMinSalary] = useState("0");
  const [experience, setExperience] = useState("any");
  const [sort, setSort] = useState<"match" | "newest">("match");
  const jobs = useQuery({
    queryKey: ["jobs", q, location, workMode, category, fresherOnly, minSalary, experience, sort],
    queryFn: () =>
      listJobs({
        data: {
          q,
          location,
          workMode,
          category: category === "all" ? "" : category,
          fresherOnly,
          minSalary: Number(minSalary),
          experience: experience === "any" ? "" : experience,
          sort,
        },
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
      <h1 className="text-3xl font-extrabold tracking-tight">Find jobs</h1>
      <Input placeholder="Search jobs, skills, companies..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="City" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Select value={workMode} onValueChange={setWorkMode}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {WORK_MODES.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={minSalary} onValueChange={setMinSalary}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any salary</SelectItem>
            <SelectItem value="3">₹3 LPA+</SelectItem>
            <SelectItem value="4">₹4 LPA+</SelectItem>
            <SelectItem value="5">₹5 LPA+</SelectItem>
            <SelectItem value="6">₹6 LPA+</SelectItem>
          </SelectContent>
        </Select>
        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any experience</SelectItem>
            <SelectItem value="0">0 years / fresher</SelectItem>
            <SelectItem value="1">0–1 years</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as "match" | "newest")}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Best match</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
        <label className="col-span-2 flex min-h-11 items-center gap-2 rounded-[10px] border border-border bg-card px-3 text-sm">
          <Checkbox checked={fresherOnly} onCheckedChange={(v) => setFresherOnly(v === true)} />
          <Label className="font-normal">Freshers only</Label>
        </label>
      </div>
      {jobs.data?.locked ? <ExpiredGate /> : null}
      {jobs.data && !jobs.data.locked
        ? jobs.data.jobs.map((job) => (
            <JobCard key={job.id} job={job} onSave={() => save.mutate(job.id)} onApply={() => apply.mutate(job.id)} />
          ))
        : null}
      {jobs.data && !jobs.data.locked && jobs.data.jobs.length === 0 ? (
        <p className="text-sm text-muted-foreground">No listings match those filters.</p>
      ) : null}
    </div>
  );
}
