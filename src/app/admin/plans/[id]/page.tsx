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
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Plan</h1>

      {/* Interactive tabs */}
      <ClientTabs planId={id} initialOutline={outline} />
    </main>
  );
}
