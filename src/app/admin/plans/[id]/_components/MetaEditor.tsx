"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Category } from "@/types/plans";
import Image from "next/image";

export default function MetaEditor({ planId }: { planId: string }) {
  const plan = useQuery(api.plans.getPlanById, { planId: planId as Id<"plans"> });
  const updatePlanMeta = useMutation(api.admin.updatePlanMeta);

  const [title, setTitle] = useState("");
  const [subtext, setSubtext] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(4);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(4);
  const [minutesPerWorkout, setMinutesPerWorkout] = useState(30);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("students");
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
        planId: planId as Id<"plans">,
        patch: { title, subtext, heroImage, durationWeeks, workoutsPerWeek, minutesPerWorkout, description, category },
      });
      alert("Meta updated ✅");
    } finally {
      setSaving(false);
    }
  }

  if (plan === undefined) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-neutral-900 mb-3"></div>
          <p className="text-sm text-neutral-600">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (plan === null) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-white rounded-xl border border-neutral-200 p-8 max-w-md text-center">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="font-semibold text-neutral-900 mb-1">Plan not found</p>
          <p className="text-sm text-neutral-600">This plan does not exist or has been deleted</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-neutral-900 mb-1.5">Hero Image</label>
            <input
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-neutral-500 mt-1.5">Paste an image URL. File upload coming soon.</p>
          </div>
        </div>

        {heroImage && (
          <div className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
            <div className="px-3 py-2 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600">Preview</span>
            </div>
            <div className="relative aspect-video bg-neutral-100">
              <Image
                src={heroImage}
                alt="Hero preview"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center bg-neutral-100">
                <div className="text-center text-neutral-400">
                  <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-xs">Invalid image URL</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Basic Info & Category */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Plan Title</label>
            <input
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hybrid Athlete Plan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subtext</label>
            <input
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
              value={subtext}
              onChange={(e) => setSubtext(e.target.value)}
              placeholder="4-week progressive plan"
            />
            <p className="text-xs text-neutral-500 mt-1">Short tagline under the title</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
            <select
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              <option value="students">🎓 Students</option>
              <option value="housewives">🏠 Housewives</option>
              <option value="professionals">💼 Professionals</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-neutral-900 mb-4">Program Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Duration (weeks)</label>
              <input
                type="number"
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base font-semibold focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(Number(e.target.value))}
                min={1}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Workouts per Week</label>
              <input
                type="number"
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base font-semibold focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                value={workoutsPerWeek}
                onChange={(e) => setWorkoutsPerWeek(Number(e.target.value))}
                min={1}
                max={7}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5">Minutes per Workout</label>
              <input
                type="number"
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-base font-semibold focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all"
                value={minutesPerWorkout}
                onChange={(e) => setMinutesPerWorkout(Number(e.target.value))}
                min={5}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6">
        <label className="block text-sm font-semibold text-neutral-900 mb-3">About This Plan</label>
        <textarea
          className="w-full border border-neutral-300 rounded-lg px-3 py-3 min-h-[120px] text-sm focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 transition-all leading-relaxed resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the plan's goals, target audience, and what participants can expect..."
        />
        <p className="text-xs text-neutral-500 mt-2">Detailed description of the plan</p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
        >
          {saving ? (
            <>
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}