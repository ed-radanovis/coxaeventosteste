import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { TeamMemberForm } from "@/app/admin/team-members/_components/team-member-form";

export const metadata: Metadata = generatePageMetadata("Novo Membro da Equipe");

export default function NewTeamMemberPage() {
  return <TeamMemberForm />;
}
