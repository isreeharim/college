import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { JobCard as JobCardType } from "@/lib/types";

export function JobCard({
  job,
  onSave,
  onApply,
}: {
  job: JobCardType;
  onSave?: () => void;
  onApply?: () => void;
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">{job.company}</p>
            <Link
              to="/jobs/$id"
              params={{ id: job.id }}
              className="mt-2 block text-lg font-semibold leading-snug tracking-tight"
            >
              {job.title}
            </Link>
          </div>
          <span className="h-max rounded-[7px] bg-accent px-2 py-1.5 text-[11px] font-extrabold">
            {job.match.total}% match
          </span>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-[#666]">
          {job.location}
          <br />
          {job.salary} · {job.jobType}
        </p>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {job.skills.split(",").slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-secondary px-2 py-1 text-[11px]">
              {tag.trim()}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {onSave ? (
            <Button type="button" variant="outline" size="sm" className="flex-1 rounded-[8px] font-semibold" onClick={onSave}>
              {job.saved ? "Saved" : "Save"}
            </Button>
          ) : null}
          {onApply ? (
            <Button type="button" size="sm" className="flex-1 rounded-[8px] font-semibold" onClick={onApply}>
              {job.applicationStatus ? "Applied" : "Apply now"}
            </Button>
          ) : (
            <Button asChild size="sm" className="flex-1 rounded-[8px] font-semibold">
              <Link to="/jobs/$id" params={{ id: job.id }}>
                View
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
