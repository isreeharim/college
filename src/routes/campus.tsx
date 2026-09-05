import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowBigUp } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { COLLEGES } from "@/lib/data/colleges";
import {
  CATEGORIES,
  CATEGORY_LABEL,
  createConfession,
  listConfessions,
  upvoteConfession,
  type Category,
  type Confession,
} from "@/lib/confessions";
import { usePrefs } from "@/lib/stores/prefs";
import { useSaved } from "@/lib/stores/saved";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campus")({ component: CampusPage });

function CampusPage() {
  const collegePref = usePrefs((s) => s.college);
  const [college, setCollege] = useState("all");
  const [category, setCategory] = useState<Category | "all">("all");
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["confessions", college, category],
    queryFn: () =>
      listConfessions({
        data: {
          college: college === "all" ? undefined : college,
          category: category === "all" ? undefined : category,
        },
      }),
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <header>
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Anonymous
        </p>
        <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
          Campus board
        </h1>
        <p className="mt-2 text-muted-foreground">
          No names. No profiles. Advice, rants, lost property, and the things
          the official group chat will not say. Default campus is {collegePref}.
        </p>
      </header>

      <Composer
        defaultCollege={collegePref}
        onPosted={() => {
          void queryClient.invalidateQueries({ queryKey: ["confessions"] });
        }}
      />

      <div className="grid gap-2 sm:grid-cols-2">
        <SelectField value={college} onChange={(e) => setCollege(e.target.value)}>
          <option value="all">All campuses</option>
          {COLLEGES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <SelectField
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
        >
          <option value="all">All threads</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </SelectField>
      </div>

      {list.isLoading ? (
        <p className="py-12 text-center text-sm text-muted-foreground">Loading the board…</p>
      ) : list.isError ? (
        <p className="rounded-3xl bg-card px-5 py-8 text-center text-sm text-destructive shadow-card">
          Could not load the board. Try again in a moment.
        </p>
      ) : list.data?.length === 0 ? (
        <p className="rounded-3xl bg-card px-5 py-12 text-center text-sm text-muted-foreground shadow-card">
          Quiet so far. Post the first note.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {list.data?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Composer({
  defaultCollege,
  onPosted,
}: {
  defaultCollege: string;
  onPosted: () => void;
}) {
  const [college, setCollege] = useState(defaultCollege);
  const [category, setCategory] = useState<Category>("confession");
  const [body, setBody] = useState("");
  useEffect(() => {
    setCollege(defaultCollege);
  }, [defaultCollege]);
  const mutation = useMutation({
    mutationFn: () => createConfession({ data: { college, category, body } }),
    onSuccess: () => {
      setBody("");
      toast.success("Posted anonymously");
      onPosted();
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Could not post");
    },
  });

  return (
    <form
      className="rounded-3xl bg-card p-4 shadow-card"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <SelectField value={college} onChange={(e) => setCollege(e.target.value)}>
          {COLLEGES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <SelectField
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </SelectField>
      </div>
      <Textarea
        className="mt-3"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={800}
        placeholder="Write it as you would on a bathroom stall — useful, not cruel. No names."
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs tabular-nums text-faint">{body.length}/800</span>
        <Button type="submit" disabled={body.trim().length < 12 || mutation.isPending}>
          {mutation.isPending ? "Posting…" : "Post anonymously"}
        </Button>
      </div>
    </form>
  );
}

function PostCard({ post }: { post: Confession }) {
  const voted = useSaved((s) => s.voted.includes(post.id));
  const markVoted = useSaved((s) => s.markVoted);
  const queryClient = useQueryClient();
  const vote = useMutation({
    mutationFn: () => upvoteConfession({ data: { id: post.id } }),
    onSuccess: () => {
      markVoted(post.id);
      void queryClient.invalidateQueries({ queryKey: ["confessions"] });
    },
  });
  const when = formatAgo(post.created_at);
  const cat = post.category as Category;

  return (
    <li className="rounded-3xl bg-card p-4 shadow-card">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{CATEGORY_LABEL[cat] ?? post.category}</Badge>
        <span className="text-xs text-faint">{post.college}</span>
        <span className="text-xs text-faint">· {when}</span>
      </div>
      <p className="text-sm leading-relaxed">{post.body}</p>
      <div className="mt-3">
        <Button
          type="button"
          size="sm"
          variant={voted ? "secondary" : "outline"}
          disabled={voted || vote.isPending}
          onClick={() => vote.mutate()}
          className={cn("gap-1")}
        >
          <ArrowBigUp className="size-4" />
          <span className="tabular-nums">{post.upvotes}</span>
        </Button>
      </div>
    </li>
  );
}

function formatAgo(value: string): string {
  const t = new Date(value).getTime();
  if (Number.isNaN(t)) return "";
  const mins = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  return `${days}d`;
}
