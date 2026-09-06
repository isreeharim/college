create table if not exists profiles (
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
);

create table if not exists jobs (
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
);

create table if not exists saved_jobs (
  id serial primary key,
  user_id text not null,
  job_id text not null references jobs(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, job_id)
);

create table if not exists applications (
  id serial primary key,
  user_id text not null,
  job_id text not null references jobs(id) on delete cascade,
  status text not null default 'Applied',
  applied_at timestamptz not null default now(),
  notes text not null default '',
  reminder text not null default '',
  updated_at timestamptz not null default now(),
  unique (user_id, job_id)
);

create table if not exists payments (
  id serial primary key,
  user_id text not null,
  amount integer not null default 199,
  status text not null default 'paid',
  created_at timestamptz not null default now()
);

create table if not exists access_periods (
  id serial primary key,
  user_id text not null,
  payment_id integer references payments(id),
  started_at timestamptz not null default now(),
  expires_at timestamptz not null,
  status text not null default 'active'
);

create index if not exists access_periods_user_idx on access_periods (user_id, expires_at desc);
create index if not exists saved_jobs_user_idx on saved_jobs (user_id);
create index if not exists applications_user_idx on applications (user_id);
create index if not exists jobs_posted_idx on jobs (posted_at desc);

insert into jobs (id, title, company, location, work_mode, salary, salary_min, experience, education, skills, category, job_type, posted_at, deadline, description, fresher_ok, application_url, source) values
('jn-1','Junior Software Developer','TechNova','Bengaluru / Remote','Remote','₹4–6 LPA',4,'0–1 years','B.Tech / B.E.','JavaScript, React, SQL','Software','Full-time','2026-09-04','2026-09-30','Build product features on a React + Node stack. Mentorship for campus hires. Own small modules in the first quarter.','t','https://example.com/apply/technova','Direct'),
('jn-2','Graduate Engineer Trainee','LumenForge','Pune','On-site','₹4.5 LPA',4,'0 years','B.Tech','Java, Data Structures, SQL','Software','Full-time','2026-09-03','2026-09-28','12-month GET programme across backend services. Weekly reviews, rotating pods.','t','https://example.com/apply/lumenforge','Campus'),
('jn-3','Frontend Intern (PPO track)','Papertrail','Hyderabad / Remote','Hybrid','₹25,000 / mo',3,'0 years','Any degree','HTML, CSS, JavaScript, React','Software','Internship','2026-09-06','2026-09-22','Six-month internship shipping UI for an ed-tech dashboard. PPO for top interns.','t','https://example.com/apply/papertrail','Direct'),
('jn-4','Data Analyst Trainee','Northstar Insights','Mumbai','Hybrid','₹3.6–5 LPA',3,'0–1 years','B.Sc / B.Tech / BBA','Excel, SQL, Python, Tableau','Data','Full-time','2026-09-02','2026-09-25','Clean messy datasets, build weekly packs for retail clients. Training month included.','t','https://example.com/apply/northstar','Licensed feed'),
('jn-5','QA Engineer — Fresher','Kiln Labs','Chennai','On-site','₹3.5–4.5 LPA',3,'0–1 years','B.Tech / BCA','Testing, Java, SQL, API','Software','Full-time','2026-09-01','2026-09-20','Write test cases, automate smoke suites, sit with product on release days.','t','https://example.com/apply/kiln','Direct'),
('jn-6','Business Analyst Intern','Harbour & Co','Delhi NCR','Hybrid','₹20,000 / mo',2,'0 years','BBA / B.Com / B.Tech','Excel, Communication, SQL','Business','Internship','2026-09-05','2026-09-18','Map processes for a logistics client. Deck-making and stakeholder notes.','t','https://example.com/apply/harbour','Direct'),
('jn-7','Android Developer (Campus)','Nimbus Apps','Bengaluru','On-site','₹6–8 LPA',6,'0–1 years','B.Tech','Kotlin, Android, REST','Software','Full-time','2026-08-30','2026-09-21','Own a feature surface on a consumer app used by 2M students.','t','https://example.com/apply/nimbus','Campus'),
('jn-8','Cloud Support Associate','Stackyard','Remote (India)','Remote','₹4–5.5 LPA',4,'0–2 years','B.Tech / MCA','Linux, AWS, Networking','Cloud','Full-time','2026-09-04','2026-10-02','First-line cloud tickets, runbooks, weekend on-call after 90 days.','t','https://example.com/apply/stackyard','Direct'),
('jn-9','Content & Growth Associate','OpenSyllabus','Remote','Remote','₹3–4.2 LPA',3,'0–1 years','Any degree','Writing, SEO, Social','Marketing','Full-time','2026-09-06','2026-09-26','Ship student-facing explainers and measure what gets used.','t','https://example.com/apply/opensyllabus','Direct'),
('jn-10','Mechanical GET','Aether Motors','Coimbatore','On-site','₹3.8 LPA',3,'0 years','B.E. Mechanical','CAD, Manufacturing, GD&T','Core','Full-time','2026-08-28','2026-09-19','Shop-floor rotation then design office. Two-year bond.','t','https://example.com/apply/aether','Campus'),
('jn-11','Product Design Intern','Quiet Studio','Bengaluru','Hybrid','₹18,000 / mo',2,'0 years','Any design / B.Des / B.Tech','Figma, UI, Research','Design','Internship','2026-09-03','2026-09-17','Design onboarding for a savings app. Portfolio required.','t','https://example.com/apply/quiet','Direct'),
('jn-12','Cybersecurity Analyst — Junior','Redbark','Hyderabad','On-site','₹5–7 LPA',5,'0–2 years','B.Tech','Networking, Linux, Python, SIEM','Security','Full-time','2026-09-01','2026-09-29','SOC shifts, triage alerts, write incident notes. Security+ preferred.','t','https://example.com/apply/redbark','Direct'),
('jn-13','HR Coordinator (Campus Hire)','Plica Foods','Kochi','On-site','₹3–3.8 LPA',3,'0 years','MBA / BBA','Communication, Excel, Hiring','HR','Full-time','2026-09-02','2026-09-24','Campus drives, offer letters, joining kits for a 400-person plant.','t','https://example.com/apply/plica','Direct'),
('jn-14','Full Stack Trainee','Sable Systems','Pune / Remote','Hybrid','₹4.8–6.5 LPA',4,'0–1 years','B.Tech / MCA','JavaScript, Node.js, PostgreSQL, React','Software','Full-time','2026-09-05','2026-09-27','Pair-program for 8 weeks, then own an internal tool.','t','https://example.com/apply/sable','Direct'),
('jn-15','Electrical Engineer Trainee','Gridline','Nagpur','On-site','₹3.6 LPA',3,'0 years','B.E. Electrical','Power Systems, MATLAB, AutoCAD','Core','Full-time','2026-08-29','2026-09-16','Substation documentation and site visits across Vidarbha.','t','https://example.com/apply/gridline','Campus'),
('jn-16','Sales Development Rep','FolioPay','Mumbai / Remote','Hybrid','₹3.5 LPA + incentives',3,'0–1 years','Any degree','Communication, CRM, Excel','Sales','Full-time','2026-09-06','2026-09-30','Outbound to college societies selling campus payments.','t','https://example.com/apply/foliopay','Direct'),
('jn-17','ML Intern','Kitewatch','Bengaluru','On-site','₹30,000 / mo',3,'0 years','B.Tech','Python, ML, Pandas, SQL','Data','Internship','2026-09-04','2026-09-23','Label quality, fine-tune a classifier for campus safety alerts.','t','https://example.com/apply/kitewatch','Direct'),
('jn-18','Civil Site Engineer — Fresher','Harborpoint Infra','Ahmedabad','On-site','₹3.2–4 LPA',3,'0–1 years','B.E. Civil','AutoCAD, Quantity, Site','Core','Full-time','2026-08-31','2026-09-18','Residential towers. PPE and relocation support.','t','https://example.com/apply/harborpoint','Direct'),
('jn-19','Technical Writer','Capsule Docs','Remote','Remote','₹4–5 LPA',4,'0–2 years','Any degree','Writing, Markdown, APIs','Content','Full-time','2026-09-03','2026-10-01','Document a developer platform. Samples requested.','t','https://example.com/apply/capsule','Direct'),
('jn-20','iOS Apprentice','Lumenforge Mobile','Chennai / Remote','Hybrid','₹5–6.5 LPA',5,'0–1 years','B.Tech','Swift, iOS, REST','Software','Full-time','2026-09-01','2026-09-25','Ship App Store updates with a team of four.','t','https://example.com/apply/lumen-ios','Direct'),
('jn-21','Finance Operations Associate','Clearledger','Delhi','On-site','₹3.4–4.2 LPA',3,'0–1 years','B.Com / CA Inter','Excel, Tally, GST','Finance','Full-time','2026-09-05','2026-09-28','Reconcile merchant payouts. Month-end close support.','t','https://example.com/apply/clearledger','Direct'),
('jn-22','DevOps Intern','Northwind Cloud','Hyderabad','Hybrid','₹22,000 / mo',2,'0 years','B.Tech','Linux, Docker, Git, CI','Cloud','Internship','2026-09-02','2026-09-19','Keep preview environments green. On-call buddy system.','t','https://example.com/apply/northwind','Direct')
on conflict (id) do nothing;
