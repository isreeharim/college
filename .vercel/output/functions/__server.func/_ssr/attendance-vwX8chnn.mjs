import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { T as cn } from "./router-CuA23DbT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-vwX8chnn.js
var import_jsx_runtime = require_jsx_runtime();
function Progress({ value, className, barClassName }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full bg-primary transition-[width] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]", barClassName),
			style: { width: `${pct}%` }
		})
	});
}
var DEFAULT_REQUIRED = .75;
function attendancePct(present, total) {
	if (total <= 0) return 100;
	return present / total * 100;
}
/** How many future classes can be missed while staying at `required`. */
function bunksLeft(present, total, required = DEFAULT_REQUIRED) {
	if (total < 0 || present < 0) return 0;
	if (required <= 0) return Infinity;
	const x = Math.floor(present / required - total);
	return Math.max(0, x);
}
/** How many consecutive classes must be attended to climb back to `required`. */
function mustAttend(present, total, required = DEFAULT_REQUIRED) {
	if (required >= 1) return present >= total ? 0 : Infinity;
	const need = required * total - present;
	if (need <= 0) return 0;
	const y = Math.ceil(need / (1 - required));
	return Math.max(0, y);
}
function statusFor(present, total, required = DEFAULT_REQUIRED) {
	const pct = attendancePct(present, total);
	if (pct >= required * 100 + 5) return "safe";
	if (pct >= required * 100) return "edge";
	return "risk";
}
//#endregion
export { statusFor as a, mustAttend as i, attendancePct as n, bunksLeft as r, Progress as t };
