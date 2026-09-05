import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowRight } from "../_libs/lucide-react.mjs";
import { C as Badge, a as usePrefs, c as todayIndex, f as upcomingDeadlines, h as RESOURCES, i as useSaved, l as usePlanner, o as DAYS, p as OPENINGS, s as overallAttendance, w as Button } from "./router-CuA23DbT.mjs";
import { n as OpeningCard, r as ResourceCard, t as DeadlineRow } from "./cards-CnAP15U0.mjs";
import { a as statusFor, i as mustAttend, n as attendancePct, t as Progress } from "./attendance-vwX8chnn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJDOqXHo.js
var import_jsx_runtime = require_jsx_runtime();
function greeting() {
	const h = (/* @__PURE__ */ new Date()).getHours();
	if (h < 5) return "Still up";
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	return "Good evening";
}
function Home() {
	const navigate = useNavigate();
	const college = usePrefs((s) => s.college);
	const subjects = usePlanner((s) => s.subjects);
	const slots = usePlanner((s) => s.slots);
	const required = usePlanner((s) => s.required);
	const savedNotes = useSaved((s) => s.notes);
	const overall = overallAttendance(subjects);
	const today = todayIndex();
	const todaySlots = slots.filter((s) => s.day === today).sort((a, b) => a.start.localeCompare(b.start));
	const atRisk = subjects.filter((s) => statusFor(s.present, s.total, required) === "risk");
	const featured = [...RESOURCES.filter((r) => r.college === college), ...RESOURCES].filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i).slice(0, 4);
	const jobs = OPENINGS.slice(0, 3);
	const soon = upcomingDeadlines(30).slice(0, 4);
	const dateLabel = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-wide text-muted-foreground uppercase",
						children: dateLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 font-display text-4xl font-medium tracking-tight text-pretty md:text-5xl",
						children: [greeting(), "."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-xl text-muted-foreground",
						children: [
							college,
							" · ",
							savedNotes.length,
							" saved notes · keep the",
							" ",
							(required * 100).toFixed(0),
							"% line, then everything else."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/planner",
						children: ["Open planner", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-primary p-5 text-primary-foreground md:col-span-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide uppercase opacity-80",
							children: "Attendance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-display text-5xl font-medium tabular-nums tracking-tight",
							children: [overall.pct.toFixed(0), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl opacity-70",
								children: "%"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm opacity-80",
							children: [
								overall.present,
								"/",
								overall.total,
								" classes · bar is ",
								(required * 100).toFixed(0),
								"%"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-2 overflow-hidden rounded-full bg-primary-foreground/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary-foreground",
								style: { width: `${Math.min(100, overall.pct)}%` }
							})
						}),
						atRisk.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm",
							children: [
								atRisk.length,
								" subject",
								atRisk.length > 1 ? "s" : "",
								" below the line."
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm opacity-80",
							children: "All subjects are holding."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-card p-5 shadow-card md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-medium tracking-tight",
							children: "Today"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: today < 0 ? "Sunday" : DAYS[today]
						})]
					}), today < 0 || todaySlots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-sm text-muted-foreground",
						children: "No classes on the timetable for today. Use the extra day on a PYQ paper."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: todaySlots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 rounded-2xl bg-secondary px-3 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: slot.subject
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: slot.room
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-xs tabular-nums text-muted-foreground",
								children: [
									slot.start,
									"–",
									slot.end
								]
							})]
						}, slot.id))
					})]
				})]
			}),
			atRisk.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-card p-5 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium tracking-tight",
					children: "Below the line"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-col gap-3",
					children: atRisk.map((row) => {
						const pct = attendancePct(row.present, row.total);
						const need = mustAttend(row.present, row.total, required);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: row.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs tabular-nums text-destructive",
								children: [
									pct.toFixed(1),
									"% · attend ",
									need,
									" more"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: pct,
							barClassName: "bg-destructive"
						})] }, row.name);
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Deadlines"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/alerts",
					className: "text-sm font-medium text-primary hover:underline",
					children: "All alerts"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: soon.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadlineRow, { item: d }, d.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Notes near you"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/notes",
					className: "text-sm font-medium text-primary hover:underline",
					children: "Browse all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: featured.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceCard, { resource: r }, r.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Openings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jobs",
					className: "text-sm font-medium text-primary hover:underline",
					children: "Internships & jobs"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: jobs.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpeningCard, {
					opening: o,
					onOpen: (id) => {
						navigate({
							to: "/jobs",
							search: { open: id }
						});
					}
				}, o.id))
			})] })
		]
	});
}
//#endregion
export { Home as component };
