import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { ensureHuntSchema } from "@/lib/ensure-hunt-schema";
import { scoreJob } from "@/lib/match";
import type { Access, AppStatus, Job, JobCard, Profile } from "@/lib/types";
import { STATUSES } from "@/lib/types";

const PASS_MS = 24 * 60 * 60 * 1000;

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

type ProfileRow = {
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
};

function toProfile(row: ProfileRow): Profile {
  return {
    userId: row.user_id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    education: row.education,
    degree: row.degree,
    college: row.college,
    graduationYear: row.graduation_year,
    skills: row.skills,
    experience: row.experience,
    categories: row.categories,
    locations: row.locations,
    workMode: row.work_mode,
    resumeUrl: row.resume_url,
  };
}

async function loadAccess(userId: string): Promise<Access> {
  const sql = await getSql();
  const rows = await sql<{ expires_at: string; status: string }>`
    select expires_at::text, status from access_periods
    where user_id = ${userId}
    order by expires_at desc
    limit 1
  `;
  const row = rows[0];
  if (!row) return { active: false, expiresAt: null, remainingMs: 0 };
  const exp = new Date(row.expires_at).getTime();
  const remainingMs = Math.max(0, exp - Date.now());
  return {
    active: remainingMs > 0 && row.status === "active",
    expiresAt: row.expires_at,
    remainingMs,
  };
}

async function loadProfile(userId: string): Promise<Profile | null> {
  const sql = await getSql();
  const rows = await sql<ProfileRow>`select * from profiles where user_id = ${userId} limit 1`;
  return rows[0] ? toProfile(rows[0]) : null;
}

export const getHuntState = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureHuntSchema();
    const [profile, access] = await Promise.all([
      loadProfile(context.userId),
      loadAccess(context.userId),
    ]);
    return { profile, access };
  });

const profileInput = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  phone: z.string().max(20).optional().default(""),
  education: z.string().max(40),
  degree: z.string().max(80).optional().default(""),
  college: z.string().max(120).optional().default(""),
  graduationYear: z.number().int().min(2018).max(2032).nullable().optional(),
  skills: z.string().max(400).optional().default(""),
  experience: z.string().max(40).optional().default("Fresher"),
  categories: z.string().max(200).optional().default(""),
  locations: z.string().max(200).optional().default(""),
  workMode: z.string().max(20).optional().default("Any"),
  resumeUrl: z.string().max(300).optional().default(""),
});

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(profileInput)
  .handler(async ({ context, data }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    await sql.query(
      `insert into profiles
        (user_id, name, email, phone, education, degree, college, graduation_year, skills, experience, categories, locations, work_mode, resume_url, updated_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,now())
       on conflict (user_id) do update set
        name = excluded.name,
        email = excluded.email,
        phone = excluded.phone,
        education = excluded.education,
        degree = excluded.degree,
        college = excluded.college,
        graduation_year = excluded.graduation_year,
        skills = excluded.skills,
        experience = excluded.experience,
        categories = excluded.categories,
        locations = excluded.locations,
        work_mode = excluded.work_mode,
        resume_url = excluded.resume_url,
        updated_at = now()`,
      [
        context.userId,
        data.name,
        data.email,
        data.phone,
        data.education,
        data.degree,
        data.college,
        data.graduationYear ?? null,
        data.skills,
        data.experience,
        data.categories,
        data.locations,
        data.workMode,
        data.resumeUrl,
      ],
    );
    return loadProfile(context.userId);
  });

export const buyPass = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    const started = new Date();
    const expires = new Date(started.getTime() + PASS_MS);
    const pay = await sql<{ id: number }>`
      insert into payments (user_id, amount, status)
      values (${context.userId}, 199, 'paid')
      returning id
    `;
    const paymentId = pay[0]?.id;
    await sql.query(
      `insert into access_periods (user_id, payment_id, started_at, expires_at, status)
       values ($1,$2,$3,$4,'active')`,
      [context.userId, paymentId ?? null, started.toISOString(), expires.toISOString()],
    );
    return loadAccess(context.userId);
  });

const listInput = z.object({
  q: z.string().optional().default(""),
  location: z.string().optional().default(""),
  workMode: z.string().optional().default(""),
  category: z.string().optional().default(""),
  fresherOnly: z.boolean().optional().default(false),
  minSalary: z.number().optional().default(0),
  experience: z.string().optional().default(""),
  sort: z.enum(["match", "newest"]).optional().default("match"),
});

