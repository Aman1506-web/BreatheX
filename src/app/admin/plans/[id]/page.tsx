import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import OutlineEditor from "./_components/OutlineEditor";
import DayEditor from "./_components/DayEditor";

// Tabs ko hum client-side pe interactive banayenge
import ClientTabs from "./_components/ClientTabs";

export default async function AdminPlanEditor({ params }: { params: Promise<{ id: string }> }) {
  const { userId, getToken } = await auth();
  if (!userId) redirect("/sign-in");
  const { id } = await params;

  const token = await getToken({ template: "convex" });
  const outline = await fetchQuery(
    api.admin.getPlanOutline,
    { planId: id as any },
    { token: token ?? undefined }
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Plan</h1>

      {/* Interactive tabs */}
      <ClientTabs planId={id} initialOutline={outline} />
    </main>
  );
}
