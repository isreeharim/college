import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Bookmark, f as BookmarkCheck } from "../_libs/lucide-react.mjs";
import { C as Badge, D as deadlineTone, T as cn, i as useSaved, k as relativeDeadline, m as KIND_LABEL, w as Button } from "./router-CuA23DbT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cards-CnAP15U0.js
var import_jsx_runtime = require_jsx_runtime();
function ResourceCard({ resource }) {
	const saved = useSaved((s) => s.notes.includes(resource.id));
	const toggle = useSaved((s) => s.toggleNote);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative flex flex-col rounded-3xl bg-card p-4 shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				children: KIND_LABEL[resource.kind]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon-sm",
				"aria-label": saved ? "Remove bookmark" : "Bookmark",
				onClick: (e) => {
					e.preventDefault();
					toggle(resource.id);
				},
				children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/notes/$id",
			params: { id: resource.id },
			className: "flex flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg leading-snug font-medium tracking-tight",
					children: resource.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
					children: resource.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-auto pt-4 text-xs text-faint",
					children: [
						resource.subject,
						" · ",
						resource.college,
						" · Sem ",
						resource.semester
					]
				})
			]
		})]
	});
}
function OpeningCard({ opening, onOpen }) {
	const tone = deadlineTone(opening.deadline);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onOpen(opening.id),
		className: "flex flex-col rounded-3xl bg-card p-4 text-left shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: opening.kind === "internship" ? "secondary" : "outline",
					children: opening.kind === "internship" ? "Internship" : "Fresher"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: tone === "danger" ? "danger" : tone === "warn" ? "warn" : "outline",
					children: relativeDeadline(opening.deadline)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: opening.company
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-lg leading-snug font-medium tracking-tight",
				children: opening.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					opening.location,
					opening.remote ? " · Remote ok" : "",
					" · ",
					opening.pay
				]
			})
		]
	});
}
function DeadlineRow({ item }) {
	const tone = deadlineTone(item.date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4 rounded-2xl bg-card px-4 py-3 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: item.kind === "exam" ? "outline" : "secondary",
						children: item.kind === "exam" ? "Exam" : "Scholarship"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-faint",
						children: item.org
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium leading-snug",
					children: item.title
				}),
				item.amount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: item.amount
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: tone === "danger" ? "danger" : tone === "warn" ? "warn" : tone === "good" ? "good" : "outline",
			className: cn("shrink-0"),
			children: relativeDeadline(item.date)
		})]
	});
}
//#endregion
export { OpeningCard as n, ResourceCard as r, DeadlineRow as t };
