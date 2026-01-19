import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ProcessForm } from "@/app/admin/what-we-do/_components/process-form";

export const metadata: Metadata = generatePageMetadata("Editar Processo");

export default async function EditProcessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProcessForm processStepId={id} />;
}
