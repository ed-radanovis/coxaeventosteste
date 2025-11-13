import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import EventForm from "../_components/event-form";

export const metadata: Metadata = generatePageMetadata("Novo Evento");

export default function NewEventPage() {
  return <EventForm />;
}
