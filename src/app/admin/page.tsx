import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { AdminDashboard } from "./dashboard/admin-dashboard";

export const metadata: Metadata = generatePageMetadata("Painel Administrativo");

export default function AdminPage() {
  return <AdminDashboard />;
}
