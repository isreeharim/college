import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { OpeningCard } from "@/components/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { OPENINGS, type Opening, type OpeningKind } from "@/lib/data/openings";
import { useSaved, type JobStatus } from "@/lib/stores/saved";
import { formatDeadline, relativeDeadline } from "@/lib/utils";

type Search = { open?: string };

export const Route = createFileRoute("/jobs")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    open: typeof s.open === "string" ? s.open : undefined,
  }),
  component: JobsPage,
});

function JobsPage() {
  const { open: openId } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<OpeningKind | "all">("all");
  const jobs = useSaved((s) => s.jobs);
  const setJob = useSaved((s) => s.setJob);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return OPENINGS.filter((o) => {
      if (kind !== "all" && o.kind !== kind) return false;
      if (!query) return true;
      return `${o.title} ${o.company} ${o.location} ${o.tags.join(" ")}`
        .toLowerCase()
        .includes(query);
    });
  }, [q, kind]);

  const selected = OPENINGS.find((o) => o.id === openId) ?? null;

  function setOpen(id: string | undefined) {
    void navigate({ search: { open: id } });
  }

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Work
        </p>
        <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
          Internships & jobs
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Fresh listings for 2026–28 batches. Track applied and interview without
          making an account — it stays on this device.
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Company, role, city…"
          aria-label="Search jobs"
        />
        <SelectField
          value={kind}
          onChange={(e) => setKind(e.target.value as OpeningKind | "all")}
        >
          <option value="all">Internships and fresher roles</option>
          <option value="internship">Internships only</option>
          <option value="fresher">Fresher roles only</option>
        </SelectField>
      </div>

      {Object.keys(jobs).length > 0 ? (
        <p className="text-sm text-muted-foreground">
          Tracking {Object.keys(jobs).length} role
          {Object.keys(jobs).length > 1 ? "s" : ""} on this device.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((o) => (
          <OpeningCard key={o.id} opening={o} onOpen={(id) => setOpen(id)} />
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={(v) => !v && setOpen(undefined)}>
        <SheetContent side="right" className="overflow-y-auto">
          {selected ? (
            <JobDetail
              opening={selected}
              status={jobs[selected.id]}
              onStatus={(s) => setJob(selected.id, s)}
            />
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function JobDetail({
  opening,
  status,
  onStatus,
}: {
  opening: Opening;
  status?: JobStatus;
  onStatus: (s: JobStatus | null) => void;
}) {
  return (
    <>
      <SheetHeader>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {opening.company}
        </p>
        <SheetTitle>{opening.title}</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-4 px-6 py-5">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {opening.kind === "internship" ? "Internship" : "Fresher"}
          </Badge>
          <Badge variant="outline">{opening.location}</Badge>
          {opening.remote ? <Badge variant="outline">Remote ok</Badge> : null}
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-faint">Pay</dt>
            <dd className="font-medium">{opening.pay}</dd>
          </div>
          <div>
            <dt className="text-xs text-faint">Batch</dt>
            <dd className="font-medium">{opening.batch}</dd>
          </div>
          <div>
            <dt className="text-xs text-faint">Deadline</dt>
            <dd className="font-medium">
              {formatDeadline(opening.deadline)} · {relativeDeadline(opening.deadline)}
            </dd>
          </div>
        </dl>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {opening.description}
        </p>
        <p className="text-sm">
          <span className="font-medium">Eligibility. </span>
          {opening.eligibility}
        </p>
        <div className="flex flex-wrap gap-2">
          {opening.tags.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Your tracker
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(["saved", "applied", "interview"] as const).map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant={status === s ? "default" : "outline"}
                onClick={() => onStatus(status === s ? null : s)}
              >
                {s === "saved" ? "Saved" : s === "applied" ? "Applied" : "Interview"}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
