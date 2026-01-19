import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ProcessManager } from "@/app/admin/what-we-do/_components/process-manager";

export const metadata: Metadata = generatePageMetadata("Gerenciar Processos");

export default function ProcessManagerPage() {
  return <ProcessManager />;
}
