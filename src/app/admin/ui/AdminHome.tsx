"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { Category } from "@/types/plans";

export default function AdminHome() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-neutral-900">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-neutral-600 hidden sm:block">Manage fitness programs</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-black hover:bg-neutral-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Plan</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Stats */}
        <StatsOverview />

        {/* Create Form */}
        {showCreateForm && (
          <div className="mb-4 sm:mb-6">
            <CreatePlanForm onClose={() => setShowCreateForm(false)} />
          </div>
        )}

        {/* Plans */}
        <section className="mt-4 sm:mt-6">
          <PlansTable />
        </section>
      </div>
    </div>
  );
}

function StatsOverview() {
  const rows = useQuery(api.admin.listPlans, { status: "all" }) ?? [];
  
  const published = rows.filter(p => p.published).length;
  const drafts = rows.filter(p => !p.published).length;
  const totalWeeks = rows.reduce((sum, p) => sum + (p.durationWeeks || 0), 0);

  const stats = [
    { label: "Total Plans", value: rows.length, color: "text-neutral-900", bg: "bg-neutral-100" },
    { label: "Published", value: published, color: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Drafts", value: drafts, color: "text-amber-700", bg: "bg-amber-50" },
    { label: "Total Weeks", value: totalWeeks, color: "text-sky-700", bg: "bg-sky-50" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3 ${stat.color}`}>
            {idx === 0 && <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            {idx === 1 && <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            {idx === 2 && <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
            {idx === 3 && <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          </div>
          <div className={`text-2xl sm:text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function CreatePlanForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const mutate = useMutation(api.admin.createPlan);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("students");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const res = await mutate({ title, category });
      router.push(`/admin/plans/${res.planId}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-black rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-900">Create New Plan</h2>
            <p className="text-xs sm:text-sm text-neutral-600 hidden sm:block">Start a new fitness program</p>
          </div>
        </div>
        <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 p-1">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Plan Title</label>
          <input
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            placeholder="e.g., Muscle Gain Beginner"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
          <select
            className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm sm:text-base font-medium focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            <option value="students">🎓 Students</option>
            <option value="housewives">🏠 Housewives</option>
            <option value="professionals">💼 Professionals</option>
          </select>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <p className="text-xs text-neutral-500 bg-neutral-50 rounded px-3 py-2 border border-neutral-200">
          <span className="font-medium">Defaults:</span> 4 weeks • 4 days/wk • 30 min • Draft
        </p>
        <button
          onClick={handleSubmit}
          disabled={submitting || !title.trim()}
          className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {submitting ? "Creating..." : "Create Plan"}
        </button>
      </div>
    </div>
  );
}

function PlansTable() {
  const rows = useQuery(api.admin.listPlans, { status: "all" }) ?? [];
  const setPublished = useMutation(api.admin.setPublished);

  if (!rows) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8 sm:p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mb-3"></div>
        <p className="text-sm text-neutral-600">Loading plans...</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl border-2 border-dashed border-neutral-300 p-8 sm:p-12 text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-1">No Plans Yet</h3>
        <p className="text-sm text-neutral-600">Create your first plan to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-200 bg-neutral-50">
        <h2 className="text-base sm:text-lg font-semibold text-neutral-900 flex items-center gap-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          All Plans
          <span className="text-xs sm:text-sm font-normal text-neutral-500">({rows.length})</span>
        </h2>
      </div>

      {/* Mobile Cards */}
      <div className="block sm:hidden divide-y divide-neutral-200">
        {rows.map((p) => (
          <div key={p._id} className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 mb-1 text-sm">{p.title}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  p.category === "students" ? "bg-sky-100 text-sky-700" :
                  p.category === "housewives" ? "bg-rose-100 text-rose-700" :
                  "bg-indigo-100 text-indigo-700"
                }`}>
                  {p.category}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                p.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                {p.published ? "Published" : "Draft"}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-neutral-50 rounded-lg px-2 py-1.5">
                <div className="text-neutral-500 mb-0.5">Duration</div>
                <div className="font-semibold text-neutral-900">{p.durationWeeks}w</div>
              </div>
              <div className="bg-neutral-50 rounded-lg px-2 py-1.5">
                <div className="text-neutral-500 mb-0.5">Frequency</div>
                <div className="font-semibold text-neutral-900">{p.workoutsPerWeek}x/wk</div>
              </div>
              <div className="bg-neutral-50 rounded-lg px-2 py-1.5">
                <div className="text-neutral-500 mb-0.5">Session</div>
                <div className="font-semibold text-neutral-900">{p.minutesPerWorkout}m</div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={`/admin/plans/${p._id}`}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-3 py-2 rounded-lg text-xs font-medium text-center transition-all"
              >
                Edit
              </a>
              <button
                onClick={() => setPublished({ planId: p._id as Id<"plans">, published: !p.published })}
                className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  p.published
                    ? "bg-amber-100 hover:bg-amber-200 text-amber-700"
                    : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                }`}
              >
                {p.published ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-600 uppercase">Category</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase">Duration</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase">Frequency</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase">Session</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-neutral-600 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {rows.map((p) => (
              <tr key={p._id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-semibold text-sm text-neutral-900">{p.title}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                    p.category === "students" ? "bg-sky-100 text-sky-700" :
                    p.category === "housewives" ? "bg-rose-100 text-rose-700" :
                    "bg-indigo-100 text-indigo-700"
                  }`}>
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm text-neutral-900">{p.durationWeeks} weeks</td>
                <td className="px-4 py-3 text-center text-sm text-neutral-900">{p.workoutsPerWeek}x/week</td>
                <td className="px-4 py-3 text-center text-sm text-neutral-900">{p.minutesPerWorkout} min</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    p.published ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/admin/plans/${p._id}`}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-medium transition-all"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => setPublished({ planId: p._id as Id<"plans">, published: !p.published })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        p.published
                          ? "bg-amber-100 hover:bg-amber-200 text-amber-700"
                          : "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                      }`}
                    >
                      {p.published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}