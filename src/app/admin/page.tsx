// src/app/admin/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import AdminHome from "./ui/AdminHome";

export default async function AdminPage() {
  const { userId, getToken } = await auth();
  if (!userId) redirect("/sign-in");

  const token = await getToken({ template: "convex" });
  const me = await fetchQuery(api.users.me, {}, { token: token ?? undefined });
  if (!me || me.role !== "admin") redirect("/");

  return <AdminHome />;
}
