import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { COLLEGES } from "@/lib/data/colleges";

export const CATEGORIES = ["confession", "rant", "advice", "lost", "event"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, string> = {
  confession: "Confession",
  rant: "Rant",
  advice: "Advice",
  lost: "Lost + found",
  event: "Event",
};

export type Confession = {
  id: number;
  college: string;
  category: Category;
  body: string;
  upvotes: number;
  created_at: string;
};

const collegeSet = new Set<string>(COLLEGES);

const SEED: { college: string; category: Category; body: string; upvotes: number }[] = [
  {
    college: "Anna University",
    category: "advice",
    body: "CS8592 OS end-sem: they reused the 2022 16-mark on demand paging almost word for word. If you only do one PYQ paper, do Nov 2022.",
    upvotes: 84,
  },
  {
    college: "IIT Delhi",
    category: "confession",
    body: "I have been studying in the 24-hour library for three weeks and I still cannot tell you where the water cooler on the second floor is. I just never leave my seat.",
    upvotes: 61,
  },
  {
    college: "BITS Pilani",
    category: "rant",
    body: "Comprehensive exam week and the mess decided this is the moment to experiment with a new paneer recipe. It is not paneer. I do not know what it is.",
    upvotes: 112,
  },
  {
    college: "NIT Trichy",
    category: "event",
    body: "Informal GATE CSE group in Lecture Hall 3, 8–10 pm, weekdays. Bring a notebook, not a laptop. We only do previous papers.",
    upvotes: 47,
  },
  {
    college: "VIT Vellore",
    category: "lost",
    body: "Black HP laptop sleeve with a cracked badge left in SJT 4th floor lab around 6 pm Friday. Ask the lab assistant if you picked it up — DSA notes inside.",
    upvotes: 19,
  },
  {
    college: "Mumbai University",
    category: "advice",
    body: "If your CN paper is next week: skip the OSI history essay and drill subnetting. Last two years, 10 marks straight from a /16 split.",
    upvotes: 73,
  },
  {
    college: "IIIT Hyderabad",
    category: "confession",
    body: "I took the open elective because the reviews said it was light. It is not light. It is a second core disguised as a TED talk.",
    upvotes: 96,
  },
  {
    college: "Delhi University",
    category: "event",
    body: "SRCC placement talk tomorrow 3 pm. It is on the society chat, not the main notice board. Bring a printed resume even if you are a second year.",
    upvotes: 38,
  },
  {
    college: "NIT Surathkal",
    category: "rant",
    body: "Attendance is being taken in a 70-person class with a paper sheet that starts at the front. By the time it reaches the back, the lecture is over. This is not a system. This is a sport.",
    upvotes: 128,
  },
  {
    college: "Any campus",
    category: "advice",
    body: "National Scholarship Portal: your college nodal officer is the actual deadline, not the date on the website. If they go on leave in October you are done. Submit this week.",
    upvotes: 201,
  },
];

async function seedIfEmpty() {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const count = await sql<{ n: number }>`select count(*)::int as n from confessions`;
  if ((count[0]?.n ?? 0) > 0) return;
  for (const row of SEED) {
    await sql`
      insert into confessions (college, category, body, upvotes)
      values (${row.college}, ${row.category}, ${row.body}, ${row.upvotes})
    `;
  }
}

const listSchema = z.object({
  college: z.string().optional(),
  category: z.string().optional(),
});

export const listConfessions = createServerFn({ method: "GET" })
  .validator(listSchema)
  .handler(async ({ data }) => {
    await seedIfEmpty();
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const college = data.college && data.college !== "Any campus" ? data.college : null;
    const category =
      data.category && (CATEGORIES as readonly string[]).includes(data.category)
        ? data.category
        : null;

    if (college && category) {
      return sql<Confession>`
        select id, college, category, body, upvotes, created_at
        from confessions
        where college = ${college} and category = ${category}
        order by created_at desc
        limit 80
      `;
    }
    if (college) {
      return sql<Confession>`
        select id, college, category, body, upvotes, created_at
        from confessions
        where college = ${college}
        order by created_at desc
        limit 80
      `;
    }
    if (category) {
      return sql<Confession>`
        select id, college, category, body, upvotes, created_at
        from confessions
        where category = ${category}
        order by created_at desc
        limit 80
      `;
    }
    return sql<Confession>`
      select id, college, category, body, upvotes, created_at
      from confessions
      order by created_at desc
      limit 80
    `;
  });

const createSchema = z.object({
  college: z.string().min(1).max(80),
  category: z.enum(CATEGORIES),
  body: z.string().min(12).max(800),
});

export const createConfession = createServerFn({ method: "POST" })
  .validator(createSchema)
  .handler(async ({ data }) => {
    if (!collegeSet.has(data.college)) {
      throw new Error("Unknown campus");
    }
    const body = data.body.trim();
    if (body.length < 12) throw new Error("Write a little more");
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Confession>`
      insert into confessions (college, category, body)
      values (${data.college}, ${data.category}, ${body})
      returning id, college, category, body, upvotes, created_at
    `;
    return rows[0];
  });

const voteSchema = z.object({
  id: z.number().int().positive(),
});

export const upvoteConfession = createServerFn({ method: "POST" })
  .validator(voteSchema)
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Confession>`
      update confessions
      set upvotes = upvotes + 1
      where id = ${data.id}
      returning id, college, category, body, upvotes, created_at
    `;
    return rows[0] ?? null;
  });
