import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SelectField } from "@/components/ui/select-field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  attendancePct,
  bunksLeft,
  mustAttend,
  statusFor,
} from "@/lib/data/attendance";
import {
  DAYS,
  overallAttendance,
  todayIndex,
  usePlanner,
  type Slot,
} from "@/lib/stores/planner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planner")({ component: PlannerPage });

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

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
  const [newSubject, setNewSubject] = useState("");
  const [editing, setEditing] = useState<Partial<Slot> | null>(null);
  const today = todayIndex();
  const overall = overallAttendance(subjects);

  const todaySlots = useMemo(
    () =>
      slots
        .filter((s) => s.day === today)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [slots, today],
  );

  function cell(day: number, hour: string): Slot | undefined {
    return slots.find((s) => s.day === day && s.start <= hour && s.end > hour);
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            This device
          </p>
          <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
            Timetable & attendance
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Indian colleges detain at {(required * 100).toFixed(0)}%. Mark today,
            then see how many classes you can still miss.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="req" className="text-xs text-muted-foreground">
            Required
          </Label>
          <SelectField
            id="req"
            value={String(required)}
            onChange={(e) => setRequired(Number(e.target.value))}
            className="h-11 w-28"
          >
            <option value="0.7">70%</option>
            <option value="0.75">75%</option>
            <option value="0.8">80%</option>
            <option value="0.85">85%</option>
          </SelectField>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-primary p-5 text-primary-foreground">
          <p className="text-xs font-medium tracking-wide uppercase opacity-80">
            Overall
          </p>
          <p className="mt-2 font-display text-5xl font-medium tabular-nums">
            {overall.pct.toFixed(1)}%
          </p>
          <p className="mt-2 text-sm opacity-80">
            {overall.present} of {overall.total} held
          </p>
        </div>
        <div className="rounded-3xl bg-card p-5 shadow-card md:col-span-2">
          <h2 className="font-display text-xl font-medium tracking-tight">
            Mark today
          </h2>
          {today < 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Sunday — no grid.</p>
          ) : todaySlots.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Nothing on {DAYS[today]}. Add a slot on the grid.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {todaySlots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-secondary px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{slot.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {slot.start}–{slot.end} · {slot.room}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => mark(slot.subject, true)}>
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => mark(slot.subject, false)}
                    >
                      Missed
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Week
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setEditing({
                day: Math.max(0, today),
                start: "09:00",
                end: "10:00",
                subject: subjects[0]?.name ?? "",
                room: "",
              })
            }
          >
            <Plus className="size-4" />
            Add slot
          </Button>
        </div>
        <div className="overflow-x-auto rounded-3xl bg-card p-3 shadow-card">
          <table className="w-full min-w-2xl border-separate border-spacing-1 text-left text-xs">
            <thead>
              <tr>
                <th className="w-16 px-1 py-2 font-medium text-faint"> </th>
                {DAYS.map((d, i) => (
                  <th
                    key={d}
                    className={cn(
                      "px-1 py-2 text-center font-medium",
                      i === today ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour}>
                  <td className="px-1 py-0.5 font-mono tabular-nums text-faint">
                    {hour}
                  </td>
                  {DAYS.map((_, day) => {
                    const slot = cell(day, hour);
                    const isStart = slot && slot.start === hour;
                    if (slot && !isStart) {
                      return <td key={day} className="p-0" />;
                    }
                    return (
                      <td key={day} className="p-0 align-top">
                        {slot ? (
                          <button
                            type="button"
                            onClick={() => setEditing(slot)}
                            className="flex min-h-11 w-full flex-col rounded-xl bg-accent px-2 py-1.5 text-left text-accent-foreground hover:bg-primary hover:text-primary-foreground"
                          >
                            <span className="line-clamp-2 font-medium leading-tight">
                              {slot.subject}
                            </span>
                            <span className="text-xs opacity-80">{slot.room}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            aria-label={`Add class ${DAYS[day]} ${hour}`}
                            onClick={() =>
                              setEditing({
                                day,
                                start: hour,
                                end: addHour(hour),
                                subject: subjects[0]?.name ?? "",
                                room: "",
                              })
                            }
                            className="min-h-11 w-full rounded-xl hover:bg-secondary"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-medium tracking-tight">
          Subjects
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {subjects.map((row) => {
            const pct = attendancePct(row.present, row.total);
            const status = statusFor(row.present, row.total, required);
            const bunk = bunksLeft(row.present, row.total, required);
            const need = mustAttend(row.present, row.total, required);
            return (
              <li key={row.name} className="rounded-3xl bg-card p-4 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {status === "risk"
                        ? `Attend ${need} more without missing`
                        : `You can miss ${bunk} more`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        status === "risk"
                          ? "danger"
                          : status === "edge"
                            ? "warn"
                            : "good"
                      }
                    >
                      {pct.toFixed(1)}%
                    </Badge>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Remove ${row.name}`}
                      onClick={() => removeSubject(row.name)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <Progress
                  value={pct}
                  className="mt-3"
                  barClassName={
                    status === "risk"
                      ? "bg-destructive"
                      : status === "edge"
                        ? "bg-warn"
                        : "bg-good"
                  }
                />
                <div className="mt-3 flex items-center gap-2">
                  <Label className="text-xs text-faint">Present</Label>
                  <Input
                    type="number"
                    min={0}
                    className="h-9 w-20"
                    value={row.present}
                    onChange={(e) =>
                      setCounts(row.name, Number(e.target.value), row.total)
                    }
                  />
                  <Label className="text-xs text-faint">of</Label>
                  <Input
                    type="number"
                    min={0}
                    className="h-9 w-20"
                    value={row.total}
                    onChange={(e) =>
                      setCounts(row.name, row.present, Number(e.target.value))
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addSubject(newSubject);
            setNewSubject("");
          }}
        >
          <Input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Add a subject"
            aria-label="New subject"
          />
          <Button type="submit" variant="secondary">
            Add
          </Button>
        </form>
      </section>

      <SlotDialog
        open={!!editing}
        slot={editing}
        subjects={subjects.map((s) => s.name)}
        onClose={() => setEditing(null)}
        onSave={(next) => {
          if (next.id) {
            setSlot(next.id, next);
          } else {
            addSlot({
              day: next.day ?? 0,
              start: next.start ?? "09:00",
              end: next.end ?? "10:00",
              subject: next.subject ?? subjects[0]?.name ?? "Class",
              room: next.room ?? "",
            });
          }
          setEditing(null);
        }}
        onDelete={(id) => {
          removeSlot(id);
          setEditing(null);
        }}
      />
    </div>
  );
}

function addHour(hour: string): string {
  const [h, m] = hour.split(":").map(Number);
  const next = ((h ?? 9) + 1) % 24;
  return `${String(next).padStart(2, "0")}:${String(m ?? 0).padStart(2, "0")}`;
}

function SlotDialog({
  open,
  slot,
  subjects,
  onClose,
  onSave,
  onDelete,
}: {
  open: boolean;
  slot: Partial<Slot> | null;
  subjects: string[];
  onClose: () => void;
  onSave: (slot: Partial<Slot>) => void;
  onDelete: (id: string) => void;
}) {
  const [draft, setDraft] = useState<Partial<Slot>>({});

  useEffect(() => {
    setDraft({});
  }, [open, slot?.id]);

  const merged = { ...slot, ...draft };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setDraft({});
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{slot?.id ? "Edit class" : "Add class"}</DialogTitle>
          <DialogDescription>Shown on the week grid.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label>Day</Label>
              <SelectField
                value={String(merged.day ?? 0)}
                onChange={(e) => setDraft((d) => ({ ...d, day: Number(e.target.value) }))}
              >
                {DAYS.map((d, i) => (
                  <option key={d} value={i}>
                    {d}
                  </option>
                ))}
              </SelectField>
            </div>
            <div className="grid gap-1.5">
              <Label>Subject</Label>
              <SelectField
                value={merged.subject ?? subjects[0] ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, subject: e.target.value }))}
              >
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label>Starts</Label>
              <Input
                type="time"
                value={merged.start ?? "09:00"}
                onChange={(e) => setDraft((d) => ({ ...d, start: e.target.value }))}
              />
            </div>
            <div className="grid gap-1.5">
              <Label>Ends</Label>
              <Input
                type="time"
                value={merged.end ?? "10:00"}
                onChange={(e) => setDraft((d) => ({ ...d, end: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>Room</Label>
            <Input
              value={merged.room ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, room: e.target.value }))}
              placeholder="CS-201"
            />
          </div>
          <div className="mt-2 flex justify-between gap-2">
            {slot?.id ? (
              <Button type="button" variant="destructive" onClick={() => onDelete(slot.id!)}>
                Remove
              </Button>
            ) : (
              <span />
            )}
            <Button
              type="button"
              onClick={() => {
                onSave({ ...slot, ...draft });
                setDraft({});
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
