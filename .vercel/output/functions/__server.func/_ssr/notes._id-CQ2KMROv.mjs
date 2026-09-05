import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ChevronDown, d as Bookmark, f as BookmarkCheck, g as ArrowLeft } from "../_libs/lucide-react.mjs";
import { C as Badge, T as cn, g as getResource, h as RESOURCES, i as useSaved, m as KIND_LABEL, n as Route, w as Button } from "./router-CuA23DbT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notes._id-CQ2KMROv.js
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		className: cn("border-b border-border last:border-b-0", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
			className: cn("flex flex-1 items-center justify-between gap-3 py-4 text-left text-sm font-medium transition-colors hover:text-primary [&[data-state=open]>svg]:rotate-180", className),
			...props,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("pt-0 pb-4", className),
			children
		})
	});
}
var EMPTY_CHECKS = [];
function NoteDetail() {
	const { id } = Route.useParams();
	const resource = getResource(id);
	const saved = useSaved((s) => s.notes.includes(id));
	const toggle = useSaved((s) => s.toggleNote);
	const checks = useSaved((s) => s.checks[id]);
	const toggleCheck = useSaved((s) => s.toggleCheck);
	const checkedTopics = checks ?? EMPTY_CHECKS;
	if (!resource) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "That note is not in the vault."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/notes",
			className: "mt-4 inline-flex h-11 items-center text-sm font-medium text-primary",
			children: "Back to notes"
		})]
	});
	const related = RESOURCES.filter((r) => r.id !== id && (r.subject === resource.subject || r.college === resource.college)).slice(0, 3);
	const topics = resource.units.flatMap((u) => u.topics.map((t) => ({
		unit: u.title,
		topic: t
	})));
	const done = topics.filter((t) => checkedTopics.includes(t.topic)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-3xl flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes",
					className: "inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "All notes"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: KIND_LABEL[resource.kind]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: resource.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-faint",
							children: [
								"Sem ",
								resource.semester,
								" · ",
								resource.year,
								" · ",
								resource.pages,
								" pages"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl",
					children: resource.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: resource.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-faint",
					children: [
						resource.college,
						" · ",
						resource.course
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: saved ? "secondary" : "default",
						onClick: () => toggle(id),
						children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), saved ? "Saved" : "Save for later"]
					})
				})
			] }),
			topics.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-card p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-medium tracking-tight",
						children: "Revision checklist"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs tabular-nums text-muted-foreground",
						children: [
							done,
							"/",
							topics.length
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-1",
					children: topics.map((t) => {
						const on = checkedTopics.includes(t.topic);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-secondary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: on,
								onChange: () => toggleCheck(id, t.topic),
								className: "mt-1 size-4 rounded border-input accent-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: t.topic
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-faint",
								children: t.unit
							})] })]
						}) }, `${t.unit}-${t.topic}`);
					})
				})]
			}) : null,
			resource.units.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-medium tracking-tight",
				children: "Units"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "multiple",
				className: "mt-3 rounded-3xl bg-card px-5 shadow-card",
				children: resource.units.map((unit, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `u-${i}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, { children: unit.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1 text-sm text-muted-foreground",
						children: unit.topics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: topic }, topic))
					}) })]
				}, unit.title))
			})] }) : null,
			resource.pyqs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-medium tracking-tight",
				children: "Previous-year questions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 flex flex-col gap-3",
				children: resource.pyqs.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-3xl bg-card p-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: [
							q.year,
							" · ",
							q.marks,
							" marks"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: q.question
					})]
				}, `${q.year}-${q.question}`))
			})] }) : null,
			resource.formulas.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-medium tracking-tight",
				children: "Keep these"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-3 grid gap-2",
				children: resource.formulas.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card px-4 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: f.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono text-sm",
						children: f.body
					})]
				}, f.name))
			})] }) : null,
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-medium tracking-tight",
				children: "Related"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2",
				children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/notes/$id",
					params: { id: r.id },
					className: "flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3 shadow-card hover:shadow-card-hover",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: r.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: KIND_LABEL[r.kind]
					})]
				}) }, r.id))
			})] }) : null
		]
	});
}
//#endregion
export { NoteDetail as component };
