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
  const [subtext, setSubtext] = useState(""); // short line under heading
  const [heroImage, setHeroImage] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(4);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(4);
  const [minutesPerWorkout, setMinutesPerWorkout] = useState(30);
  const [description, setDescription] = useState(""); // long description
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

  if (plan === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600 font-medium">Loading plan details...</p>
        </div>
      </div>
    );
  }

  if (plan === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold text-center text-lg">Plan not found</p>
          <p className="text-slate-600 text-center text-sm mt-2">The requested plan does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  const categoryColors: Record<Category, string> = {
    students: "bg-blue-100 text-blue-700 border-blue-200",
    housewives: "bg-pink-100 text-pink-700 border-pink-200",
    professionals: "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Plan Metadata</h1>
            <p className="text-slate-600">Configure basic information and settings for this plan</p>
          </div>

          <div className="space-y-8">
            {/* Hero Image Section */}
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Plan Hero Image</label>
                  <input
                    className="w-full border-2 border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    File upload feature coming soon. For now, paste an image URL.
                  </p>
                </div>
              </div>

              {/* Image Preview */}
              {heroImage && (
                <div className="mt-4 border-2 border-slate-200 rounded-lg overflow-hidden bg-white">
                  <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Preview</span>
                    <span className="text-xs text-slate-500">Hero Image</span>
                  </div>
                  <div className="relative aspect-video bg-slate-100">
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
                    <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-100">
                      <div className="text-center text-slate-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-sm">Invalid image URL</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Basic Information
              </h2>

              <div className="grid gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Plan Title</label>
                  <input
                    className="w-full border-2 border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 font-medium"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Hybrid Athlete Plan"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Subtext</label>
                  <input
                    className="w-full border-2 border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700"
                    value={subtext}
                    onChange={(e) => setSubtext(e.target.value)}
                    placeholder="4-week progressive plan"
                  />
                  <p className="text-xs text-slate-500">A short tagline that appears under the title</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Target Category</label>
                  <select
                    className={`w-full border-2 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium ${categoryColors[category]}`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                  >
                    <option value="students">🎓 Students</option>
                    <option value="housewives">🏠 Housewives</option>
                    <option value="professionals">💼 Professionals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Program Structure */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Program Structure
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-200">
                  <label className="block text-xs font-semibold text-blue-900 mb-2 uppercase tracking-wide">Duration</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full border-2 border-blue-300 rounded-lg px-3 py-2 text-lg font-bold text-blue-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                      value={durationWeeks}
                      onChange={(e) => setDurationWeeks(Number(e.target.value))}
                      min={1}
                    />
                    <span className="text-sm font-medium text-blue-700 whitespace-nowrap">weeks</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-200">
                  <label className="block text-xs font-semibold text-green-900 mb-2 uppercase tracking-wide">Frequency</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-lg font-bold text-green-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                      value={workoutsPerWeek}
                      onChange={(e) => setWorkoutsPerWeek(Number(e.target.value))}
                      min={1}
                      max={7}
                    />
                    <span className="text-sm font-medium text-green-700 whitespace-nowrap">days/wk</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-200">
                  <label className="block text-xs font-semibold text-purple-900 mb-2 uppercase tracking-wide">Session</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      className="w-full border-2 border-purple-300 rounded-lg px-3 py-2 text-lg font-bold text-purple-900 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white"
                      value={minutesPerWorkout}
                      onChange={(e) => setMinutesPerWorkout(Number(e.target.value))}
                      min={5}
                    />
                    <span className="text-sm font-medium text-purple-700 whitespace-nowrap">mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                About This Plan
              </h2>
              <textarea
                className="w-full border-2 border-slate-300 rounded-lg px-4 py-3 min-h-[140px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700 leading-relaxed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This plan is designed for people who want to gain muscles as well as do running on a regular basis..."
              />
              <p className="text-xs text-slate-500">Provide a detailed description of the plans goals, target audience, and what participants can expect</p>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}