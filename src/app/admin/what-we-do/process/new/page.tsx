import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ProcessForm } from "@/app/admin/what-we-do/_components/process-form";

export const metadata: Metadata = generatePageMetadata("Novo Processo");

export default function NewProcessPage() {
  return <ProcessForm />;
}
