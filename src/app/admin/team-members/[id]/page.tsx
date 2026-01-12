import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { TeamMemberForm } from "@/app/admin/team-members/_components/team-member-form";

export const metadata: Metadata = generatePageMetadata(
  "Editar Membro da Equipe",
);

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TeamMemberForm teamMemberId={id} />;
}
