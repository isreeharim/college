import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { E as daysUntil, T as cn, d as DEADLINES } from "./router-CuA23DbT.mjs";
import { t as DeadlineRow } from "./cards-CnAP15U0.mjs";
import { n as Root2, r as Trigger, t as List } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/alerts-C9NNAScK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center gap-1 rounded-xl bg-secondary p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-card", className),
		...props
	});
}
function AlertsPage() {
	const [tab, setTab] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => {
		return DEADLINES.filter((d) => tab === "all" ? true : d.kind === tab).sort((a, b) => a.date.localeCompare(b.date));
	}, [tab]);
	const open = list.filter((d) => daysUntil(d.date) >= 0);
	const closed = list.filter((d) => daysUntil(d.date) < 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-muted-foreground uppercase",
					children: "Calendar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-medium tracking-tight",
					children: "Scholarships & exams"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: "Central schemes, state portals, GATE, CAT, NET, and the semester dates that actually move your week."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: tab,
				onValueChange: (v) => setTab(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "all",
						children: "All"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "scholarship",
						children: "Scholarships"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "exam",
						children: "Exams"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex flex-col gap-2",
				children: open.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineRow, { item: d }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 pb-2 text-sm text-muted-foreground",
						children: d.summary
					})]
				}, d.id))
			}),
			closed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl font-medium tracking-tight",
				children: "Closed"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2 opacity-70",
				children: closed.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineRow, { item: d }, d.id))
			})] }) : null
		]
	});
}
//#endregion
export { AlertsPage as component };
