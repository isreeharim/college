import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        For students & freshers
      </p>
      <h1 className="font-display mt-3 text-4xl leading-[1.15] font-medium tracking-tight">
        Pay ₹199. Hunt jobs for 24 focused hours.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        CollegeCentre matches fresher roles to your profile, lets you save and
        apply in one sitting, and keeps your tracker forever — even after the
        pass ends.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <Button asChild className="h-12 w-full">
          <Link to="/signup">Start — ₹199 for 24 hours</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 w-full">
          <Link to="/pricing">See how the pass works</Link>
        </Button>
      </div>
      <ul className="mt-10 space-y-4 text-sm leading-relaxed">
        <li>
          <strong className="text-foreground">Match first.</strong> Each listing
          shows why it fits your skills, college path, and city.
        </li>
        <li>
          <strong className="text-foreground">Apply out.</strong> One tap opens
          the employer page. Status stays on your tracker.
        </li>
        <li>
          <strong className="text-foreground">Nothing is deleted.</strong> When
          24 hours end, discovery locks. Saved and applied jobs stay yours.
        </li>
      </ul>
    </div>
  );
}
