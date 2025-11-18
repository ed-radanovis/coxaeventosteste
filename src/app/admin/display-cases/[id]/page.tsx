import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { DisplayCaseForm } from "@/app/admin/display-cases/_components/display-case-form";

export const metadata: Metadata = generatePageMetadata("Editar Display Case");

export default async function EditDisplayCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DisplayCaseForm displayCaseId={id} />;
}
