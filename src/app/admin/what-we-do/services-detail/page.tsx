import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ServicesDetailManager } from "@/app/admin/what-we-do/_components/services-detail-manager";

export const metadata: Metadata = generatePageMetadata(
  "Gerenciar Serviços em Detalhe",
);

export default function ServicesDetailManagerPage() {
  return <ServicesDetailManager />;
}
