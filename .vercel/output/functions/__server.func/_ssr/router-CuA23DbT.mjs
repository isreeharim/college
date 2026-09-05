import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Slot, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as COLLEGES } from "./colleges-Bigng42M.mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as string, i as object, n as literal, o as union, r as number } from "../_libs/zod.mjs";
import { c as ChevronDown, i as Search, l as CalendarDays, m as Bell, n as TriangleAlert, o as MessagesSquare, p as BookOpen, s as House, t as X, u as Briefcase } from "../_libs/lucide-react.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BAJ8E_kF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatDeadline(iso) {
	const date = /* @__PURE__ */ new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function daysUntil(iso) {
	const date = /* @__PURE__ */ new Date(iso + (iso.length === 10 ? "T23:59:59" : ""));
	const now = /* @__PURE__ */ new Date();
	const ms = date.getTime() - now.getTime();
	return Math.ceil(ms / 864e5);
}
function deadlineTone(iso) {
	const d = daysUntil(iso);
	if (d < 0) return "muted";
	if (d <= 5) return "danger";
	if (d <= 14) return "warn";
	return "good";
}
function relativeDeadline(iso) {
	const d = daysUntil(iso);
	if (d < 0) return "Closed";
	if (d === 0) return "Due today";
	if (d === 1) return "Due tomorrow";
	if (d < 14) return `${d} days left`;
	if (d < 45) return `${Math.round(d / 7)} weeks left`;
	return formatDeadline(iso);
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground",
		secondary: "bg-secondary text-secondary-foreground",
		outline: "border border-border text-muted-foreground",
		good: "bg-good/10 text-good",
		warn: "bg-warn/10 text-warn",
		danger: "bg-destructive/10 text-destructive"
	} },
	defaultVariants: { variant: "secondary" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-slot": "badge",
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-[background-color,color,box-shadow,opacity,transform] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "border border-border bg-card text-foreground hover:bg-secondary",
			ghost: "text-foreground hover:bg-secondary",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
		},
		size: {
			default: "h-11 rounded-xl px-4",
			sm: "h-9 rounded-lg px-3 text-sm",
			lg: "h-12 rounded-xl px-5",
			icon: "size-11 rounded-xl",
			"icon-sm": "size-9 rounded-lg"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CuA23DbT.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "7",
				y: "15",
				width: "18",
				height: "11",
				rx: "2",
				fill: "#f3efe6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7 16C7 12.2 11.2 10 16 10s9 2.2 9 6",
				fill: "#fffaf3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "7",
				y: "14.6",
				width: "18",
				height: "2.4",
				fill: "#ddd6c8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14.2",
				y: "13.8",
				width: "3.6",
				height: "5.2",
				rx: "1",
				fill: "#2d4a3e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "16.1",
				r: "0.75",
				fill: "#f3efe6"
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-foreground/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-3xl bg-card p-6 text-card-foreground shadow-card duration-250 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("h-11 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-base text-foreground shadow-none outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-faint focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
var KIND_LABEL = {
	notes: "Notes",
	pyq: "PYQ",
	syllabus: "Syllabus",
	lab: "Lab"
};
var RESOURCES = [
	{
		id: "os-anna-5",
		title: "Operating Systems — unit notes mapped to Anna University",
		kind: "notes",
		college: "Anna University",
		course: "B.Tech CSE",
		subject: "Operating Systems",
		semester: 5,
		year: 2025,
		pages: 86,
		downloads: 18420,
		tags: [
			"Galvin",
			"CSE",
			"mid-sem"
		],
		summary: "Lecture-density notes for CS8592. Scheduling worked examples, deadlock avoidance, and paging numericals written the way the end-sem actually asks them.",
		units: [
			{
				title: "System structures",
				topics: [
					"Kernel vs user mode",
					"System calls",
					"Monolithic, layered, microkernel",
					"Virtual machines"
				]
			},
			{
				title: "Processes and threads",
				topics: [
					"PCB and context switch",
					"Process states",
					"User vs kernel threads",
					"Multithreading models"
				]
			},
			{
				title: "CPU scheduling",
				topics: [
					"FCFS, SJF, SRTF",
					"Round robin",
					"Priority and aging",
					"Multilevel queues"
				]
			},
			{
				title: "Synchronisation and deadlocks",
				topics: [
					"Critical section",
					"Semaphores and monitors",
					"Banker's algorithm",
					"Detection and recovery"
				]
			},
			{
				title: "Memory and files",
				topics: [
					"Paging and TLB",
					"Segmentation",
					"Page replacement",
					"Directory structures"
				]
			}
		],
		pyqs: [
			{
				year: 2024,
				marks: 16,
				question: "For the processes (A:0/7, B:2/4, C:3/1, D:5/4) draw Gantt charts for SJF and RR (q=2). Compute average waiting time for both."
			},
			{
				year: 2023,
				marks: 8,
				question: "Explain the dining philosophers problem and give a deadlock-free solution using semaphores."
			},
			{
				year: 2022,
				marks: 13,
				question: "A system has 5 processes and 3 resource types (10, 5, 7). Given Allocation and Max, apply Banker's algorithm and state if the state is safe."
			}
		],
		formulas: [
			{
				name: "Turnaround",
				body: "TAT = completion − arrival"
			},
			{
				name: "Waiting",
				body: "WT = TAT − burst"
			},
			{
				name: "CPU utilisation",
				body: "U = (busy time / total time) × 100"
			},
			{
				name: "Effective access time",
				body: "EAT = h × cache + (1 − h) × memory"
			}
		]
	},
	{
		id: "dbms-vtu-5",
		title: "DBMS — ER, normalisation, SQL drills",
		kind: "notes",
		college: "VTU",
		course: "B.Tech CSE",
		subject: "Database Management Systems",
		semester: 5,
		year: 2025,
		pages: 72,
		downloads: 15310,
		tags: [
			"Navathe",
			"SQL",
			"GATE"
		],
		summary: "ER-to-relational mapping, 1NF through BCNF with the classic supplier-parts examples, plus the SQL queries that keep showing up in VTU and GATE.",
		units: [
			{
				title: "ER model",
				topics: [
					"Entities and weak entities",
					"Cardinality",
					"Aggregation",
					"Extended ER"
				]
			},
			{
				title: "Relational algebra and SQL",
				topics: [
					"Select, project, join",
					"Nested queries",
					"Triggers",
					"Views"
				]
			},
			{
				title: "Normalisation",
				topics: [
					"FDs and closures",
					"2NF, 3NF, BCNF",
					"Lossless join",
					"Dependency preservation"
				]
			},
			{
				title: "Transactions",
				topics: [
					"ACID",
					"Conflict serialisability",
					"2PL",
					"Deadlock in databases"
				]
			}
		],
		pyqs: [{
			year: 2024,
			marks: 10,
			question: "Find a canonical cover for F = {A→BC, B→C, A→B, AB→C} and decompose into 3NF."
		}, {
			year: 2023,
			marks: 8,
			question: "Write SQL to list departments whose average salary exceeds the company average."
		}],
		formulas: [{
			name: "Closure",
			body: "X+ is the set of attributes functionally determined by X"
		}, {
			name: "BCNF",
			body: "For every FD X → Y, X is a superkey"
		}]
	},
	{
		id: "dsa-iitd-3",
		title: "Data structures — IIT Delhi tutorial sheets, annotated",
		kind: "notes",
		college: "IIT Delhi",
		course: "B.Tech CSE",
		subject: "Data Structures",
		semester: 3,
		year: 2025,
		pages: 64,
		downloads: 22104,
		tags: [
			"COL106",
			"trees",
			"graphs"
		],
		summary: "Tutorial problems with the expected proof-style answers: amortised analysis of splay, Dijkstra vs Bellman-Ford, and the recursion-tree method.",
		units: [
			{
				title: "Arrays, lists, stacks",
				topics: [
					"Amortised append",
					"Infix to postfix",
					"Stock span",
					"Circular queues"
				]
			},
			{
				title: "Trees and heaps",
				topics: [
					"BST vs AVL",
					"Heap operations",
					"Huffman",
					"B-trees (intro)"
				]
			},
			{
				title: "Hashing and graphs",
				topics: [
					"Chaining vs probing",
					"BFS/DFS",
					"MST",
					"Shortest paths"
				]
			}
		],
		pyqs: [{
			year: 2025,
			marks: 10,
			question: "Insert 8, 3, 10, 1, 6, 14, 4, 7, 13 into an AVL tree. Show rotations."
		}, {
			year: 2024,
			marks: 12,
			question: "Run Dijkstra from s on a graph with a negative edge (no cycle). Where does it fail? Show the trace."
		}],
		formulas: [{
			name: "Heap height",
			body: "h = ⌊log₂ n⌋"
		}, {
			name: "Master theorem",
			body: "T(n) = a T(n/b) + n^k → compare k with log_b a"
		}]
	},
	{
		id: "cn-mu-6",
		title: "Computer Networks — Forouzan mapped to MU",
		kind: "notes",
		college: "Mumbai University",
		course: "B.Tech CSE",
		subject: "Computer Networks",
		semester: 6,
		year: 2025,
		pages: 91,
		downloads: 12880,
		tags: [
			"TCP",
			"subnetting",
			"CN"
		],
		summary: "Layer-wise notes with subnetting worksheets, TCP congestion graphs, and the sliding-window numericals MU recycles every other year.",
		units: [
			{
				title: "Physical and data link",
				topics: [
					"Encoding",
					"CRC and Hamming",
					"Stop-and-wait",
					"Go-Back-N, SR"
				]
			},
			{
				title: "Network layer",
				topics: [
					"IPv4 addressing",
					"CIDR",
					"OSPF vs RIP",
					"NAT"
				]
			},
			{
				title: "Transport and application",
				topics: [
					"UDP vs TCP",
					"3-way handshake",
					"DNS, HTTP",
					"TLS at a glance"
				]
			}
		],
		pyqs: [{
			year: 2024,
			marks: 10,
			question: "A network 172.16.0.0/16 is split into 64 subnets. Give mask, hosts/subnet, and the 5th subnet range."
		}, {
			year: 2023,
			marks: 8,
			question: "Explain slow start and congestion avoidance. Sketch cwnd vs transmission number."
		}],
		formulas: [{
			name: "Efficiency (stop-and-wait)",
			body: "η = 1 / (1 + 2a), a = Tp / Tx"
		}, {
			name: "CRC",
			body: "Append degree(G) zeros, divide by generator, remainder is the code"
		}]
	},
	{
		id: "em-gate",
		title: "Engineering Mathematics — GATE CSE crash notes",
		kind: "notes",
		college: "IIT Bombay",
		course: "B.Tech CSE",
		subject: "Engineering Mathematics",
		semester: 4,
		year: 2026,
		pages: 48,
		downloads: 31002,
		tags: [
			"GATE",
			"linear algebra",
			"probability"
		],
		summary: "The 12–15 marks that GATE always takes: eigenvalues, Bayes, Poisson, and graph-theory counting, with the shortcuts that survive negative marking.",
		units: [
			{
				title: "Linear algebra",
				topics: [
					"Rank and consistency",
					"Eigenvalues",
					"Positive definite",
					"Orthogonality"
				]
			},
			{
				title: "Probability",
				topics: [
					"Bayes",
					"Random variables",
					"Binomial / Poisson / Normal",
					"Expectation tricks"
				]
			},
			{
				title: "Calculus and discrete",
				topics: [
					"Maxima-minima",
					"Taylor",
					"Pigeonhole",
					"Generating functions (light)"
				]
			}
		],
		pyqs: [{
			year: 2025,
			marks: 2,
			question: "The eigenvalues of a 3×3 matrix are 1, 1, 2. Trace and det?"
		}, {
			year: 2024,
			marks: 2,
			question: "Two fair dice. Probability that the sum is 8 given that at least one die is 3."
		}],
		formulas: [
			{
				name: "Trace",
				body: "tr(A) = Σ λi"
			},
			{
				name: "Bayes",
				body: "P(A|B) = P(B|A) P(A) / P(B)"
			},
			{
				name: "Poisson",
				body: "P(k) = e^(−λ) λ^k / k!"
			}
		]
	},
	{
		id: "pyq-gate-cse-2025",
		title: "GATE CSE 2025 — official paper with short solutions",
		kind: "pyq",
		college: "IIT Roorkee",
		course: "B.Tech CSE",
		subject: "GATE CSE",
		semester: 8,
		year: 2025,
		pages: 36,
		downloads: 54011,
		tags: [
			"GATE",
			"set 1",
			"solutions"
		],
		summary: "Set 1 reconstructed with one-line reasons. Useful as a timed mock: 65 questions, 3 hours, then grade against the key in the last section.",
		units: [{
			title: "How to sit the paper",
			topics: [
				"NAT rounding",
				"MSQ strategy",
				"When to skip aptitude",
				"Section order"
			]
		}, {
			title: "Topic map",
			topics: [
				"Algo 8 Q",
				"OS 6 Q",
				"DB 5 Q",
				"CN 5 Q",
				"TOC/CD 7 Q"
			]
		}],
		pyqs: [{
			year: 2025,
			marks: 2,
			question: "A 32-bit processor has a 2-way set-associative cache of 8 KB, 32 B lines. Number of bits in the set index?"
		}, {
			year: 2025,
			marks: 1,
			question: "Which of the following is/are undecidable? (MSQ on emptiness of CFG / regularity of CFL)"
		}],
		formulas: []
	},
	{
		id: "pyq-os-anna-2024",
		title: "CS8592 Operating Systems — Nov 2024 end-sem paper",
		kind: "pyq",
		college: "Anna University",
		course: "B.Tech CSE",
		subject: "Operating Systems",
		semester: 5,
		year: 2024,
		pages: 8,
		downloads: 9021,
		tags: ["end-sem", "regulation 2021"],
		summary: "The actual November 2024 paper with a marking scheme and a note on which 16-mark questions were repeats from 2022.",
		units: [{
			title: "Part A (10 × 2)",
			topics: [
				"System calls",
				"Thrashing",
				"Wait-for graph",
				"Internal fragmentation"
			]
		}, {
			title: "Part B (5 × 16)",
			topics: [
				"Scheduling numerical",
				"Deadlock",
				"Demand paging",
				"File allocation"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 16,
			question: "Explain demand paging. A process of 4 pages, page size 1 KB, memory of 2 frames. Trace FIFO and LRU for the reference string 1,2,3,4,1,2,5,1,2."
		}],
		formulas: []
	},
	{
		id: "syllabus-cse5-anna",
		title: "Anna University CSE — semester 5 full syllabus",
		kind: "syllabus",
		college: "Anna University",
		course: "B.Tech CSE",
		subject: "Semester map",
		semester: 5,
		year: 2021,
		pages: 14,
		downloads: 6402,
		tags: ["R2021", "credits"],
		summary: "Official credit map for 5th semester: OS, DBMS, Computer Networks, Software Engineering, and the professional elective list, with exam hours and internal split.",
		units: [{
			title: "Core papers",
			topics: [
				"CS8591 — Computer Networks (3 0 0 3)",
				"CS8592 — Operating Systems (3 0 0 3)",
				"CS8501 — Theory of Computation (3 0 0 3)",
				"CS8492 / PE — Software Engineering"
			]
		}, {
			title: "Labs",
			topics: [
				"OS lab",
				"Networks lab",
				"Mini project"
			]
		}],
		pyqs: [],
		formulas: []
	},
	{
		id: "de-nitw-3",
		title: "Digital Electronics — Morris Mano problem set",
		kind: "notes",
		college: "NIT Warangal",
		course: "B.Tech ECE",
		subject: "Digital Electronics",
		semester: 3,
		year: 2025,
		pages: 55,
		downloads: 7340,
		tags: [
			"K-map",
			"flip-flops",
			"ECE"
		],
		summary: "Boolean simplification, K-maps up to 5 variables, and sequential circuit design with the timing diagrams the lab viva always asks.",
		units: [{
			title: "Combinational",
			topics: [
				"Canonical forms",
				"K-map",
				"Adders, mux, decoder",
				"Hazards"
			]
		}, {
			title: "Sequential",
			topics: [
				"Latches vs flip-flops",
				"Counters",
				"Shift registers",
				"State machines"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 10,
			question: "Design a mod-6 synchronous counter using JK flip-flops. Show the state table and excitation."
		}],
		formulas: [{
			name: "Max terms",
			body: "n variables → 2^n minterms / maxterms"
		}]
	},
	{
		id: "fa-du-bcom",
		title: "Financial Accounting — SRCC tutorial pack",
		kind: "notes",
		college: "Delhi University",
		course: "B.Com",
		subject: "Financial Accounting",
		semester: 1,
		year: 2025,
		pages: 70,
		downloads: 11204,
		tags: [
			"journal",
			"final accounts",
			"DU"
		],
		summary: "Journal through final accounts, depreciation, and the company-accounts problems that SRCC internals are built on.",
		units: [{
			title: "Books of original entry",
			topics: [
				"Journal",
				"Cash book",
				"Ledger posting",
				"Trial balance"
			]
		}, {
			title: "Final accounts",
			topics: [
				"Adjustments",
				"Trading A/c",
				"P&L",
				"Balance sheet"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 12,
			question: "From the trial balance and adjustments (outstanding rent, prepaid insurance, depreciation 10% on machinery), prepare the trading and P&L account."
		}],
		formulas: [{
			name: "Accounting equation",
			body: "Assets = Liabilities + Capital"
		}, {
			name: "SLM depreciation",
			body: "(Cost − scrap) / life"
		}]
	},
	{
		id: "coa-bits-4",
		title: "Computer Architecture — Hamacher notes, BITS Pilani",
		kind: "notes",
		college: "BITS Pilani",
		course: "B.Tech CSE",
		subject: "Computer Architecture",
		semester: 4,
		year: 2025,
		pages: 58,
		downloads: 8900,
		tags: [
			"pipeline",
			"cache",
			"CS F342"
		],
		summary: "Instruction pipelining, hazards, and cache mapping with the numericals from BITS comprehensive exams.",
		units: [{
			title: "ISA and ALU",
			topics: [
				"Addressing modes",
				"Single vs multi-bus",
				"Booth",
				"IEEE 754"
			]
		}, {
			title: "Pipeline and memory",
			topics: [
				"Data hazards",
				"Forwarding",
				"Cache mapping",
				"Virtual memory"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 10,
			question: "A 4-stage pipeline with 2 ns clock has a load-use hazard every 5th instruction. Speedup over a 8 ns non-pipelined datapath?"
		}],
		formulas: [{
			name: "Speedup",
			body: "S = t_nonpipe / t_pipe"
		}, {
			name: "AMAT",
			body: "hit time + miss rate × miss penalty"
		}]
	},
	{
		id: "python-lab-vit",
		title: "Python lab record — VIT winter semester",
		kind: "lab",
		college: "VIT Vellore",
		course: "B.Tech CSE",
		subject: "Programming in Python",
		semester: 2,
		year: 2026,
		pages: 32,
		downloads: 5408,
		tags: [
			"lab",
			"pandas",
			"numpy"
		],
		summary: "12 experiments with expected output screenshots described in text: file I/O, numpy broadcasting, a tiny pandas EDA, and the mini-project spec.",
		units: [{
			title: "Experiments 1–6",
			topics: [
				"Conditionals",
				"Functions",
				"Files",
				"Exceptions"
			]
		}, {
			title: "Experiments 7–12",
			topics: [
				"NumPy",
				"Pandas",
				"Matplotlib",
				"Mini project: attendance CSV"
			]
		}],
		pyqs: [],
		formulas: []
	},
	{
		id: "toc-nitk-5",
		title: "Theory of Computation — lecture notes, NITK",
		kind: "notes",
		college: "NIT Surathkal",
		course: "B.Tech CSE",
		subject: "Theory of Computation",
		semester: 5,
		year: 2025,
		pages: 61,
		downloads: 6701,
		tags: [
			"DFA",
			"Pumping",
			"undecidability"
		],
		summary: "DFA/NFA conversions, pumping lemma templates you can reuse in the exam hall, and a clean map of decidable vs undecidable problems.",
		units: [{
			title: "Regular languages",
			topics: [
				"DFA, NFA, ε-NFA",
				"Regex",
				"Pumping lemma",
				"Myhill–Nerode"
			]
		}, {
			title: "CFL and TM",
			topics: [
				"CFG and PDA",
				"Chomsky hierarchy",
				"TM variants",
				"Rice's theorem"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 8,
			question: "Prove that {a^n b^n c^n | n ≥ 0} is not context-free using the pumping lemma."
		}],
		formulas: []
	},
	{
		id: "se-iiith-6",
		title: "Software Engineering — IIIT-H project course pack",
		kind: "notes",
		college: "IIIT Hyderabad",
		course: "B.Tech CSE",
		subject: "Software Engineering",
		semester: 6,
		year: 2025,
		pages: 40,
		downloads: 4102,
		tags: [
			"agile",
			"testing",
			"UML"
		],
		summary: "Requirements through testing, with the UML diagrams and testing metrics the project evaluations actually grade.",
		units: [{
			title: "Process and design",
			topics: [
				"Waterfall vs Agile",
				"User stories",
				"Class diagrams",
				"Design patterns (subset)"
			]
		}, {
			title: "Quality",
			topics: [
				"Unit vs integration",
				"Cyclomatic complexity",
				"CI basics",
				"Code review checklist"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 6,
			question: "For the CFG of a module with 4 predicates, compute cyclomatic complexity and the minimum number of tests."
		}],
		formulas: [{
			name: "Cyclomatic complexity",
			body: "V(G) = E − N + 2P"
		}]
	},
	{
		id: "eco-du-2",
		title: "Introductory Macroeconomics — DU BA notes",
		kind: "notes",
		college: "Delhi University",
		course: "B.A. Economics",
		subject: "Macroeconomics",
		semester: 2,
		year: 2025,
		pages: 44,
		downloads: 3880,
		tags: [
			"IS-LM",
			"national income",
			"DU"
		],
		summary: "National income identities, Keynesian cross, and IS-LM drawn the way Hindu College tutorials expect.",
		units: [{
			title: "Measurement",
			topics: [
				"GDP vs GNP",
				"Nominal vs real",
				"CPI vs GDP deflator",
				"Limitations"
			]
		}, {
			title: "Income-expenditure",
			topics: [
				"Consumption function",
				"Multiplier",
				"IS-LM",
				"Fiscal vs monetary"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 10,
			question: "If MPC = 0.8 and tax rate t = 0.25, find the government-expenditure multiplier."
		}],
		formulas: [{
			name: "Multiplier",
			body: "k = 1 / (1 − MPC)"
		}, {
			name: "Taxed multiplier",
			body: "k = 1 / (1 − MPC(1 − t))"
		}]
	},
	{
		id: "thermo-nit-3",
		title: "Engineering Thermodynamics — NIT Trichy notes",
		kind: "notes",
		college: "NIT Trichy",
		course: "B.Tech Mechanical",
		subject: "Thermodynamics",
		semester: 3,
		year: 2025,
		pages: 78,
		downloads: 5200,
		tags: [
			"Otto",
			"Rankine",
			"ME"
		],
		summary: "First and second law numericals, Otto/Diesel/Rankine cycles, and the steam-table problems that eat time in the end-sem.",
		units: [{
			title: "Laws",
			topics: [
				"SFEE",
				"Entropy",
				"Availability",
				"T-ds relations"
			]
		}, {
			title: "Cycles",
			topics: [
				"Otto",
				"Diesel",
				"Dual",
				"Rankine with reheat"
			]
		}],
		pyqs: [{
			year: 2024,
			marks: 12,
			question: "An Otto cycle with r = 8, γ = 1.4, heat addition 800 kJ/kg. Find efficiency and mean effective pressure if vs = 0.1 m³/kg."
		}],
		formulas: [{
			name: "Otto efficiency",
			body: "η = 1 − 1 / r^(γ−1)"
		}, {
			name: "SFEE",
			body: "h1 + c1²/2 + g z1 + q = h2 + c2²/2 + g z2 + w"
		}]
	}
];
function getResource(id) {
	return RESOURCES.find((r) => r.id === id);
}
[...new Set(RESOURCES.map((r) => r.subject))].sort();
var OPENINGS = [
	{
		id: "razorpay-sde-intern",
		title: "SDE Intern — Summer 2027",
		company: "Razorpay",
		kind: "internship",
		location: "Bengaluru",
		remote: false,
		pay: "₹1.0 L / month",
		batch: "2027, 2028",
		deadline: "2026-09-28",
		tags: [
			"Backend",
			"Go",
			"Java"
		],
		eligibility: "CSE / ECE, CGPA ≥ 7.0, available May–July 2027.",
		description: "Eight-week internship on payments infrastructure. You will own a small service, sit in on design reviews, and ship behind a feature flag. Conversion to a PPO is common if the summer project lands."
	},
	{
		id: "flipkart-swe-intern",
		title: "Software Engineering Intern",
		company: "Flipkart",
		kind: "internship",
		location: "Bengaluru",
		remote: false,
		pay: "₹80,000 / month",
		batch: "2027",
		deadline: "2026-10-12",
		tags: [
			"Java",
			"React",
			"System design"
		],
		eligibility: "B.Tech 2027 batch. Online assessment + two interviews.",
		description: "Work with a pod on search, supply-chain, or app-experience. Expect a DSA round, then a machine-coding round that is closer to work than leetcode."
	},
	{
		id: "amazon-sde-intern",
		title: "SDE Intern",
		company: "Amazon",
		kind: "internship",
		location: "Hyderabad / Bengaluru",
		remote: false,
		pay: "₹1.2 L / month",
		batch: "2027",
		deadline: "2026-09-18",
		tags: ["DSA", "Leadership principles"],
		eligibility: "All engineering branches, no active backlogs.",
		description: "Classic Amazon intern loop: OA (DSA + work simulation), then two interviews. Internships run May–July; return offers depend on the bar-raiser equivalent for interns."
	},
	{
		id: "freshworks-intern",
		title: "Product Engineering Intern",
		company: "Freshworks",
		kind: "internship",
		location: "Chennai",
		remote: true,
		pay: "₹40,000 / month",
		batch: "2027, 2028",
		deadline: "2026-10-30",
		tags: [
			"Ruby",
			"React",
			"SaaS"
		],
		eligibility: "Chennai / remote-friendly. Strong web fundamentals.",
		description: "Build on Freshdesk or Freshservice. Hybrid from Chennai; outstation interns can stay remote with a mid-point demo in office."
	},
	{
		id: "zerodha-intern",
		title: "Backend Intern — Kite",
		company: "Zerodha",
		kind: "internship",
		location: "Bengaluru",
		remote: false,
		pay: "₹50,000 / month",
		batch: "2027",
		deadline: "2026-11-08",
		tags: [
			"Go",
			"Postgres",
			"Markets"
		],
		eligibility: "Small cohort. A public GitHub with boring, correct code helps more than a CGPA.",
		description: "Market-hours systems, not a toy dashboard. You will read a lot of existing Go and be asked to make one thing faster or simpler."
	},
	{
		id: "google-step",
		title: "STEP Intern (2nd year)",
		company: "Google",
		kind: "internship",
		location: "Bengaluru / Hyderabad",
		remote: false,
		pay: "₹1.2 L / month",
		batch: "2028",
		deadline: "2026-09-22",
		tags: ["STEP", "2nd year"],
		eligibility: "First or second year only. Women and under-represented groups preferred as per programme rules.",
		description: "A 10–12 week intern with extra mentoring. Apply early — the portal closes as soon as the volume cap is hit."
	},
	{
		id: "tcs-nqt",
		title: "TCS NQT — Ninja / Digital / Prime",
		company: "Tata Consultancy Services",
		kind: "fresher",
		location: "Pan India",
		remote: false,
		pay: "₹3.3–9 LPA",
		batch: "2026, 2027",
		deadline: "2026-09-30",
		tags: ["Mass hiring", "NQT"],
		eligibility: "All degrees, 60% throughout, up to 1 backlog at the time of applying.",
		description: "National Qualifier Test. Ninja, Digital, and Prime bands from the same paper. Keep 2026–27 hall tickets; many campuses still route through NQT even when they also have a TPO drive."
	},
	{
		id: "infosys-specialist",
		title: "Specialist Programmer",
		company: "Infosys",
		kind: "fresher",
		location: "Bengaluru / Pune / Hyderabad",
		remote: false,
		pay: "₹9.5 LPA",
		batch: "2027",
		deadline: "2026-10-20",
		tags: ["HackWithInfy", "SP"],
		eligibility: "HackWithInfy finalists and campus SP drive. Strong DSA.",
		description: "The higher Infosys band. Expect a tough OA and a design-flavoured interview. Role is closer to product engineering than Infosys SES."
	},
	{
		id: "atlassian-grad",
		title: "Graduate Software Engineer",
		company: "Atlassian",
		kind: "fresher",
		location: "Bengaluru",
		remote: true,
		pay: "₹21 LPA + bonus",
		batch: "2027",
		deadline: "2026-11-15",
		tags: [
			"Java",
			"Kotlin",
			"Full-time"
		],
		eligibility: "2027 graduates. Intern conversions are separate.",
		description: "Jira / Confluence / Atlas teams. Interview loop is values + DSA + a system-design lite round. Hybrid Bengaluru with a real remote option."
	},
	{
		id: "cred-sde",
		title: "SDE-1",
		company: "CRED",
		kind: "fresher",
		location: "Bengaluru",
		remote: false,
		pay: "₹18–24 LPA",
		batch: "2026, 2027",
		deadline: "2026-10-05",
		tags: [
			"Kotlin",
			"Android",
			"Backend"
		],
		eligibility: "Off-campus. Referral helps. Two DSA rounds, one tech, one culture.",
		description: "Small hiring window. If you have Android or JVM backend internships, lead with that rather than a generic resume."
	},
	{
		id: "nvidia-intern",
		title: "Systems Software Intern",
		company: "NVIDIA",
		kind: "internship",
		location: "Pune / Bengaluru",
		remote: false,
		pay: "₹1.25 L / month",
		batch: "2027",
		deadline: "2026-12-01",
		tags: [
			"C++",
			"CUDA",
			"OS"
		],
		eligibility: "Strong C/C++, OS, and computer architecture. ECE welcome.",
		description: "Driver, compiler, or CUDA runtime adjacent work. Interviews go deep on pointers, memory, and concurrency — not framework trivia."
	},
	{
		id: "groww-intern",
		title: "Intern — Consumer",
		company: "Groww",
		kind: "internship",
		location: "Bengaluru",
		remote: false,
		pay: "₹60,000 / month",
		batch: "2027, 2028",
		deadline: "2026-09-25",
		tags: [
			"Android",
			"iOS",
			"Fintech"
		],
		eligibility: "App-dev internships or shipped side projects.",
		description: "Consumer squad internships. You will pair with an SDE on a quarterly OKR, not a throwaway intern tool."
	}
];
var DEADLINES = [
	{
		id: "nsp-2026",
		kind: "scholarship",
		title: "National Scholarship Portal — all central schemes",
		org: "Ministry of Education",
		date: "2026-10-31",
		amount: "Varies by scheme",
		tags: ["NSP", "Central"],
		summary: "One form covers post-matric, merit-cum-means, and several minority schemes. Institute verification is the slow step — submit two weeks before the portal date."
	},
	{
		id: "inspire-she",
		kind: "scholarship",
		title: "INSPIRE-SHE 2026",
		org: "DST",
		date: "2026-11-15",
		amount: "₹80,000 / year",
		tags: ["Science", "BSc"],
		summary: "For students in natural and basic sciences within the top 1% of class XII boards, or JEE/NEET rank holders who chose a BSc over professional degrees."
	},
	{
		id: "reliance-ug",
		kind: "scholarship",
		title: "Reliance Foundation Undergraduate Scholarships",
		org: "Reliance Foundation",
		date: "2026-10-08",
		amount: "Up to ₹2 L / year",
		tags: ["Merit", "Need"],
		summary: "First-year undergraduates. Aptitude test plus household-income cap. Engineering and liberal arts both eligible."
	},
	{
		id: "aditya-birla",
		kind: "scholarship",
		title: "Aditya Birla Scholarship",
		org: "Aditya Birla Group",
		date: "2026-09-20",
		amount: "Fee cover, selected campuses",
		tags: [
			"IIT",
			"IIM",
			"BITS"
		],
		summary: "By invitation from partner campuses (IITs, BITS, XLRI, law schools). Essay plus interview. Do not wait for the TPO mail — check the portal this week."
	},
	{
		id: "pm-usp",
		kind: "scholarship",
		title: "PM-USP YASASVI (OBC/EBC/DNT)",
		org: "Ministry of Social Justice",
		date: "2026-10-18",
		amount: "Up to ₹75,000",
		tags: ["OBC", "EBC"],
		summary: "Class 9–12 and undergraduate. Income cap applies. Keep caste and income certificates in the NSP format."
	},
	{
		id: "gate-stipend",
		kind: "scholarship",
		title: "M.Tech GATE stipend (AICTE)",
		org: "AICTE / MoE",
		date: "2027-07-31",
		amount: "₹12,400 / month",
		tags: ["GATE", "M.Tech"],
		summary: "Paid to GATE-qualified students on AICTE-approved M.Tech seats. Not a separate application — it rides on your admission. Mark this if you are targeting 2027 M.Tech."
	},
	{
		id: "tata-trusts",
		kind: "scholarship",
		title: "Tata Trusts — higher education",
		org: "Tata Trusts",
		date: "2026-12-12",
		amount: "Need-based",
		tags: ["Need", "UG/PG"],
		summary: "Rolling-ish window with a hard close in December. Strong for students who already hold an admission letter and a fee demand."
	},
	{
		id: "karnataka-e-pass",
		kind: "scholarship",
		title: "SSP / e-pass Karnataka",
		org: "Government of Karnataka",
		date: "2026-11-30",
		amount: "Fee reimbursement",
		tags: ["State", "Karnataka"],
		summary: "For students with Karnataka eligibility studying in the state. College Nodal Officer has to push the application — chase them, do not just upload."
	},
	{
		id: "gate-2027-reg",
		kind: "exam",
		title: "GATE 2027 registration (without late fee)",
		org: "IIT Madras",
		date: "2026-10-03",
		tags: [
			"GATE",
			"M.Tech",
			"PSU"
		],
		summary: "Organising institute for GATE 2027 is IIT Madras. Paper is in February 2027. CSE, DA, EE, ME, CE, and the new combined papers all sit on this window."
	},
	{
		id: "gate-2027-exam",
		kind: "exam",
		title: "GATE 2027 — exam window",
		org: "IIT Madras",
		date: "2027-02-06",
		tags: ["GATE"],
		summary: "Two weekends in early February (indicative). Treat 6 Feb as the planning date until the official timetable drops."
	},
	{
		id: "cat-2026",
		kind: "exam",
		title: "CAT 2026",
		org: "IIM",
		date: "2026-11-29",
		tags: ["MBA", "IIM"],
		summary: "Last Sunday of November. Registration usually closes in mid-September — if you are even 20% sure about an MBA, register; you can skip later."
	},
	{
		id: "cat-2026-reg",
		kind: "exam",
		title: "CAT 2026 registration close",
		org: "IIM",
		date: "2026-09-18",
		tags: ["MBA"],
		summary: "The form closes before most campus mid-sems end. Keep scanned photos, category certificates, and a working ID ready."
	},
	{
		id: "ugcnet-dec",
		kind: "exam",
		title: "UGC NET December 2026",
		org: "NTA",
		date: "2026-12-18",
		tags: [
			"NET",
			"JRF",
			"PhD"
		],
		summary: "For lectureship / JRF. December cycle registration typically opens in September. Paper 1 is the easy mark-bank if you start now."
	},
	{
		id: "upsc-cse-2027",
		kind: "exam",
		title: "UPSC CSE 2027 prelims",
		org: "UPSC",
		date: "2027-05-23",
		tags: ["UPSC", "Civil services"],
		summary: "Notification in February 2027. If this is your first attempt, the current semester is when optional-subject sampling should happen — not April."
	},
	{
		id: "ssc-cgl-2026",
		kind: "exam",
		title: "SSC CGL 2026 Tier-1",
		org: "SSC",
		date: "2026-10-24",
		tags: ["SSC", "Jobs"],
		summary: "Indicative window. Quant + English decide the cutoff. Useful parallel track if you want a government backup beside campus placements."
	},
	{
		id: "anna-endsem",
		kind: "exam",
		title: "Anna University Nov/Dec 2026 end-sem",
		org: "Anna University",
		date: "2026-11-20",
		tags: ["Semester", "Anna"],
		summary: "Theory exams typically from the third week of November. Practicals and project viva sit in the two weeks before that — block them on the planner."
	}
];
function upcomingDeadlines(withinDays = 45) {
	return DEADLINES.filter((d) => {
		const days = ((/* @__PURE__ */ new Date(d.date + "T23:59:59")).getTime() - Date.now()) / 864e5;
		return days >= -1 && days <= withinDays;
	}).sort((a, b) => a.date.localeCompare(b.date));
}
var PAGES = [
	{
		id: "p-home",
		title: "Home",
		hint: "Dashboard",
		to: "/",
		group: "Pages"
	},
	{
		id: "p-notes",
		title: "Notes & PYQs",
		hint: "Study material",
		to: "/notes",
		group: "Pages"
	},
	{
		id: "p-jobs",
		title: "Internships & jobs",
		hint: "Openings",
		to: "/jobs",
		group: "Pages"
	},
	{
		id: "p-alerts",
		title: "Scholarships & exams",
		hint: "Deadlines",
		to: "/alerts",
		group: "Pages"
	},
	{
		id: "p-plan",
		title: "Timetable & attendance",
		hint: "75% rule",
		to: "/planner",
		group: "Pages"
	},
	{
		id: "p-campus",
		title: "Campus board",
		hint: "Anonymous",
		to: "/campus",
		group: "Pages"
	}
];
function searchCatalog(q) {
	const query = q.trim().toLowerCase();
	const pool = [
		...PAGES,
		...RESOURCES.map((r) => ({
			id: `n-${r.id}`,
			title: r.title,
			hint: `${r.subject} · ${r.college}`,
			to: `/notes/${r.id}`,
			group: "Notes"
		})),
		...OPENINGS.map((o) => ({
			id: `j-${o.id}`,
			title: `${o.company} — ${o.title}`,
			hint: `${o.kind} · ${o.location}`,
			to: `/jobs?open=${o.id}`,
			group: "Jobs"
		})),
		...DEADLINES.map((d) => ({
			id: `d-${d.id}`,
			title: d.title,
			hint: d.org,
			to: "/alerts",
			group: "Deadlines"
		}))
	];
	if (!query) return PAGES;
	return pool.filter((h) => (h.title + " " + h.hint).toLowerCase().includes(query)).slice(0, 16);
}
function CommandPalette({ open, onOpenChange }) {
	const [q, setQ] = (0, import_react.useState)("");
	const router = useRouter();
	const hits = (0, import_react.useMemo)(() => searchCatalog(q), [q]);
	(0, import_react.useEffect)(() => {
		if (!open) setQ("");
	}, [open]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				onOpenChange(!open);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "gap-0 p-0 sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "sr-only",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Search Kosh" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Jump to notes, jobs, or pages" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 border-b border-border px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search notes, jobs, exams…",
						className: "h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-80 overflow-y-auto p-2",
					children: hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-3 py-8 text-center text-sm text-muted-foreground",
						children: "Nothing matches that."
					}) : hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							onOpenChange(false);
							router.history.push(hit.to);
						},
						className: "flex w-full flex-col rounded-xl px-3 py-2.5 text-left hover:bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: hit.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								hit.group,
								" · ",
								hit.hint
							]
						})]
					}) }, hit.id))
				})
			]
		})
	});
}
var Popover = Root2;
var PopoverTrigger = Trigger;
function PopoverContent({ className, align = "end", sideOffset = 8, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		align,
		sideOffset,
		className: cn("z-50 w-80 rounded-2xl bg-card p-3 text-card-foreground shadow-card outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function SelectField({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			className: cn("h-11 w-full appearance-none rounded-xl border border-input bg-card px-3 pr-9 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30", className),
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" })]
	});
}
var DAYS = [
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var DEFAULT_SUBJECTS = [
	{
		name: "Operating Systems",
		present: 28,
		total: 36
	},
	{
		name: "DBMS",
		present: 24,
		total: 34
	},
	{
		name: "Computer Networks",
		present: 30,
		total: 38
	},
	{
		name: "Software Engineering",
		present: 18,
		total: 22
	},
	{
		name: "Theory of Computation",
		present: 16,
		total: 28
	},
	{
		name: "OS Lab",
		present: 10,
		total: 12
	}
];
var DEFAULT_SLOTS = [
	{
		id: "s1",
		day: 0,
		start: "09:00",
		end: "10:00",
		subject: "Operating Systems",
		room: "CS-201"
	},
	{
		id: "s2",
		day: 0,
		start: "10:00",
		end: "11:00",
		subject: "DBMS",
		room: "CS-201"
	},
	{
		id: "s3",
		day: 0,
		start: "11:15",
		end: "12:15",
		subject: "Computer Networks",
		room: "CS-104"
	},
	{
		id: "s4",
		day: 0,
		start: "14:00",
		end: "16:00",
		subject: "OS Lab",
		room: "Lab-2"
	},
	{
		id: "s5",
		day: 1,
		start: "09:00",
		end: "10:00",
		subject: "Theory of Computation",
		room: "CS-210"
	},
	{
		id: "s6",
		day: 1,
		start: "10:00",
		end: "11:00",
		subject: "Operating Systems",
		room: "CS-201"
	},
	{
		id: "s7",
		day: 1,
		start: "11:15",
		end: "12:15",
		subject: "Software Engineering",
		room: "CS-118"
	},
	{
		id: "s8",
		day: 2,
		start: "09:00",
		end: "10:00",
		subject: "DBMS",
		room: "CS-201"
	},
	{
		id: "s9",
		day: 2,
		start: "10:00",
		end: "11:00",
		subject: "Computer Networks",
		room: "CS-104"
	},
	{
		id: "s10",
		day: 2,
		start: "14:00",
		end: "15:00",
		subject: "Theory of Computation",
		room: "CS-210"
	},
	{
		id: "s11",
		day: 3,
		start: "09:00",
		end: "10:00",
		subject: "Software Engineering",
		room: "CS-118"
	},
	{
		id: "s12",
		day: 3,
		start: "10:00",
		end: "11:00",
		subject: "Operating Systems",
		room: "CS-201"
	},
	{
		id: "s13",
		day: 3,
		start: "11:15",
		end: "13:15",
		subject: "OS Lab",
		room: "Lab-2"
	},
	{
		id: "s14",
		day: 4,
		start: "09:00",
		end: "10:00",
		subject: "Computer Networks",
		room: "CS-104"
	},
	{
		id: "s15",
		day: 4,
		start: "10:00",
		end: "11:00",
		subject: "DBMS",
		room: "CS-201"
	},
	{
		id: "s16",
		day: 4,
		start: "11:15",
		end: "12:15",
		subject: "Theory of Computation",
		room: "CS-210"
	},
	{
		id: "s17",
		day: 5,
		start: "09:00",
		end: "10:00",
		subject: "Software Engineering",
		room: "CS-118"
	},
	{
		id: "s18",
		day: 5,
		start: "10:00",
		end: "12:00",
		subject: "DBMS",
		room: "CS-201"
	}
];
var usePlanner = create()(persist((set, get) => ({
	slots: DEFAULT_SLOTS,
	subjects: DEFAULT_SUBJECTS,
	required: .75,
	hydrated: false,
	addSlot: (slot) => set({ slots: [...get().slots, {
		...slot,
		id: crypto.randomUUID()
	}] }),
	removeSlot: (id) => set({ slots: get().slots.filter((s) => s.id !== id) }),
	setSlot: (id, patch) => set({ slots: get().slots.map((s) => s.id === id ? {
		...s,
		...patch
	} : s) }),
	mark: (subject, present) => set({ subjects: get().subjects.map((row) => row.name === subject ? {
		...row,
		present: row.present + (present ? 1 : 0),
		total: row.total + 1
	} : row) }),
	undoMark: (subject) => set({ subjects: get().subjects.map((row) => row.name === subject && row.total > 0 ? {
		...row,
		present: Math.max(0, row.present - (row.present === row.total ? 1 : 0)),
		total: row.total - 1
	} : row) }),
	setCounts: (name, present, total) => set({ subjects: get().subjects.map((row) => row.name === name ? {
		...row,
		present: Math.max(0, present),
		total: Math.max(0, total)
	} : row) }),
	addSubject: (name) => {
		const trimmed = name.trim();
		if (!trimmed || get().subjects.some((s) => s.name === trimmed)) return;
		set({ subjects: [...get().subjects, {
			name: trimmed,
			present: 0,
			total: 0
		}] });
	},
	removeSubject: (name) => set({
		subjects: get().subjects.filter((s) => s.name !== name),
		slots: get().slots.filter((s) => s.subject !== name)
	}),
	setRequired: (n) => set({ required: Math.min(.95, Math.max(.5, n)) }),
	setHydrated: () => set({ hydrated: true })
}), {
	name: "kosh-planner",
	skipHydration: true,
	partialize: (s) => ({
		slots: s.slots,
		subjects: s.subjects,
		required: s.required
	})
}));
function todayIndex() {
	const js = (/* @__PURE__ */ new Date()).getDay();
	if (js === 0) return -1;
	return js - 1;
}
function overallAttendance(subjects) {
	const present = subjects.reduce((a, s) => a + s.present, 0);
	const total = subjects.reduce((a, s) => a + s.total, 0);
	return {
		present,
		total,
		pct: total === 0 ? 100 : present / total * 100
	};
}
var usePrefs = create()(persist((set) => ({
	college: "Anna University",
	hydrated: false,
	setCollege: (college) => set({ college }),
	setHydrated: () => set({ hydrated: true })
}), {
	name: "kosh-prefs",
	skipHydration: true,
	partialize: (s) => ({ college: s.college })
}));
var useSaved = create()(persist((set, get) => ({
	notes: [],
	jobs: {},
	checks: {},
	voted: [],
	hydrated: false,
	toggleNote: (id) => set({ notes: get().notes.includes(id) ? get().notes.filter((x) => x !== id) : [...get().notes, id] }),
	setJob: (id, status) => {
		const next = { ...get().jobs };
		if (!status) delete next[id];
		else next[id] = status;
		set({ jobs: next });
	},
	toggleCheck: (resourceId, topic) => {
		const current = get().checks[resourceId] ?? [];
		const next = current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic];
		set({ checks: {
			...get().checks,
			[resourceId]: next
		} });
	},
	markVoted: (id) => {
		if (get().voted.includes(id)) return;
		set({ voted: [...get().voted, id] });
	},
	setHydrated: () => set({ hydrated: true })
}), {
	name: "kosh-saved",
	skipHydration: true,
	partialize: (s) => ({
		notes: s.notes,
		jobs: s.jobs,
		checks: s.checks,
		voted: s.voted
	})
}));
function useHydrateStores() {
	(0, import_react.useEffect)(() => {
		const mark = () => {
			usePrefs.getState().setHydrated();
			useSaved.getState().setHydrated();
			usePlanner.getState().setHydrated();
		};
		Promise.all([
			Promise.resolve(usePrefs.persist.rehydrate()),
			Promise.resolve(useSaved.persist.rehydrate()),
			Promise.resolve(usePlanner.persist.rehydrate())
		]).then(mark);
	}, []);
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/notes",
		label: "Notes",
		icon: BookOpen
	},
	{
		to: "/jobs",
		label: "Jobs",
		icon: Briefcase
	},
	{
		to: "/alerts",
		label: "Alerts",
		icon: Bell
	},
	{
		to: "/planner",
		label: "Planner",
		icon: CalendarDays
	},
	{
		to: "/campus",
		label: "Campus",
		icon: MessagesSquare
	}
];
var MOBILE_NAV = NAV.filter((n) => n.to !== "/alerts");
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
function AppShell({ children }) {
	useHydrateStores();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const college = usePrefs((s) => s.college);
	const setCollege = usePrefs((s) => s.setCollege);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const soon = upcomingDeadlines(21);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-sidebar px-4 py-6 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-8 flex items-center gap-2.5 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl font-medium tracking-tight",
							children: "Kosh"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1",
						children: NAV.map((item) => {
							const Icon = item.icon;
							const active = isActive(pathname, item.to);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								}), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-3 pt-6 text-xs leading-relaxed text-faint",
						children: "Notes, jobs, scholarships, and a campus board — kept in one vault."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "md:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-border bg-background/90 px-4 backdrop-blur-sm md:h-16 md:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2 md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-7 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-medium",
							children: "Kosh"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								"aria-label": "Your campus",
								value: college,
								onChange: (e) => setCollege(e.target.value),
								className: "hidden h-9 max-w-44 text-xs md:block",
								children: COLLEGES.filter((c) => c !== "Any campus").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setSearchOpen(true),
								className: "hidden min-w-48 justify-start gap-2 text-muted-foreground md:inline-flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
									"Search",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "ml-auto rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-faint",
										children: "⌘K"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "icon-sm",
								className: "md:hidden",
								onClick: () => setSearchOpen(true),
								"aria-label": "Search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "icon-sm",
									className: "relative",
									"aria-label": "Upcoming deadlines",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), soon.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1.5 right-1.5 size-1.5 rounded-full bg-destructive" }) : null]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 px-1 text-xs font-medium tracking-wide text-muted-foreground uppercase",
								children: "Next 3 weeks"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-1",
								children: soon.slice(0, 6).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/alerts",
									className: "flex items-start justify-between gap-3 rounded-xl px-2 py-2 hover:bg-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm leading-snug",
										children: d.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: relativeDeadline(d.date)
									})]
								}) }, d.id))
							})] })] })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-6xl px-4 py-6 pb-28 md:px-8 md:py-8 md:pb-12",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: MOBILE_NAV.map((item) => {
						const Icon = item.icon;
						const active = isActive(pathname, item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-11 flex-col items-center justify-center gap-0.5 text-[10px] font-medium", active ? "text-primary" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5",
								strokeWidth: active ? 2 : 1.6
							}), item.label]
						}) }, item.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				open: searchOpen,
				onOpenChange: setSearchOpen
			})
		]
	});
}
var styles_default = "/assets/styles-DKIhYGyA.css";
var APP_NAME = "Kosh";
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 15e3,
	retry: 1,
	refetchOnWindowFocus: false
} } });
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Notes, previous-year papers, internships, scholarships, attendance, and a campus board for Indian college students."
			},
			{
				name: "theme-color",
				content: "#F3EFE6"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
				client: queryClient,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "bottom-right",
					toastOptions: { className: "!bg-card !text-foreground !border-border !shadow-card" }
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$7 = () => import("./routes-DJDOqXHo.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./alerts-C9NNAScK.mjs");
var Route$6 = createFileRoute("/alerts")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./campus-Bw37CvFo.mjs");
var Route$5 = createFileRoute("/campus")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./jobs-CatHpMlH.mjs");
var Route$4 = createFileRoute("/jobs")({
	validateSearch: (s) => ({ open: typeof s.open === "string" ? s.open : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./notes-DIqjiEtX.mjs");
var Route$3 = createFileRoute("/notes")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./planner-DJLsDg76.mjs");
var Route$2 = createFileRoute("/planner")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./notes.index-Bynwlbj1.mjs");
var Route$1 = createFileRoute("/notes/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./notes._id-CQ2KMROv.mjs");
var Route = createFileRoute("/notes/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AlertsRoute = Route$6.update({
	id: "/alerts",
	path: "/alerts",
	getParentRoute: () => Route$8
});
var CampusRoute = Route$5.update({
	id: "/campus",
	path: "/campus",
	getParentRoute: () => Route$8
});
var JobsRoute = Route$4.update({
	id: "/jobs",
	path: "/jobs",
	getParentRoute: () => Route$8
});
var NotesRoute = Route$3.update({
	id: "/notes",
	path: "/notes",
	getParentRoute: () => Route$8
});
var PlannerRoute = Route$2.update({
	id: "/planner",
	path: "/planner",
	getParentRoute: () => Route$8
});
var NotesIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => NotesRoute
});
var NotesRouteChildren = {
	NotesIdRoute: Route.update({
		id: "/$id",
		path: "/$id",
		getParentRoute: () => NotesRoute
	}),
	NotesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AlertsRoute,
	CampusRoute,
	JobsRoute,
	NotesRoute: NotesRoute._addFileChildren(NotesRouteChildren),
	PlannerRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Badge as C, deadlineTone as D, daysUntil as E, formatDeadline as O, DialogTitle as S, cn as T, Input as _, usePrefs as a, DialogDescription as b, todayIndex as c, DEADLINES as d, upcomingDeadlines as f, getResource as g, RESOURCES as h, useSaved as i, relativeDeadline as k, usePlanner as l, KIND_LABEL as m, Route as n, DAYS as o, OPENINGS as p, Route$4 as r, overallAttendance as s, router_exports as t, SelectField as u, Dialog as v, Button as w, DialogHeader as x, DialogContent as y };
