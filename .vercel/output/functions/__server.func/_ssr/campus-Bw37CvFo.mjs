import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as COLLEGES } from "./colleges-Bigng42M.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
import { _ as ArrowBigUp } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Badge, T as cn, a as usePrefs, i as useSaved, u as SelectField, w as Button } from "./router-CuA23DbT.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campus-Bw37CvFo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("min-h-28 w-full rounded-xl border border-input bg-card px-3 py-2.5 text-base text-foreground outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-faint focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var CATEGORY_LABEL = {
	confession: "Confession",
	rant: "Rant",
	advice: "Advice",
	lost: "Lost + found",
	event: "Event"
};
var listSchema = object({
	college: string().optional(),
	category: string().optional()
});
var listConfessions = createServerFn({ method: "GET" }).validator(listSchema).handler(createSsrRpc("591887ac263a82d6bcd7b39911ef4a3f25f93c6284d0e20d0958e4b0c5422b17"));
var createSchema = object({
	college: string().min(1).max(80),
	category: _enum(CATEGORIES),
	body: string().min(12).max(800)
});
var createConfession = createServerFn({ method: "POST" }).validator(createSchema).handler(createSsrRpc("ed459cf7c28718224b019d4263f31f9bb582139d8f447c9d451986bd2be2da56"));
var voteSchema = object({ id: number().int().positive() });
var upvoteConfession = createServerFn({ method: "POST" }).validator(voteSchema).handler(createSsrRpc("ff7b1ff75fa3ba7f25c7a8efca4525ea92ac3024a7d1c0b778fe5fcd38fc46e3"));
function CampusPage() {
	const collegePref = usePrefs((s) => s.college);
	const [college, setCollege] = (0, import_react.useState)("all");
	const [category, setCategory] = (0, import_react.useState)("all");
	const queryClient = useQueryClient();
	const list = useQuery({
		queryKey: [
			"confessions",
			college,
			category
		],
		queryFn: () => listConfessions({ data: {
			college: college === "all" ? void 0 : college,
			category: category === "all" ? void 0 : category
		} })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-2xl flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-muted-foreground uppercase",
					children: "Anonymous"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-medium tracking-tight",
					children: "Campus board"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted-foreground",
					children: [
						"No names. No profiles. Advice, rants, lost property, and the things the official group chat will not say. Default campus is ",
						collegePref,
						"."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
				defaultCollege: collegePref,
				onPosted: () => {
					queryClient.invalidateQueries({ queryKey: ["confessions"] });
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
					value: college,
					onChange: (e) => setCollege(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All campuses"
					}), COLLEGES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c,
						children: c
					}, c))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
					value: category,
					onChange: (e) => setCategory(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "All threads"
					}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c,
						children: CATEGORY_LABEL[c]
					}, c))]
				})]
			}),
			list.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-12 text-center text-sm text-muted-foreground",
				children: "Loading the board…"
			}) : list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-3xl bg-card px-5 py-8 text-center text-sm text-destructive shadow-card",
				children: "Could not load the board. Try again in a moment."
			}) : list.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-3xl bg-card px-5 py-12 text-center text-sm text-muted-foreground shadow-card",
				children: "Quiet so far. Post the first note."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: list.data?.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
			})
		]
	});
}
function Composer({ defaultCollege, onPosted }) {
	const [college, setCollege] = (0, import_react.useState)(defaultCollege);
	const [category, setCategory] = (0, import_react.useState)("confession");
	const [body, setBody] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setCollege(defaultCollege);
	}, [defaultCollege]);
	const mutation = useMutation({
		mutationFn: () => createConfession({ data: {
			college,
			category,
			body
		} }),
		onSuccess: () => {
			setBody("");
			toast.success("Posted anonymously");
			onPosted();
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Could not post");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "rounded-3xl bg-card p-4 shadow-card",
		onSubmit: (e) => {
			e.preventDefault();
			mutation.mutate();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					value: college,
					onChange: (e) => setCollege(e.target.value),
					children: COLLEGES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c,
						children: c
					}, c))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					value: category,
					onChange: (e) => setCategory(e.target.value),
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c,
						children: CATEGORY_LABEL[c]
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-3",
				value: body,
				onChange: (e) => setBody(e.target.value),
				maxLength: 800,
				placeholder: "Write it as you would on a bathroom stall — useful, not cruel. No names."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs tabular-nums text-faint",
					children: [body.length, "/800"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: body.trim().length < 12 || mutation.isPending,
					children: mutation.isPending ? "Posting…" : "Post anonymously"
				})]
			})
		]
	});
}
function PostCard({ post }) {
	const voted = useSaved((s) => s.voted.includes(post.id));
	const markVoted = useSaved((s) => s.markVoted);
	const queryClient = useQueryClient();
	const vote = useMutation({
		mutationFn: () => upvoteConfession({ data: { id: post.id } }),
		onSuccess: () => {
			markVoted(post.id);
			queryClient.invalidateQueries({ queryKey: ["confessions"] });
		}
	});
	const when = formatAgo(post.created_at);
	const cat = post.category;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-3xl bg-card p-4 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: CATEGORY_LABEL[cat] ?? post.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-faint",
						children: post.college
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-faint",
						children: ["· ", when]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed",
				children: post.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					size: "sm",
					variant: voted ? "secondary" : "outline",
					disabled: voted || vote.isPending,
					onClick: () => vote.mutate(),
					className: cn("gap-1"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowBigUp, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: post.upvotes
					})]
				})
			})
		]
	});
}
function formatAgo(value) {
	const t = new Date(value).getTime();
	if (Number.isNaN(t)) return "";
	const mins = Math.max(0, Math.round((Date.now() - t) / 6e4));
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins}m`;
	const hours = Math.round(mins / 60);
	if (hours < 24) return `${hours}h`;
	return `${Math.round(hours / 24)}d`;
}
//#endregion
export { CampusPage as component };
