"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

const categories = ["students", "housewives", "professionals"] as const;
type Category = (typeof categories)[number];

export default function AdminHome() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Admin</h1>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold mb-3">Create plan</h2>
        <CreatePlanForm />
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-semibold mb-3">Plans</h2>
        <PlansTable />
      </section>
    </main>
  );
}

function CreatePlanForm() {
  const router = useRouter();
  const mutate = useMutation(api.admin.createPlan);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("students");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-xl">
      <input
        className="rounded border px-3 py-2"
        placeholder="Plan title (e.g., Muscle Gain Beginner)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select className="rounded border px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
        <option value="students">Students</option>
        <option value="housewives">Housewives</option>
        <option value="professionals">Professionals</option>
      </select>
      <button
        type="submit"
        disabled={submitting}
        className="w-fit rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create"}
      </button>
      <p className="text-xs text-neutral-500">Defaults: 4 weeks • 4 workouts/week • 30 mins • published = false</p>
    </form>
  );
}

function PlansTable() {
  const rows = useQuery(api.admin.listPlans, { status: "all" }) ?? [];
  const setPublished = useMutation(api.admin.setPublished);

  if (!rows) return <div className="text-sm text-neutral-500">Loading…</div>;
  if (rows.length === 0) return <div className="text-sm text-neutral-600">No plans yet.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b bg-neutral-50">
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Weeks</th>
            <th className="px-3 py-2">/wk</th>
            <th className="px-3 py-2">mins</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="px-3 py-2 font-medium">{p.title}</td>
              <td className="px-3 py-2">{p.category}</td>
              <td className="px-3 py-2">{p.durationWeeks}</td>
              <td className="px-3 py-2">{p.workoutsPerWeek}</td>
              <td className="px-3 py-2">{p.minutesPerWorkout}</td>
              <td className="px-3 py-2">{p.published ? "Published" : "Draft"}</td>
              <td className="px-3 py-2 space-x-2">
                <a className="underline" href={`/admin/plans/${p._id}`}>Edit</a>
                <button
                  onClick={() => setPublished({ planId: p._id as Id<"plans">, published: !p.published })}
                  className="rounded border px-2 py-1"
                >
                  {p.published ? "Unpublish" : "Publish"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
