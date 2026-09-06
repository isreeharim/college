import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { askAgent } from "@/lib/agent";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/agent")({ component: AgentPage });

const PROMPTS = [
  "Best fresher software jobs for me",
  "Remote data roles this week",
  "How should I tailor my resume?",
  "Core engineering GET openings",
];

function AgentPage() {
  const { user, isPending } = useCurrentUserState();
  const [question, setQuestion] = useState("Best fresher jobs matching my profile");
  const ask = useMutation({
    mutationFn: () => askAgent({ data: { question } }),
  });

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-extrabold tracking-[1.7px] text-[#777] uppercase">Grok agent</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Ask for roles</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Matches your profile against the live job database and tells you where to apply first.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs"
            onClick={() => setQuestion(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <Textarea rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
      <Button className="h-12 w-full rounded-[10px] font-bold" disabled={ask.isPending} onClick={() => ask.mutate()}>
        {ask.isPending ? "Matching…" : "Ask Grok Agent"}
      </Button>
      {ask.data ? (
        <Card>
          <CardContent>
            <p className="text-sm leading-relaxed">{ask.data.answer}</p>
          </CardContent>
        </Card>
      ) : null}
      {ask.data?.jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
