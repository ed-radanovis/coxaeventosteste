import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { DisplayCaseForm } from "@/app/admin/display-cases/_components/display-case-form";

export const metadata: Metadata = generatePageMetadata("Novo Display Case");

export default function NewDisplayCasePage() {
  return <DisplayCaseForm />;
}
