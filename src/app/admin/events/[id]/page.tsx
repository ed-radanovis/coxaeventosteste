import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import EventForm from "../_components/event-form";

export const metadata: Metadata = generatePageMetadata("Editar Evento");

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventForm eventId={id} />;
}
