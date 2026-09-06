import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobCard as JobCardType } from "@/lib/types";
import { cn } from "@/lib/utils";

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
    <article className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            to="/jobs/$id"
            params={{ id: job.id }}
            className="font-display text-lg font-medium leading-snug tracking-tight"
          >
            {job.title}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            {job.company} · {job.location}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
            job.match.total >= 80
              ? "bg-accent text-primary"
              : "bg-secondary text-foreground",
          )}
        >
          {job.match.total}% match
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge variant="outline">{job.salary}</Badge>
        <Badge variant="outline">{job.workMode}</Badge>
        {job.fresherOk ? <Badge variant="outline">Fresher</Badge> : null}
        <Badge variant="outline">{job.category}</Badge>
      </div>
      <p className="mt-3 text-xs text-faint">Posted {job.postedAt}</p>
      <div className="mt-4 flex gap-2">
        {onSave ? (
          <Button type="button" variant="outline" size="sm" onClick={onSave}>
            <Bookmark className={cn("size-4", job.saved && "fill-current")} />
            {job.saved ? "Saved" : "Save"}
          </Button>
        ) : null}
        {onApply ? (
          <Button type="button" size="sm" className="flex-1" onClick={onApply}>
            {job.applicationStatus ? job.applicationStatus : "Apply"}
          </Button>
        ) : (
          <Button asChild size="sm" className="flex-1">
            <Link to="/jobs/$id" params={{ id: job.id }}>
              View
            </Link>
          </Button>
        )}
      </div>
    </article>
  );
}
