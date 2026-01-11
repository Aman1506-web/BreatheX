import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import ClientTabs from "./_components/ClientTabs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Outline } from "@/types/plans";

export default async function AdminPlanEditor({
  params,
}: {
  params: Promise<{ id: Id<"plans"> }>;
}) {
  const { userId, getToken } = await auth();
  if (!userId) redirect("/sign-in");
  const { id } = await params;

  const token = await getToken({ template: "convex" });
  const outline: Outline | null = await fetchQuery(
    api.admin.getPlanOutline,
    { planId: id },
    { token: token ?? undefined }
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a href="/admin" className="text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </a>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-neutral-900">Edit Plan</h1>
                <p className="text-xs sm:text-sm text-neutral-600 hidden sm:block">Configure plan details and structure</p>
              </div>
            </div>
            <button className="bg-black hover:bg-neutral-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium transition-all text-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <ClientTabs planId={id} initialOutline={outline} />
      </main>
    </div>
  );
}