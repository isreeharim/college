import { getSql } from "@/lib/db";
import { JOB_SEED } from "@/lib/jobs-seed";

const TABLES = [
  `create table if not exists profiles (
    user_id text primary key,
    name text not null default '',
    email text not null default '',
    phone text not null default '',
    education text not null default 'Undergraduate',
    degree text not null default '',
    college text not null default '',
    graduation_year integer,
    skills text not null default '',
    experience text not null default 'Fresher',
    categories text not null default '',
    locations text not null default '',
    work_mode text not null default 'Any',
    resume_url text not null default '',
    updated_at timestamptz not null default now()
  )`,
  `create table if not exists jobs (
    id text primary key,
    title text not null,
    company text not null,
    location text not null,
    work_mode text not null,
    salary text not null,
    salary_min integer not null default 0,
    experience text not null,
    education text not null,
    skills text not null,
    category text not null,
    job_type text not null,
    posted_at date not null,
    deadline date,
    description text not null,
    fresher_ok boolean not null default true,
    application_url text not null,
    source text not null
  )`,
  `create table if not exists saved_jobs (
    id serial primary key,
    user_id text not null,
    job_id text not null,
    created_at timestamptz not null default now(),
    unique (user_id, job_id)
  )`,
  `create table if not exists applications (
    id serial primary key,
    user_id text not null,
    job_id text not null,
    status text not null default 'Applied',
    applied_at timestamptz not null default now(),
    notes text not null default '',
    reminder text not null default '',
    updated_at timestamptz not null default now(),
    unique (user_id, job_id)
  )`,
  `create table if not exists payments (
    id serial primary key,
    user_id text not null,
    amount integer not null default 199,
    status text not null default 'paid',
    created_at timestamptz not null default now()
  )`,
  `create table if not exists access_periods (
    id serial primary key,
    user_id text not null,
    payment_id integer,
    started_at timestamptz not null default now(),
    expires_at timestamptz not null,
    status text not null default 'active'
  )`,
];

let ready: Promise<void> | null = null;

export function ensureHuntSchema(): Promise<void> {
  ready ??= (async () => {
    const sql = await getSql();
    for (const statement of TABLES) await sql.query(statement);
    const count = await sql<{ c: number }>`select count(*)::int as c from jobs`;
    if ((count[0]?.c ?? 0) > 0) return;
    for (const row of JOB_SEED) {
      await sql.query(
        `insert into jobs
          (id, title, company, location, work_mode, salary, salary_min, experience, education, skills, category, job_type, posted_at, deadline, description, fresher_ok, application_url, source)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
         on conflict (id) do nothing`,
        [...row],
      );
    }
  })().catch((err) => {
    ready = null;
    throw err;
  });
  return ready;
}
