import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { AdminDashboard } from "./dashboard/admin-dashboard";
import { currentUser } from "@clerk/nextjs/server";
import { AdminAccessGuard } from "@/components/admin-access-guard";

export const metadata: Metadata = generatePageMetadata("Painel Administrativo");

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) {
    return <AdminAccessGuard requireLogin />;
  }

  const publicMetadata = user.publicMetadata as
    | Record<string, unknown>
    | undefined;
  const role = publicMetadata?.role as string | undefined;

  console.log("=== ADMIN VERIFICATION ===");
  console.log("User ID:", user.id);
  console.log("Public Metadata:", user.publicMetadata);
  console.log("Role:", role);
  console.log("========================");

  if (role !== "admin") {
    console.log("🚫 ACCESS DENIED: User is not an admin");
    console.log(`Redirecting ${user.id} for /`);
    console.log("========================");
    return <AdminAccessGuard />;
  }

  console.log("✅ ACCESS GRANTED: User is admin");
  console.log("========================");

  return <AdminDashboard />;
}
