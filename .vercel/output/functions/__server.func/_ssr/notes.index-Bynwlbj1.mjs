import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as COURSES, t as COLLEGES } from "./colleges-Bigng42M.mjs";
import { _ as Input, a as usePrefs, h as RESOURCES, m as KIND_LABEL, u as SelectField } from "./router-CuA23DbT.mjs";
import { r as ResourceCard } from "./cards-CnAP15U0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes.index-Bynwlbj1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	"all",
	"notes",
	"pyq",
	"syllabus",
	"lab"
];
function NotesPage() {
	const collegePref = usePrefs((s) => s.college);
	const [q, setQ] = (0, import_react.useState)("");
	const [college, setCollege] = (0, import_react.useState)("all");
	const [course, setCourse] = (0, import_react.useState)("all");
	const [kind, setKind] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return RESOURCES.filter((r) => {
			if (college !== "all" && r.college !== college) return false;
			if (course !== "all" && r.course !== course) return false;
			if (kind !== "all" && r.kind !== kind) return false;
			if (!query) return true;
			return `${r.title} ${r.subject} ${r.college} ${r.tags.join(" ")}`.toLowerCase().includes(query);
		});
	}, [
		q,
		college,
		course,
		kind
	]);
	const campusCount = RESOURCES.filter((r) => r.college === collegePref).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-muted-foreground uppercase",
					children: "Study material"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-medium tracking-tight",
					children: "Notes & PYQs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: [
						"Syllabus-mapped notes, previous-year papers, and lab records. ",
						campusCount,
						" ",
						"items tagged ",
						collegePref,
						" — the rest still search."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search subject, college, tag…",
						"aria-label": "Search notes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						value: college,
						onChange: (e) => setCollege(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All campuses"
						}), COLLEGES.filter((c) => c !== "Any campus").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						value: course,
						onChange: (e) => setCourse(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All courses"
						}), COURSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c,
							children: c
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						value: kind,
						onChange: (e) => setKind(e.target.value),
						children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: k,
							children: k === "all" ? "All types" : KIND_LABEL[k]
						}, k))
					})
				]
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-3xl bg-card px-5 py-12 text-center text-sm text-muted-foreground shadow-card",
				children: "No material matches those filters. Clear a dropdown and try again."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceCard, { resource: r }, r.id))
			})
		]
	});
}
//#endregion
export { NotesPage as component };
