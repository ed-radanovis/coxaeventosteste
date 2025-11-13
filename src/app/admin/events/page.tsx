import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import EventsManager from "./_components/events-manager";

export const metadata: Metadata = generatePageMetadata("Gerenciar Eventos");

export default function EventsPage() {
  return <EventsManager />;
}
