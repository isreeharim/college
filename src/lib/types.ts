export const STATUSES = [
  "Saved",
  "Applied",
  "Shortlisted",
  "Assessment",
  "Rejected",
  "Selected",
] as const;
export type AppStatus = (typeof STATUSES)[number];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: string;
  salary: string;
  salaryMin: number;
  experience: string;
  education: string;
  skills: string;
  category: string;
  jobType: string;
  postedAt: string;
  deadline: string | null;
  description: string;
  fresherOk: boolean;
  applicationUrl: string;
  source: string;
};

export type Profile = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  degree: string;
  college: string;
  graduationYear: number | null;
  skills: string;
  experience: string;
  categories: string;
  locations: string;
  workMode: string;
  resumeUrl: string;
};

export type MatchBreakdown = {
  skills: number;
  education: number;
  experience: number;
  location: number;
  fresher: number;
  total: number;
};

export type JobCard = Job & {
  match: MatchBreakdown;
  saved: boolean;
  applicationStatus: AppStatus | null;
};

export type Access = {
  active: boolean;
  expiresAt: string | null;
  remainingMs: number;
};

export const CATEGORIES = [
  "Software",
  "Data",
  "Cloud",
  "Security",
  "Design",
  "Business",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Core",
  "Content",
] as const;

export const WORK_MODES = ["Remote", "Hybrid", "On-site", "Any"] as const;
export const EDUCATIONS = [
  "Undergraduate",
  "B.Tech / B.E.",
  "B.Sc",
  "BBA / B.Com",
  "MCA / M.Tech",
  "MBA",
  "Any degree",
] as const;
