import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { TeamMemberManager } from "@/app/admin/team-members/_components/team-member-manager";

export const metadata: Metadata = generatePageMetadata("Gerenciar Equipe");

export default function TeamMembersPage() {
  return <TeamMemberManager />;
}
