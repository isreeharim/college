import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureHuntSchema } from "@/lib/ensure-hunt-schema";
import { scoreJob } from "@/lib/match";
import type { Job, JobCard, Profile } from "@/lib/types";

type JobRow = {
  id: string;
  title: string;
  company: string;
  location: string;
  work_mode: string;
  salary: string;
  salary_min: number;
  experience: string;
  education: string;
  skills: string;
  category: string;
  job_type: string;
  posted_at: string;
  deadline: string | null;
  description: string;
  fresher_ok: boolean | string | number;
  application_url: string;
  source: string;
};

function toJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    workMode: row.work_mode,
    salary: row.salary,
    salaryMin: Number(row.salary_min) || 0,
    experience: row.experience,
    education: row.education,
    skills: row.skills,
    category: row.category,
    jobType: row.job_type,
    postedAt: String(row.posted_at).slice(0, 10),
    deadline: row.deadline ? String(row.deadline).slice(0, 10) : null,
    description: row.description,
    fresherOk: row.fresher_ok === true || row.fresher_ok === "t" || row.fresher_ok === 1,
    applicationUrl: row.application_url,
    source: row.source,
  };
}

function draftAnswer(question: string, profile: Profile | null, picks: JobCard[]) {
  const q = question.toLowerCase();
  const skills = profile?.skills || "your listed skills";
  const city = profile?.locations || "India";
  const lines = [
    `I matched this against your profile${profile?.name ? ` (${profile.name})` : ""}.`,
    profile
      ? `Focus: ${profile.degree || profile.education} · ${skills} · ${profile.workMode} · ${city}.`
      : "Add a profile so matches get sharper.",
  ];
  if (/resume|cv/.test(q)) {
    lines.push("Keep the resume to one page. Lead with 4–6 skills that appear in the roles below. Quantify any project (users, accuracy, time saved).");
  } else if (/interview/.test(q)) {
    lines.push("For these roles, prep: one project story, basics of the stack in the tags, and a 60-second “why this company”.");
  } else if (/remote/.test(q)) {
    lines.push("Filtering toward remote/hybrid first. On-site campus GETs still convert well if you can relocate.");
  } else {
    lines.push("Apply to the highest-match roles today, then 5 more mid-match. Track every tap in Applications.");
  }
  if (picks.length) {
    lines.push(
      `Top picks: ${picks
        .slice(0, 5)
        .map((j) => `${j.title} at ${j.company} (${j.match.total}%)`)
        .join("; ")}.`,
    );
  } else {
    lines.push("No strong listings yet — broaden skills or city on your profile.");
  }
  return lines.join(" ");
}

export const askAgent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ question: z.string().min(2).max(400) }))
  .handler(async ({ context, data }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    const profiles = await sql<
      {
        user_id: string;
        name: string;
        email: string;
        phone: string;
        education: string;
        degree: string;
        college: string;
        graduation_year: number | null;
        skills: string;
        experience: string;
        categories: string;
        locations: string;
        work_mode: string;
        resume_url: string;
      }
    >`select * from profiles where user_id = ${context.userId} limit 1`;
    const profile = profiles[0]
      ? ({
          userId: profiles[0].user_id,
          name: profiles[0].name,
          email: profiles[0].email,
          phone: profiles[0].phone,
          education: profiles[0].education,
          degree: profiles[0].degree,
          college: profiles[0].college,
          graduationYear: profiles[0].graduation_year,
          skills: profiles[0].skills,
          experience: profiles[0].experience,
          categories: profiles[0].categories,
          locations: profiles[0].locations,
          workMode: profiles[0].work_mode,
          resumeUrl: profiles[0].resume_url,
        } satisfies Profile)
      : null;

    const q = data.question.trim().toLowerCase();
    const rows = await sql<JobRow>`select * from jobs order by posted_at desc limit 400`;
    const jobs = rows.map(toJob);
    const filtered = jobs.filter((job) => {
      if (!q) return true;
      if (/(remote|wfh)/.test(q) && job.workMode === "On-site") return job.location.toLowerCase().includes("remote");
      const blob = `${job.title} ${job.company} ${job.skills} ${job.category} ${job.location}`.toLowerCase();
      const tokens = q.split(/\s+/).filter((t) => t.length > 2 && !["the", "and", "for", "job", "jobs", "want", "need"].includes(t));
      if (!tokens.length) return true;
      return tokens.some((t) => blob.includes(t));
    });
    const ranked: JobCard[] = (filtered.length ? filtered : jobs)
      .map((job) => ({
        ...job,
        match: scoreJob(profile, job),
        saved: false,
        applicationStatus: null,
      }))
      .sort((a, b) => b.match.total - a.match.total)
      .slice(0, 8);

    return {
      answer: draftAnswer(data.question, profile, ranked),
      jobs: ranked,
    };
  });
