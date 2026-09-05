import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { C as Badge, O as formatDeadline, T as cn, _ as Input, i as useSaved, k as relativeDeadline, p as OPENINGS, r as Route$4, u as SelectField, w as Button } from "./router-CuA23DbT.mjs";
import { n as OpeningCard } from "./cards-CnAP15U0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-CatHpMlH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-foreground/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-card text-card-foreground shadow-card duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md rounded-l-3xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "left" && "inset-y-0 left-0 h-full w-full max-w-md rounded-r-3xl data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left", side === "bottom" && "inset-x-0 bottom-0 max-h-[88vh] rounded-t-3xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
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
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-6 pb-0", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function JobsPage() {
	const { open: openId } = Route$4.useSearch();
	const navigate = Route$4.useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("all");
	const jobs = useSaved((s) => s.jobs);
	const setJob = useSaved((s) => s.setJob);
	const list = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return OPENINGS.filter((o) => {
			if (kind !== "all" && o.kind !== kind) return false;
			if (!query) return true;
			return `${o.title} ${o.company} ${o.location} ${o.tags.join(" ")}`.toLowerCase().includes(query);
		});
	}, [q, kind]);
	const selected = OPENINGS.find((o) => o.id === openId) ?? null;
	function setOpen(id) {
		navigate({ search: { open: id } });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium tracking-wide text-muted-foreground uppercase",
					children: "Work"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-4xl font-medium tracking-tight",
					children: "Internships & jobs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-muted-foreground",
					children: "Fresh listings for 2026–28 batches. Track applied and interview without making an account — it stays on this device."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Company, role, city…",
					"aria-label": "Search jobs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
					value: kind,
					onChange: (e) => setKind(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "Internships and fresher roles"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "internship",
							children: "Internships only"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "fresher",
							children: "Fresher roles only"
						})
					]
				})]
			}),
			Object.keys(jobs).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Tracking ",
					Object.keys(jobs).length,
					" role",
					Object.keys(jobs).length > 1 ? "s" : "",
					" on this device."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpeningCard, {
					opening: o,
					onOpen: (id) => setOpen(id)
				}, o.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!selected,
				onOpenChange: (v) => !v && setOpen(void 0),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "right",
					className: "overflow-y-auto",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobDetail, {
						opening: selected,
						status: jobs[selected.id],
						onStatus: (s) => setJob(selected.id, s)
					}) : null
				})
			})
		]
	});
}
function JobDetail({ opening, status, onStatus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
		children: opening.company
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: opening.title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 px-6 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: opening.kind === "internship" ? "Internship" : "Fresher"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: opening.location
					}),
					opening.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: "Remote ok"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-faint",
						children: "Pay"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-medium",
						children: opening.pay
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-faint",
						children: "Batch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-medium",
						children: opening.batch
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-faint",
						children: "Deadline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "font-medium",
						children: [
							formatDeadline(opening.deadline),
							" · ",
							relativeDeadline(opening.deadline)
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: opening.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: "Eligibility. "
				}), opening.eligibility]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: opening.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
					children: "Your tracker"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						"saved",
						"applied",
						"interview"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: status === s ? "default" : "outline",
						onClick: () => onStatus(status === s ? null : s),
						children: s === "saved" ? "Saved" : s === "applied" ? "Applied" : "Interview"
					}, s))
				})]
			})
		]
	})] });
}
//#endregion
export { JobsPage as component };
