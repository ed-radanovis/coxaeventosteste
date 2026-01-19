import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ServicesDetailForm } from "@/app/admin/what-we-do/_components/services-detail-form";

export const metadata: Metadata = generatePageMetadata("Nova Especialidade");

export default function NewServicesDetailPage() {
  return <ServicesDetailForm />;
}
