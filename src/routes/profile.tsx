import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getHuntState, saveProfile } from "@/lib/hunt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, EDUCATIONS, WORK_MODES } from "@/lib/types";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user, isPending } = useCurrentUserState();
  const me = useCurrentUser();
  const nav = useNavigate();
  const hunt = useQuery({ queryKey: ["hunt"], queryFn: () => getHuntState() });
  const p = hunt.data?.profile;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "Undergraduate",
    degree: "",
    college: "",
    graduationYear: 2026,
    skills: "",
    experience: "Fresher",
    categories: "Software",
    locations: "",
    workMode: "Any",
    resumeUrl: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!p && !me) return;
    setForm((prev) => ({
      ...prev,
      name: p?.name || me?.displayName || prev.name,
      email: p?.email || me?.primaryEmail || prev.email,
      phone: p?.phone || prev.phone,
      education: p?.education || prev.education,
      degree: p?.degree || prev.degree,
      college: p?.college || prev.college,
      graduationYear: p?.graduationYear || prev.graduationYear,
      skills: p?.skills || prev.skills,
      experience: p?.experience || prev.experience,
      categories: p?.categories || prev.categories,
      locations: p?.locations || prev.locations,
      workMode: p?.workMode || prev.workMode,
      resumeUrl: p?.resumeUrl || prev.resumeUrl,
    }));
  }, [p, me]);

  if (isPending) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!user) return <RedirectToSignIn />;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await saveProfile({
        data: {
          ...form,
          graduationYear: Number(form.graduationYear) || null,
        },
      });
      nav({ to: hunt.data?.access.active ? "/dashboard" : "/pay" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
      setBusy(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={(e) => void onSubmit(e)}>
      <h1 className="font-display text-3xl font-medium tracking-tight">Profile</h1>
      <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
      <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
      <div className="space-y-1.5">
        <Label>Education</Label>
        <SelectField value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })}>
          {EDUCATIONS.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </SelectField>
      </div>
      <Field label="Degree" value={form.degree} onChange={(v) => setForm({ ...form, degree: v })} />
      <Field label="College" value={form.college} onChange={(v) => setForm({ ...form, college: v })} />
      <Field
        label="Graduation year"
        type="number"
        value={String(form.graduationYear)}
        onChange={(v) => setForm({ ...form, graduationYear: Number(v) })}
      />
      <div className="space-y-1.5">
        <Label>Skills</Label>
        <Textarea value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, SQL, Java" />
      </div>
      <Field label="Experience" value={form.experience} onChange={(v) => setForm({ ...form, experience: v })} />
      <div className="space-y-1.5">
        <Label>Preferred categories</Label>
        <SelectField value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </SelectField>
      </div>
      <Field label="Preferred locations" value={form.locations} onChange={(v) => setForm({ ...form, locations: v })} />
      <div className="space-y-1.5">
        <Label>Work mode</Label>
        <SelectField value={form.workMode} onChange={(e) => setForm({ ...form, workMode: e.target.value })}>
          {WORK_MODES.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </SelectField>
      </div>
      <Field label="Resume link" value={form.resumeUrl} onChange={(v) => setForm({ ...form, resumeUrl: v })} />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="h-12 w-full" disabled={busy}>
        {busy ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
