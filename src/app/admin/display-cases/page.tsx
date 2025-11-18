import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { DisplayCaseManager } from "@/app/admin/display-cases/_components/display-case-manager";

export const metadata: Metadata = generatePageMetadata(
  "Gerenciar Display Cases",
);

export default function DisplayCasesPage() {
  return <DisplayCaseManager />;
}
