import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div>
      <section className="mx-auto grid max-w-[1180px] items-center gap-12 px-[6%] py-12 md:grid-cols-[1.5fr_0.8fr] md:py-20">
        <div>
          <p className="mb-3.5 text-[11px] font-extrabold tracking-[1.7px] text-[#777] uppercase">
            Student job platform
          </p>
          <h1 className="text-[44px] leading-[1.03] font-extrabold tracking-[-2px] md:text-[58px] md:tracking-[-2.5px]">
            Find your next job.
            <br />
            <span className="text-[#777]">Apply with confidence.</span>
          </h1>
          <p className="mt-6 max-w-[590px] text-lg leading-relaxed text-muted-foreground">
            Fresher-friendly jobs, internships and entry-level roles matched to your
            skills. ₹199 unlocks 24 hours of discovery. Your tracker stays forever.
          </p>
          <Button asChild className="mt-8 h-12 rounded-[10px] px-5 font-bold">
            <Link to="/signup">Get 24-hour access · ₹199</Link>
          </Button>
        </div>
        <div className="rounded-[20px] bg-ink p-[30px] text-white shadow-[0_20px_60px_#0002]">
          <p className="text-[10px] tracking-[1.5px] text-[#aaa]">YOUR PROFILE</p>
          <h3 className="mt-4 mb-6 text-xl font-semibold">Computer Science • Fresher</h3>
          <div className="h-2 overflow-hidden rounded-full bg-[#333]">
            <span className="block h-full w-[88%] bg-white" />
          </div>
          <b className="mt-3.5 block">88% profile match</b>
          <p className="mt-1 text-[13px] text-[#aaa]">12 high-match jobs available today</p>
        </div>
      </section>

      <section className="mx-auto mb-14 grid max-w-[1180px] grid-cols-2 gap-px px-[6%] md:grid-cols-4">
        {[
          ["22", "Jobs in feed"],
          ["18", "Fresher friendly"],
          ["9", "Remote"],
          ["₹3–8 LPA", "Typical range"],
        ].map(([n, l]) => (
          <div key={l} className="border border-border bg-card p-6">
            <b className="block text-2xl">{n}</b>
            <span className="mt-1 block text-xs text-[#777]">{l}</span>
          </div>
        ))}
      </section>

      <section className="border-t border-border bg-card px-[6%] py-16">
        <div className="mx-auto mb-8 max-w-[1180px] md:flex md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-extrabold tracking-[1.7px] text-[#777] uppercase">
              Personalized feed
            </p>
            <h2 className="mt-2 text-[34px] tracking-[-1px]">Jobs for you</h2>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground md:mt-0">
            Unlock the full feed after the ₹199 pass. Saved and applied roles stay on your account.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-3">
          {[
            ["Flick Technologies", "Junior Software Developer", "Remote", "₹4–7 LPA", "92"],
            ["Microland", "Service Desk Engineer", "Bengaluru", "₹3–5 LPA", "89"],
            ["Nova Systems", "Graduate Software Engineer", "Hyderabad", "₹5–8 LPA", "87"],
          ].map(([co, title, loc, sal, match]) => (
            <article key={title} className="rounded-[15px] border border-border p-[21px]">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="text-xs text-[#777]">{co}</p>
                  <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                </div>
                <span className="h-max rounded-[7px] bg-[#f0f0ec] px-2 py-1.5 text-[11px] font-extrabold">
                  {match}% match
                </span>
              </div>
              <p className="mt-3 text-[13px] text-[#666]">
                {loc}
                <br />
                {sal} · Full-time
              </p>
              <Button asChild className="mt-5 w-full rounded-lg font-semibold">
                <Link to="/signup">Apply now</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-[1180px] flex-col gap-6 px-[6%] py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-extrabold tracking-[1.7px] text-[#777] uppercase">
            Application tracker
          </p>
          <h2 className="mt-2 text-[34px] tracking-[-1px]">Your applications</h2>
          <p className="mt-2 text-[#777]">Keep every application in one place — even after the pass ends.</p>
        </div>
        <div className="flex gap-3">
          <span className="rounded-xl border border-border bg-card px-6 py-4 text-xs">
            <b className="block text-[22px]">0</b> Applied
          </span>
          <span className="rounded-xl border border-border bg-card px-6 py-4 text-xs">
            <b className="block text-[22px]">0</b> Saved
          </span>
        </div>
      </section>

      <section className="mx-[6%] mb-16 flex flex-col gap-6 rounded-[22px] bg-wash p-8 md:flex-row md:items-center md:justify-between md:p-11">
        <div>
          <p className="text-[11px] font-extrabold tracking-[1.7px] text-[#777] uppercase">
            24-hour job hunt pass
          </p>
          <h2 className="mt-2 text-[34px] tracking-[-1px]">One day. Everything you need to apply.</h2>
          <p className="mt-2 max-w-[650px] leading-relaxed text-[#666]">
            Unlock search, matching, save and apply for 24 hours. Your tracker never expires.
          </p>
        </div>
        <Button asChild className="h-12 shrink-0 rounded-[10px] px-5 font-bold">
          <Link to="/signup">Unlock for ₹199</Link>
        </Button>
      </section>
    </div>
  );
}
