import { t as COLLEGES } from "./colleges-Bigng42M.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confessions-DOoXGsG4.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CATEGORIES = [
	"confession",
	"rant",
	"advice",
	"lost",
	"event"
];
var collegeSet = new Set(COLLEGES);
var SEED = [
	{
		college: "Anna University",
		category: "advice",
		body: "CS8592 OS end-sem: they reused the 2022 16-mark on demand paging almost word for word. If you only do one PYQ paper, do Nov 2022.",
		upvotes: 84
	},
	{
		college: "IIT Delhi",
		category: "confession",
		body: "I have been studying in the 24-hour library for three weeks and I still cannot tell you where the water cooler on the second floor is. I just never leave my seat.",
		upvotes: 61
	},
	{
		college: "BITS Pilani",
		category: "rant",
		body: "Comprehensive exam week and the mess decided this is the moment to experiment with a new paneer recipe. It is not paneer. I do not know what it is.",
		upvotes: 112
	},
	{
		college: "NIT Trichy",
		category: "event",
		body: "Informal GATE CSE group in Lecture Hall 3, 8–10 pm, weekdays. Bring a notebook, not a laptop. We only do previous papers.",
		upvotes: 47
	},
	{
		college: "VIT Vellore",
		category: "lost",
		body: "Black HP laptop sleeve with a cracked badge left in SJT 4th floor lab around 6 pm Friday. Ask the lab assistant if you picked it up — DSA notes inside.",
		upvotes: 19
	},
	{
		college: "Mumbai University",
		category: "advice",
		body: "If your CN paper is next week: skip the OSI history essay and drill subnetting. Last two years, 10 marks straight from a /16 split.",
		upvotes: 73
	},
	{
		college: "IIIT Hyderabad",
		category: "confession",
		body: "I took the open elective because the reviews said it was light. It is not light. It is a second core disguised as a TED talk.",
		upvotes: 96
	},
	{
		college: "Delhi University",
		category: "event",
		body: "SRCC placement talk tomorrow 3 pm. It is on the society chat, not the main notice board. Bring a printed resume even if you are a second year.",
		upvotes: 38
	},
	{
		college: "NIT Surathkal",
		category: "rant",
		body: "Attendance is being taken in a 70-person class with a paper sheet that starts at the front. By the time it reaches the back, the lecture is over. This is not a system. This is a sport.",
		upvotes: 128
	},
	{
		college: "Any campus",
		category: "advice",
		body: "National Scholarship Portal: your college nodal officer is the actual deadline, not the date on the website. If they go on leave in October you are done. Submit this week.",
		upvotes: 201
	}
];
async function seedIfEmpty() {
	const { getSql } = await import("./db-qFRlIrwg.mjs");
	const sql = await getSql();
	if (((await sql`select count(*)::int as n from confessions`)[0]?.n ?? 0) > 0) return;
	for (const row of SEED) await sql`
      insert into confessions (college, category, body, upvotes)
      values (${row.college}, ${row.category}, ${row.body}, ${row.upvotes})
    `;
}
var listSchema = object({
	college: string().optional(),
	category: string().optional()
});
var listConfessions_createServerFn_handler = createServerRpc({
	id: "591887ac263a82d6bcd7b39911ef4a3f25f93c6284d0e20d0958e4b0c5422b17",
	name: "listConfessions",
	filename: "src/lib/confessions.ts"
}, (opts) => listConfessions.__executeServer(opts));
var listConfessions = createServerFn({ method: "GET" }).validator(listSchema).handler(listConfessions_createServerFn_handler, async ({ data }) => {
	await seedIfEmpty();
	const { getSql } = await import("./db-qFRlIrwg.mjs");
	const sql = await getSql();
	const college = data.college && data.college !== "Any campus" ? data.college : null;
	const category = data.category && CATEGORIES.includes(data.category) ? data.category : null;
	if (college && category) return sql`
        select id, college, category, body, upvotes, created_at
        from confessions
        where college = ${college} and category = ${category}
        order by created_at desc
        limit 80
      `;
	if (college) return sql`
        select id, college, category, body, upvotes, created_at
        from confessions
        where college = ${college}
        order by created_at desc
        limit 80
      `;
	if (category) return sql`
        select id, college, category, body, upvotes, created_at
        from confessions
        where category = ${category}
        order by created_at desc
        limit 80
      `;
	return sql`
      select id, college, category, body, upvotes, created_at
      from confessions
      order by created_at desc
      limit 80
    `;
});
var createSchema = object({
	college: string().min(1).max(80),
	category: _enum(CATEGORIES),
	body: string().min(12).max(800)
});
var createConfession_createServerFn_handler = createServerRpc({
	id: "ed459cf7c28718224b019d4263f31f9bb582139d8f447c9d451986bd2be2da56",
	name: "createConfession",
	filename: "src/lib/confessions.ts"
}, (opts) => createConfession.__executeServer(opts));
var createConfession = createServerFn({ method: "POST" }).validator(createSchema).handler(createConfession_createServerFn_handler, async ({ data }) => {
	if (!collegeSet.has(data.college)) throw new Error("Unknown campus");
	const body = data.body.trim();
	if (body.length < 12) throw new Error("Write a little more");
	const { getSql } = await import("./db-qFRlIrwg.mjs");
	return (await (await getSql())`
      insert into confessions (college, category, body)
      values (${data.college}, ${data.category}, ${body})
      returning id, college, category, body, upvotes, created_at
    `)[0];
});
var voteSchema = object({ id: number().int().positive() });
var upvoteConfession_createServerFn_handler = createServerRpc({
	id: "ff7b1ff75fa3ba7f25c7a8efca4525ea92ac3024a7d1c0b778fe5fcd38fc46e3",
	name: "upvoteConfession",
	filename: "src/lib/confessions.ts"
}, (opts) => upvoteConfession.__executeServer(opts));
var upvoteConfession = createServerFn({ method: "POST" }).validator(voteSchema).handler(upvoteConfession_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-qFRlIrwg.mjs");
	return (await (await getSql())`
      update confessions
      set upvotes = upvotes + 1
      where id = ${data.id}
      returning id, college, category, body, upvotes, created_at
    `)[0] ?? null;
});
//#endregion
export { createConfession_createServerFn_handler, listConfessions_createServerFn_handler, upvoteConfession_createServerFn_handler };
