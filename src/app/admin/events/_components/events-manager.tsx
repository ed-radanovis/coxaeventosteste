"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Loading } from "@/components/ui/loading";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Calendar,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BackToFooterButton } from "./back-to-footer-button";

export default function EventsManager() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  // search all events
  const {
    data: events,
    isLoading,
    refetch,
  } = api.admin.getAllEvents.useQuery();

  // mutations for operations
  const deleteMutation = api.admin.deleteEvent.useMutation({
    onSuccess: () => refetch(),
  });

  const toggleFeaturedMutation = api.admin.updateEvent.useMutation({
    onSuccess: () => refetch(),
  });

  const toggleActiveMutation = api.admin.toggleEvent.useMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events?.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // handlers
  const handleDeleteEvent = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleToggleFeatured = (id: string, currentFeatured: boolean) => {
    toggleFeaturedMutation.mutate({
      id,
      isFeatured: !currentFeatured,
    });
  };

  const handleToggleActive = (id: string, currentActive: boolean) => {
    toggleActiveMutation.mutate({
      id,
      isActive: !currentActive,
    });
  };

  if (!isLoaded || isLoading) return <Loading />;
  if (!userId) return <Loading />;

  return (
    <div
      className="min-h-screen bg-stone-50 p-6 dark:bg-stone-900"
      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
    >
      {/* header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="flex justify-center text-3xl font-bold text-stone-900 md:justify-start dark:text-stone-100">
              Gerenciar Eventos
            </h1>
            <p className="mt-2 flex justify-center text-sm text-stone-600 md:justify-start dark:text-stone-400">
              Crie, edite e gerencie todos os eventos do site
            </p>
          </div>
          <div className="mt-2 flex w-fit justify-center rounded-sm border px-2 py-1 md:mr-40">
            <UserButton
              showName
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7 md:w-10 md:h-10",
                  userButtonBox:
                    "flex flex-col-reverse items-center text-muted-foreground",
                  userButtonOuterIdentifier: "text-xm md:text-base",
                  userButtonPopoverActionButton:
                    "dark:text-stone-300 dark:hover:text-yellow-400",
                  userButtonPopoverActionButtonIcon: "dark:text-stone-400",
                },
              }}
            />
          </div>

          <Button
            onClick={() => router.push("/admin/events/new")}
            className="mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Evento
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <BackToFooterButton />
      </div>

      {/* search bar and statistics */}
      <Card className="mb-6 border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-stone-400" />
                <Input
                  placeholder="Buscar eventos por título, local ou descrição..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border-stone-200 bg-stone-50 pl-10 dark:border-stone-600 dark:bg-stone-700"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
              <span>Total: {events?.length ?? 0}</span>
              <span>
                Ativos: {events?.filter((e) => e.isActive).length ?? 0}
              </span>
              <span>
                Destaques: {events?.filter((e) => e.isFeatured).length ?? 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* list of events */}
      <div className="space-y-4">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="border border-stone-200 bg-white transition-shadow hover:shadow-lg dark:border-stone-700 dark:bg-stone-800"
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  {/* information */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">
                          {event.title}
                        </h3>
                        <p className="mb-2 text-sm text-stone-600 dark:text-stone-400">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString("pt-BR")}
                          </span>
                          <span>📍 {event.location}</span>
                          {event.price && event.price > 0 ? (
                            <span>💰 R$ {event.price.toFixed(2)}</span>
                          ) : (
                            <span>💰 Gratuito</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* status / actions */}
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    {/* badges */}
                    <div className="flex flex-wrap gap-2">
                      {event.isFeatured && (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        >
                          <Star className="mr-1 h-3 w-3" />
                          Destaque
                        </Badge>
                      )}
                      <Badge variant={event.isActive ? "default" : "secondary"}>
                        {event.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleToggleFeatured(event.id, event.isFeatured)
                        }
                        disabled={toggleFeaturedMutation.isPending}
                      >
                        <Star
                          className={`h-4 w-4 ${event.isFeatured ? "fill-yellow-500 text-yellow-500" : ""}`}
                        />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleToggleActive(event.id, event.isActive)
                        }
                        disabled={toggleActiveMutation.isPending}
                      >
                        {event.isActive ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/events/${event.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        disabled={deleteMutation.isPending}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800">
            <CardContent className="p-12 text-center">
              <Calendar className="mx-auto mb-4 h-16 w-16 text-stone-400" />
              <h3 className="mb-2 text-lg font-semibold text-stone-900 dark:text-stone-100">
                Nenhum evento encontrado
              </h3>
              <p className="mb-6 text-stone-600 dark:text-stone-400">
                {searchTerm
                  ? "Tente ajustar os termos da busca."
                  : "Comece criando seu primeiro evento."}
              </p>
              <Button onClick={() => router.push("/admin/events/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Evento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
