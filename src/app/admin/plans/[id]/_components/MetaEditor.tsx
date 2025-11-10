"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export default function MetaEditor({ planId }: { planId: string }) {
  const plan = useQuery(api.plans.getPlanById, { planId: planId as any });
  const updatePlanMeta = useMutation(api.admin.updatePlanMeta);

  const [title, setTitle] = useState("");
  const [subtext, setSubtext] = useState(""); // short line under heading
  const [heroImage, setHeroImage] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(4);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(4);
  const [minutesPerWorkout, setMinutesPerWorkout] = useState(30);
  const [description, setDescription] = useState(""); // long description
  const [category, setCategory] = useState<"students" | "housewives" | "professionals">("students");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (plan) {
      setTitle(plan.title ?? "");
      setSubtext(plan.subtext ?? "");
      setHeroImage(plan.heroImage ?? "");
      setDurationWeeks(plan.durationWeeks ?? 4);
      setWorkoutsPerWeek(plan.workoutsPerWeek ?? 4);
      setMinutesPerWorkout(plan.minutesPerWorkout ?? 30);
      setDescription(plan.description ?? "");
      setCategory(plan.category ?? "students");
    }
  }, [plan]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePlanMeta({
        planId: planId as any,
        patch: {
          title,
          subtext,
          heroImage,
          durationWeeks,
          workoutsPerWeek,
          minutesPerWorkout,
          description,
          category,
        },
      });
      alert("Meta updated ✅");
    } finally {
      setSaving(false);
    }
  }

  if (plan === undefined) return <p>Loading…</p>;
  if (plan === null) return <p className="text-red-500">Plan not found</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      {/* Hero Image */}
      <div>
        <label className="block text-sm font-medium mb-1">Plan Image URL</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={heroImage}
          onChange={(e) => setHeroImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-neutral-500 mt-1">
          Later we’ll add file upload here.
        </p>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Hybrid Athlete Plan"
        />
      </div>

      {/* Subtext */}
      <div>
        <label className="block text-sm font-medium mb-1">Subtext</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={subtext}
          onChange={(e) => setSubtext(e.target.value)}
          placeholder="4-week progressive plan"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
        >
          <option value="students">Students</option>
          <option value="housewives">Housewives</option>
          <option value="professionals">Professionals</option>
        </select>
      </div>

      {/* Duration / Workouts / Minutes */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Duration (weeks)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={durationWeeks}
            onChange={(e) => setDurationWeeks(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Workouts per Week</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={workoutsPerWeek}
            onChange={(e) => setWorkoutsPerWeek(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Minutes per Workout</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={minutesPerWorkout}
            onChange={(e) => setMinutesPerWorkout(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Long Description */}
      <div>
        <label className="block text-sm font-medium mb-1">About this plan</label>
        <textarea
          className="w-full border rounded px-3 py-2 min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="This plan is designed for people who want to gain muscles as well as do running on a regular basis..."
        />
      </div>

      {/* Save button */}
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-black text-white px-4 py-2"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
