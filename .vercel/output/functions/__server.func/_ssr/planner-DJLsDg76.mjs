import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Plus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { C as Badge, S as DialogTitle, T as cn, _ as Input, b as DialogDescription, c as todayIndex, l as usePlanner, o as DAYS, s as overallAttendance, u as SelectField, v as Dialog, w as Button, x as DialogHeader, y as DialogContent } from "./router-CuA23DbT.mjs";
import { a as statusFor, i as mustAttend, n as attendancePct, r as bunksLeft, t as Progress } from "./attendance-vwX8chnn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/planner-DJLsDg76.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-foreground peer-disabled:opacity-50", className),
		...props
	});
}
var HOURS = [
	"09:00",
	"10:00",
	"11:00",
	"12:00",
	"13:00",
	"14:00",
	"15:00",
	"16:00"
];
function PlannerPage() {
	const slots = usePlanner((s) => s.slots);
	const subjects = usePlanner((s) => s.subjects);
	const required = usePlanner((s) => s.required);
	const mark = usePlanner((s) => s.mark);
	const setCounts = usePlanner((s) => s.setCounts);
	const addSubject = usePlanner((s) => s.addSubject);
	const removeSubject = usePlanner((s) => s.removeSubject);
	const addSlot = usePlanner((s) => s.addSlot);
	const removeSlot = usePlanner((s) => s.removeSlot);
	const setSlot = usePlanner((s) => s.setSlot);
	const setRequired = usePlanner((s) => s.setRequired);
	const [newSubject, setNewSubject] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const today = todayIndex();
	const overall = overallAttendance(subjects);
	const todaySlots = (0, import_react.useMemo)(() => slots.filter((s) => s.day === today).sort((a, b) => a.start.localeCompare(b.start)), [slots, today]);
	function cell(day, hour) {
		return slots.find((s) => s.day === day && s.start <= hour && s.end > hour);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-wide text-muted-foreground uppercase",
						children: "This device"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl font-medium tracking-tight",
						children: "Timetable & attendance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-2xl text-muted-foreground",
						children: [
							"Indian colleges detain at ",
							(required * 100).toFixed(0),
							"%. Mark today, then see how many classes you can still miss."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "req",
						className: "text-xs text-muted-foreground",
						children: "Required"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						id: "req",
						value: String(required),
						onChange: (e) => setRequired(Number(e.target.value)),
						className: "h-11 w-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "0.7",
								children: "70%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "0.75",
								children: "75%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "0.8",
								children: "80%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "0.85",
								children: "85%"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-primary p-5 text-primary-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide uppercase opacity-80",
							children: "Overall"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-5xl font-medium tabular-nums",
							children: [overall.pct.toFixed(1), "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm opacity-80",
							children: [
								overall.present,
								" of ",
								overall.total,
								" held"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-card p-5 shadow-card md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-medium tracking-tight",
						children: "Mark today"
					}), today < 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Sunday — no grid."
					}) : todaySlots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: [
							"Nothing on ",
							DAYS[today],
							". Add a slot on the grid."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-col gap-2",
						children: todaySlots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-secondary px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: slot.subject
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									slot.start,
									"–",
									slot.end,
									" · ",
									slot.room
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => mark(slot.subject, true),
									children: "Present"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => mark(slot.subject, false),
									children: "Missed"
								})]
							})]
						}, slot.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => setEditing({
						day: Math.max(0, today),
						start: "09:00",
						end: "10:00",
						subject: subjects[0]?.name ?? "",
						room: ""
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add slot"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-3xl bg-card p-3 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-2xl border-separate border-spacing-1 text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "w-16 px-1 py-2 font-medium text-faint",
						children: " "
					}), DAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: cn("px-1 py-2 text-center font-medium", i === today ? "text-primary" : "text-muted-foreground"),
						children: d
					}, d))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: HOURS.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-0.5 font-mono tabular-nums text-faint",
						children: hour
					}), DAYS.map((_, day) => {
						const slot = cell(day, hour);
						const isStart = slot && slot.start === hour;
						if (slot && !isStart) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-0" }, day);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "p-0 align-top",
							children: slot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setEditing(slot),
								className: "flex min-h-11 w-full flex-col rounded-xl bg-accent px-2 py-1.5 text-left text-accent-foreground hover:bg-primary hover:text-primary-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2 font-medium leading-tight",
									children: slot.subject
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs opacity-80",
									children: slot.room
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Add class ${DAYS[day]} ${hour}`,
								onClick: () => setEditing({
									day,
									start: hour,
									end: addHour(hour),
									subject: subjects[0]?.name ?? "",
									room: ""
								}),
								className: "min-h-11 w-full rounded-xl hover:bg-secondary"
							})
						}, day);
					})] }, hour)) })]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Subjects"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-3",
					children: subjects.map((row) => {
						const pct = attendancePct(row.present, row.total);
						const status = statusFor(row.present, row.total, required);
						const bunk = bunksLeft(row.present, row.total, required);
						const need = mustAttend(row.present, row.total, required);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-3xl bg-card p-4 shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: row.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: status === "risk" ? `Attend ${need} more without missing` : `You can miss ${bunk} more`
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: status === "risk" ? "danger" : status === "edge" ? "warn" : "good",
											children: [pct.toFixed(1), "%"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "icon-sm",
											variant: "ghost",
											"aria-label": `Remove ${row.name}`,
											onClick: () => removeSubject(row.name),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: pct,
									className: "mt-3",
									barClassName: status === "risk" ? "bg-destructive" : status === "edge" ? "bg-warn" : "bg-good"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-faint",
											children: "Present"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											className: "h-9 w-20",
											value: row.present,
											onChange: (e) => setCounts(row.name, Number(e.target.value), row.total)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-faint",
											children: "of"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											className: "h-9 w-20",
											value: row.total,
											onChange: (e) => setCounts(row.name, row.present, Number(e.target.value))
										})
									]
								})
							]
						}, row.name);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						addSubject(newSubject);
						setNewSubject("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: newSubject,
						onChange: (e) => setNewSubject(e.target.value),
						placeholder: "Add a subject",
						"aria-label": "New subject"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						children: "Add"
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotDialog, {
				open: !!editing,
				slot: editing,
				subjects: subjects.map((s) => s.name),
				onClose: () => setEditing(null),
				onSave: (next) => {
					if (next.id) setSlot(next.id, next);
					else addSlot({
						day: next.day ?? 0,
						start: next.start ?? "09:00",
						end: next.end ?? "10:00",
						subject: next.subject ?? subjects[0]?.name ?? "Class",
						room: next.room ?? ""
					});
					setEditing(null);
				},
				onDelete: (id) => {
					removeSlot(id);
					setEditing(null);
				}
			})
		]
	});
}
function addHour(hour) {
	const [h, m] = hour.split(":").map(Number);
	const next = ((h ?? 9) + 1) % 24;
	return `${String(next).padStart(2, "0")}:${String(m ?? 0).padStart(2, "0")}`;
}
function SlotDialog({ open, slot, subjects, onClose, onSave, onDelete }) {
	const [draft, setDraft] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		setDraft({});
	}, [open, slot?.id]);
	const merged = {
		...slot,
		...draft
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) {
				setDraft({});
				onClose();
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: slot?.id ? "Edit class" : "Add class" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Shown on the week grid." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Day" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							value: String(merged.day ?? 0),
							onChange: (e) => setDraft((d) => ({
								...d,
								day: Number(e.target.value)
							})),
							children: DAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: i,
								children: d
							}, d))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							value: merged.subject ?? subjects[0] ?? "",
							onChange: (e) => setDraft((d) => ({
								...d,
								subject: e.target.value
							})),
							children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Starts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: merged.start ?? "09:00",
							onChange: (e) => setDraft((d) => ({
								...d,
								start: e.target.value
							}))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ends" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: merged.end ?? "10:00",
							onChange: (e) => setDraft((d) => ({
								...d,
								end: e.target.value
							}))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Room" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: merged.room ?? "",
						onChange: (e) => setDraft((d) => ({
							...d,
							room: e.target.value
						})),
						placeholder: "CS-201"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex justify-between gap-2",
					children: [slot?.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "destructive",
						onClick: () => onDelete(slot.id),
						children: "Remove"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => {
							onSave({
								...slot,
								...draft
							});
							setDraft({});
						},
						children: "Save"
					})]
				})
			]
		})] })
	});
}
//#endregion
export { PlannerPage as component };
