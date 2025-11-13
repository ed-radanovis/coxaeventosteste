import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import EventForm from "../_components/event-form";

type Props = {
  params: { id: string };
};

export const metadata: Metadata = generatePageMetadata("Editar Evento");

export default function EditEventPage({ params }: Props) {
  return <EventForm eventId={params.id} />;
}
