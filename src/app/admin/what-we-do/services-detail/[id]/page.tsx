import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ServicesDetailForm } from "@/app/admin/what-we-do/_components/services-detail-form";

export const metadata: Metadata = generatePageMetadata(
  "Editar Nossas Especialidades",
);

export default async function EditServicesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ServicesDetailForm serviceDetailId={id} />;
}
