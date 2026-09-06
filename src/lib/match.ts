import type { Job, MatchBreakdown, Profile } from "./types";

function tokens(raw: string) {
  return raw
    .toLowerCase()
    .split(/[,/|&]+|\s{2,}/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

function overlap(a: string, b: string) {
  const left = tokens(a);
  const right = tokens(b);
  if (!left.length || !right.length) return 50;
  let hit = 0;
  for (const item of left) {
    if (right.some((r) => r.includes(item) || item.includes(r))) hit += 1;
  }
  return Math.round((hit / left.length) * 100);
}

export function scoreJob(profile: Profile | null, job: Job): MatchBreakdown {
  if (!profile) {
    return { skills: 50, education: 50, experience: 50, location: 50, fresher: job.fresherOk ? 80 : 40, total: 55 };
  }
  const skills = overlap(job.skills, profile.skills || profile.categories);
  const education = overlap(
    `${job.education} ${job.category}`,
    `${profile.education} ${profile.degree} ${profile.categories}`,
  );
  const expNeed = /0/.test(job.experience) || job.fresherOk;
  const expHave = /fresher|0/i.test(profile.experience);
  const experience = expNeed && expHave ? 100 : expNeed ? 80 : overlap(job.experience, profile.experience);
  const location = overlap(job.location, profile.locations || "India");
  const modeOk =
    profile.workMode === "Any" ||
    job.workMode === profile.workMode ||
    job.workMode === "Remote" ||
    /remote/i.test(job.location);
  const locationScore = Math.round(location * 0.7 + (modeOk ? 30 : 0));
  const fresher = job.fresherOk ? 100 : /0–1|0 years/.test(job.experience) ? 80 : 40;
  const total = Math.round(
    skills * 0.4 + education * 0.15 + experience * 0.15 + locationScore * 0.2 + fresher * 0.1,
  );
  return {
    skills,
    education,
    experience,
    location: locationScore,
    fresher,
    total: Math.min(99, Math.max(38, total)),
  };
}