export const listJobs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(listInput)
  .handler(async ({ context, data }) => {
    await ensureHuntSchema();
    const access = await loadAccess(context.userId);
    if (!access.active) {
      return { locked: true as const, access, jobs: [] as JobCard[] };
    }
    const sql = await getSql();
    const rows = await sql<JobRow>`select * from jobs order by posted_at desc`;
    const jobs = rows.map(toJob);
    const profile = await loadProfile(context.userId);
    const saved = await sql<{ job_id: string }>`select job_id from saved_jobs where user_id = ${context.userId}`;
    const apps = await sql<{ job_id: string; status: string }>`
      select job_id, status from applications where user_id = ${context.userId}
    `;
    const savedSet = new Set(saved.map((s) => s.job_id));
    const appMap = new Map(apps.map((a) => [a.job_id, a.status as AppStatus]));
    const q = data.q.trim().toLowerCase();
    const list = jobs.filter((job) => {
      if (q) {
        const blob = `${job.title} ${job.company} ${job.skills} ${job.category}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      if (data.location && !job.location.toLowerCase().includes(data.location.toLowerCase())) return false;
      if (data.workMode && data.workMode !== "Any" && job.workMode !== data.workMode) return false;
      if (data.category && job.category !== data.category) return false;
      if (data.fresherOnly && !job.fresherOk) return false;
      if (data.minSalary && job.salaryMin < data.minSalary) return false;
      if (data.experience === "0" && !/0/.test(job.experience)) return false;
      if (data.experience === "1" && !/0–1|0-1|1 year/.test(job.experience)) return false;
      return true;
    });
    const cards: JobCard[] = list.map((job) => ({
      ...job,
      match: scoreJob(profile, job),
      saved: savedSet.has(job.id),
      applicationStatus: appMap.get(job.id) ?? null,
    }));
    if (data.sort === "newest") cards.sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    else cards.sort((a, b) => b.match.total - a.match.total || b.postedAt.localeCompare(a.postedAt));
    return { locked: false as const, access, jobs: cards };
  });

export const getJob = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string() }))
  .handler(async ({ context, data }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    const rows = await sql<JobRow>`select * from jobs where id = ${data.id} limit 1`;
    const row = rows[0];
    if (!row) return { ok: false as const, reason: "missing" as const };
    const saved = await sql<{ id: number }>`
      select id from saved_jobs where user_id = ${context.userId} and job_id = ${data.id} limit 1
    `;
    const applied = await sql<{ id: number; status: string; notes: string }>`
      select id, status, notes from applications where user_id = ${context.userId} and job_id = ${data.id} limit 1
    `;
    const owned = saved.length > 0 || applied.length > 0;
    const access = await loadAccess(context.userId);
    if (!access.active && !owned) {
      return { ok: false as const, reason: "locked" as const, access };
    }
    const profile = await loadProfile(context.userId);
    const job = toJob(row);
    const card: JobCard = {
      ...job,
      match: scoreJob(profile, job),
      saved: saved.length > 0,
      applicationStatus: (applied[0]?.status as AppStatus) ?? null,
    };
    return { ok: true as const, access, job: card, notes: applied[0]?.notes ?? "" };
  });

export const toggleSave = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ jobId: z.string() }))
  .handler(async ({ context, data }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    const existing = await sql<{ id: number }>`
      select id from saved_jobs where user_id = ${context.userId} and job_id = ${data.jobId} limit 1
    `;
    if (existing[0]) {
      await sql`delete from saved_jobs where id = ${existing[0].id} and user_id = ${context.userId}`;
      return { saved: false };
    }
    const access = await loadAccess(context.userId);
    if (!access.active) throw new Error("Pass expired");
    await sql`insert into saved_jobs (user_id, job_id) values (${context.userId}, ${data.jobId})`;
    return { saved: true };
  });

export const applyToJob = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ jobId: z.string() }))
  .handler(async ({ context, data }) => {
    await ensureHuntSchema();
    const access = await loadAccess(context.userId);
    if (!access.active) throw new Error("Pass expired");
    const sql = await getSql();
    await sql.query(
      `insert into applications (user_id, job_id, status, applied_at, updated_at)
       values ($1,$2,'Applied',now(),now())
       on conflict (user_id, job_id) do update set status = 'Applied', updated_at = now()`,
      [context.userId, data.jobId],
    );
    await sql.query(
      `insert into saved_jobs (user_id, job_id) values ($1,$2) on conflict do nothing`,
      [context.userId, data.jobId],
    );
    return { ok: true };
  });

export const listSaved = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    const profile = await loadProfile(context.userId);
    const rows = await sql<JobRow>`
      select j.*
      from saved_jobs s
      join jobs j on j.id = s.job_id
      where s.user_id = ${context.userId}
      order by s.created_at desc
    `;
    const apps = await sql<{ job_id: string; status: string }>`
      select job_id, status from applications where user_id = ${context.userId}
    `;
    const appMap = new Map(apps.map((a) => [a.job_id, a.status as AppStatus]));
    return rows.map((row) => {
      const job = toJob(row);
      return {
        ...job,
        match: scoreJob(profile, job),
        saved: true,
        applicationStatus: appMap.get(job.id) ?? null,
      } satisfies JobCard;
    });
  });

export const listApplications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    const profile = await loadProfile(context.userId);
    const rows = await sql<
      JobRow & { app_id: number; status: string; notes: string; reminder: string; applied_at: string }
    >`
      select j.*, a.id as app_id, a.status, a.notes, a.reminder, a.applied_at::text
      from applications a
      join jobs j on j.id = a.job_id
      where a.user_id = ${context.userId}
      order by a.updated_at desc
    `;
    return rows.map((row) => {
      const job = toJob(row);
      return {
        appId: Number(row.app_id),
        status: row.status as AppStatus,
        notes: row.notes,
        reminder: row.reminder,
        appliedAt: row.applied_at,
        job: {
          ...job,
          match: scoreJob(profile, job),
          saved: true,
          applicationStatus: row.status as AppStatus,
        } satisfies JobCard,
      };
    });
  });

export const updateApplication = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      jobId: z.string(),
      status: z.enum(STATUSES),
      notes: z.string().max(800).optional().default(""),
      reminder: z.string().max(200).optional().default(""),
    }),
  )
  .handler(async ({ context, data }) => {
    await ensureHuntSchema();
    const sql = await getSql();
    await sql.query(
      `update applications
       set status = $1, notes = $2, reminder = $3, updated_at = now()
       where user_id = $4 and job_id = $5`,
      [data.status, data.notes, data.reminder, context.userId, data.jobId],
    );
    return { ok: true };
  });

export const dashboardStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureHuntSchema();
    const access = await loadAccess(context.userId);
    const sql = await getSql();
    const saved = await sql<{ c: number }>`select count(*)::int as c from saved_jobs where user_id = ${context.userId}`;
    const applied = await sql<{ c: number }>`select count(*)::int as c from applications where user_id = ${context.userId}`;
    if (!access.active) {
      return {
        access,
        saved: saved[0]?.c ?? 0,
        applied: applied[0]?.c ?? 0,
        matched: 0,
        high: 0,
        remote: 0,
        today: 0,
        recommended: [] as JobCard[],
      };
    }
    const rows = await sql<JobRow>`select * from jobs order by posted_at desc`;
    const jobs = rows.map(toJob);
    const profile = await loadProfile(context.userId);
    const savedRows = await sql<{ job_id: string }>`select job_id from saved_jobs where user_id = ${context.userId}`;
    const appRows = await sql<{ job_id: string; status: string }>`
      select job_id, status from applications where user_id = ${context.userId}
    `;
    const savedSet = new Set(savedRows.map((s) => s.job_id));
    const appMap = new Map(appRows.map((a) => [a.job_id, a.status as AppStatus]));
    const cards: JobCard[] = jobs.map((job) => ({
      ...job,
      match: scoreJob(profile, job),
      saved: savedSet.has(job.id),
      applicationStatus: appMap.get(job.id) ?? null,
    }));
    cards.sort((a, b) => b.match.total - a.match.total);
    const today = new Date().toISOString().slice(0, 10);
    return {
      access,
      saved: saved[0]?.c ?? 0,
      applied: applied[0]?.c ?? 0,
      matched: cards.length,
      high: cards.filter((j) => j.match.total >= 80).length,
      remote: cards.filter((j) => j.workMode === "Remote").length,
      today: cards.filter((j) => j.postedAt === today).length,
      recommended: cards.slice(0, 6),
    };
  });
