import pg from "pg";

const url = (process.env.DATABASE_URL || process.env.POSTGRES_URL || "")
  .trim()
  .replace(/[?&]channel_binding=require/g, "");

if (!url) {
  console.error("Set DATABASE_URL to seed jobs.");
  process.exit(1);
}

const catalogs = [
  {
    category: "Software",
    titles: [
      "Junior Software Developer",
      "Graduate Engineer Trainee",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Trainee",
      "Android Developer",
      "iOS Apprentice",
      "QA Engineer — Fresher",
      "Associate Web Developer",
      "React Developer Intern",
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Java", "SQL", "Git", "Python"],
    education: "B.Tech / B.E.",
    type: ["Full-time", "Internship"],
  },
  {
    category: "Data",
    titles: ["Junior Data Analyst", "Data Analyst Trainee", "ML Intern", "Business Intelligence Associate", "Analytics Engineer — Fresher"],
    skills: ["Excel", "SQL", "Python", "Tableau", "Power BI", "Pandas"],
    education: "B.Sc / B.Tech / BBA",
    type: ["Full-time", "Internship"],
  },
  {
    category: "Cloud",
    titles: ["Cloud Support Associate", "DevOps Intern", "Cloud Support Trainee", "SRE Junior"],
    skills: ["Linux", "AWS", "Docker", "Git", "Networking", "CI"],
    education: "B.Tech / MCA",
    type: ["Full-time", "Internship"],
  },
  {
    category: "Security",
    titles: ["Cybersecurity Analyst — Junior", "SOC Analyst Trainee", "Security Operations Associate"],
    skills: ["Networking", "Linux", "Python", "SIEM", "OWASP"],
    education: "B.Tech",
    type: ["Full-time"],
  },
  {
    category: "Design",
    titles: ["Product Design Intern", "UI Designer — Fresher", "Graphic Designer Associate", "UX Researcher Intern"],
    skills: ["Figma", "UI", "Research", "Illustration", "Prototyping"],
    education: "Any design / B.Des / B.Tech",
    type: ["Full-time", "Internship"],
  },
  {
    category: "Business",
    titles: ["Business Analyst Intern", "Operations Associate", "Strategy Analyst — Campus", "Process Analyst"],
    skills: ["Excel", "Communication", "SQL", "Presentation"],
    education: "BBA / B.Com / B.Tech",
    type: ["Full-time", "Internship"],
  },
  {
    category: "Marketing",
    titles: ["Content & Growth Associate", "Digital Marketing Executive", "Social Media Associate", "SEO Analyst — Fresher"],
    skills: ["Writing", "SEO", "Social", "Analytics", "Canva"],
    education: "Any degree",
    type: ["Full-time", "Internship"],
  },
  {
    category: "Sales",
    titles: ["Sales Development Rep", "Inside Sales Associate", "Campus Ambassador Lead", "BDR — Fresher"],
    skills: ["Communication", "CRM", "Excel", "Outbound"],
    education: "Any degree",
    type: ["Full-time"],
  },
  {
    category: "HR",
    titles: ["HR Coordinator (Campus Hire)", "Talent Associate", "People Ops Intern", "Recruitment Coordinator"],
    skills: ["Communication", "Excel", "Hiring", "Onboarding"],
    education: "MBA / BBA",
    type: ["Full-time", "Internship"],
  },
  {
    category: "Finance",
    titles: ["Finance Operations Associate", "Accounts Executive", "Audit Trainee", "FP&A Analyst — Junior"],
    skills: ["Excel", "Tally", "GST", "Accounting"],
    education: "B.Com / CA Inter",
    type: ["Full-time"],
  },
  {
    category: "Core",
    titles: [
      "Mechanical GET",
      "Electrical Engineer Trainee",
      "Civil Site Engineer — Fresher",
      "Production Engineer",
      "Quality Engineer — Plant",
    ],
    skills: ["CAD", "AutoCAD", "Manufacturing", "Site", "MATLAB"],
    education: "B.E.",
    type: ["Full-time"],
  },
  {
    category: "Content",
    titles: ["Technical Writer", "Editorial Associate", "Copywriter — Fresher", "Documentation Intern"],
    skills: ["Writing", "Markdown", "APIs", "Editing"],
    education: "Any degree",
    type: ["Full-time", "Internship"],
  },
];

const companies = [
  "TCS", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "LTIMindtree", "Cognizant", "Accenture",
  "Zoho", "Freshworks", "Razorpay", "PhonePe", "Paytm", "Flipkart", "Amazon", "Microsoft",
  "Google", "IBM", "Oracle", "SAP Labs", "Adobe", "ServiceNow", "Salesforce", "Atlassian",
  "Swiggy", "Zomato", "Meesho", "Nykaa", "Myntra", "CRED", "Groww", "Zerodha",
  "BYJU'S", "Unacademy", "PhysicsWallah", "upGrad", "WhiteHat Jr",
  "Tata Motors", "Mahindra", "L&T", "Bosch", "Siemens", "Schneider Electric", "GE Vernova",
  "Deloitte", "EY", "KPMG", "PwC", "McKinsey", "BCG",
  "HDFC Bank", "ICICI Bank", "Axis Bank", "SBI", "Kotak",
  "Sun Pharma", "Dr Reddy's", "Cipla", "Apollo Hospitals",
  "Indian Oil", "Reliance", "Adani", "JSW", "Vedanta",
  "TechNova", "LumenForge", "Papertrail", "Northstar Insights", "Kiln Labs", "Harbour & Co",
  "Nimbus Apps", "Stackyard", "OpenSyllabus", "Aether Motors", "Quiet Studio", "Redbark",
  "Plica Foods", "Sable Systems", "Gridline", "FolioPay", "Kitewatch", "Harborpoint Infra",
  "Capsule Docs", "Clearledger", "Northwind Cloud", "Flick Technologies", "Nova Systems",
  "Orbit Labs", "CloudDesk", "BluePeak", "DataMint", "SkyGrid", "WebCraft",
];

const cities = [
  ["Bengaluru", "On-site"],
  ["Bengaluru / Remote", "Hybrid"],
  ["Hyderabad", "On-site"],
  ["Hyderabad / Remote", "Hybrid"],
  ["Pune", "On-site"],
  ["Pune / Remote", "Hybrid"],
  ["Chennai", "On-site"],
  ["Mumbai", "On-site"],
  ["Delhi NCR", "Hybrid"],
  ["Kochi", "On-site"],
  ["Coimbatore", "On-site"],
  ["Ahmedabad", "On-site"],
  ["Kolkata", "On-site"],
  ["Jaipur", "On-site"],
  ["Nagpur", "On-site"],
  ["Remote (India)", "Remote"],
  ["Remote", "Remote"],
];

const salaries = [
  [3, "₹3–4 LPA"],
  [3, "₹3.5–4.5 LPA"],
  [4, "₹4–6 LPA"],
  [4, "₹4.5 LPA"],
  [5, "₹5–7 LPA"],
  [6, "₹6–8 LPA"],
  [2, "₹18,000 / mo"],
  [2, "₹22,000 / mo"],
  [3, "₹25,000 / mo"],
  [3, "₹30,000 / mo"],
];

function pick(list, i) {
  return list[i % list.length];
}

function dateOffset(days) {
  const d = new Date("2026-09-07T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - (days % 14));
  return d.toISOString().slice(0, 10);
}

function deadline(days) {
  const d = new Date("2026-09-07T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 10 + (days % 21));
  return d.toISOString().slice(0, 10);
}

function buildJobs(count) {
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    const cat = catalogs[i % catalogs.length];
    const title = pick(cat.titles, i);
    const company = pick(companies, i * 3 + 7);
    const [location, mode] = pick(cities, i * 2 + 1);
    const jobType = pick(cat.type, i);
    const [salaryMin, salary] = jobType === "Internship" ? pick(salaries.slice(6), i) : pick(salaries.slice(0, 6), i);
    const skillStart = i % cat.skills.length;
    const skills = [0, 1, 2, 3]
      .map((n) => cat.skills[(skillStart + n) % cat.skills.length])
      .join(", ");
    const fresher = jobType === "Internship" || i % 5 !== 0;
    rows.push({
      id: `cc-${String(i + 1).padStart(4, "0")}`,
      title,
      company,
      location,
      work_mode: mode,
      salary,
      salary_min: salaryMin,
      experience: fresher ? (i % 3 === 0 ? "0 years" : "0–1 years") : "0–2 years",
      education: cat.education,
      skills,
      category: cat.category,
      job_type: jobType,
      posted_at: dateOffset(i),
      deadline: deadline(i),
      description: `${title} at ${company} in ${location}. ${cat.category} role for campus hires and first-job seekers. Work on live products with a mentor. Apply from CollegeCentre — employer page opens in a new tab.`,
      fresher_ok: fresher,
      application_url: `https://www.google.com/search?q=${encodeURIComponent(`${company} ${title} careers India`)}`,
      source: i % 4 === 0 ? "Campus" : i % 4 === 1 ? "Company career page" : "CollegeCentre",
    });
  }
  return rows;
}

const sql = `
insert into jobs
  (id, title, company, location, work_mode, salary, salary_min, experience, education, skills, category, job_type, posted_at, deadline, description, fresher_ok, application_url, source)
values
  ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
on conflict (id) do update set
  title = excluded.title,
  company = excluded.company,
  location = excluded.location,
  work_mode = excluded.work_mode,
  salary = excluded.salary,
  salary_min = excluded.salary_min,
  experience = excluded.experience,
  education = excluded.education,
  skills = excluded.skills,
  category = excluded.category,
  job_type = excluded.job_type,
  posted_at = excluded.posted_at,
  deadline = excluded.deadline,
  description = excluded.description,
  fresher_ok = excluded.fresher_ok,
  application_url = excluded.application_url,
  source = excluded.source
`;

const pool = new pg.Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, max: 4 });
const jobs = buildJobs(1000);
let inserted = 0;
const batchSize = 50;
for (let i = 0; i < jobs.length; i += batchSize) {
  const batch = jobs.slice(i, i + batchSize);
  const values = [];
  const params = [];
  let p = 1;
  for (const job of batch) {
    values.push(
      `($${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++},$${p++})`,
    );
    params.push(
      job.id,
      job.title,
      job.company,
      job.location,
      job.work_mode,
      job.salary,
      job.salary_min,
      job.experience,
      job.education,
      job.skills,
      job.category,
      job.job_type,
      job.posted_at,
      job.deadline,
      job.description,
      job.fresher_ok,
      job.application_url,
      job.source,
    );
  }
  await pool.query(
    `insert into jobs
      (id, title, company, location, work_mode, salary, salary_min, experience, education, skills, category, job_type, posted_at, deadline, description, fresher_ok, application_url, source)
     values ${values.join(",")}
     on conflict (id) do update set
      title = excluded.title,
      company = excluded.company,
      location = excluded.location,
      work_mode = excluded.work_mode,
      salary = excluded.salary,
      salary_min = excluded.salary_min,
      experience = excluded.experience,
      education = excluded.education,
      skills = excluded.skills,
      category = excluded.category,
      job_type = excluded.job_type,
      posted_at = excluded.posted_at,
      deadline = excluded.deadline,
      description = excluded.description,
      fresher_ok = excluded.fresher_ok,
      application_url = excluded.application_url,
      source = excluded.source`,
    params,
  );
  inserted += batch.length;
  console.log(`[seed] ${inserted} jobs`);
}
const count = await pool.query("select count(*)::int as c from jobs");
const byCat = await pool.query("select category, count(*)::int as c from jobs group by 1 order by 1");
console.log("[seed] total jobs", count.rows[0].c);
console.log(byCat.rows.map((r) => `${r.category}:${r.c}`).join("  "));
await pool.end();
