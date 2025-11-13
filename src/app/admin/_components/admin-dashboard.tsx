"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Calendar,
  Star,
  Plus,
  MessageSquare,
  Image,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  // retrieve data for the dashboard
  const { data: events, isLoading: eventsLoading } =
    api.admin.getAllEvents.useQuery();
  // add testimonials and other data

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || eventsLoading) return <Loading />;
  if (!userId) return <Loading />;

  // statistics
  const totalEvents = events?.length ?? 0;
  const featuredEvents =
    events?.filter((event) => event.isFeatured).length ?? 0;
  const activeEvents = events?.filter((event) => event.isActive).length ?? 0;

  return (
    <div className="min-h-screen bg-stone-50 p-6 dark:bg-stone-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          Painel Administrativo
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400">
          Gerencie eventos, depoimentos e conteúdo do site
        </p>
      </div>

      {/* cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Eventos"
          value={totalEvents}
          icon={<Calendar className="h-6 w-6" />}
          description="Eventos cadastrados"
        />
        <StatCard
          title="Em Destaque"
          value={featuredEvents}
          icon={<Star className="h-6 w-6" />}
          description="Eventos destacados"
        />
        <StatCard
          title="Ativos"
          value={activeEvents}
          icon={<TrendingUp className="h-6 w-6" />}
          description="Eventos ativos no site"
        />
        <StatCard
          title="Depoimentos"
          value="0" // Futuro
          icon={<MessageSquare className="h-6 w-6" />}
          description="Depoimentos cadastrados"
        />
      </div>

      {/* quick actions */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ActionCard
          title="Gerenciar Eventos"
          description="Crie, edite ou remova eventos"
          icon={<Calendar className="h-8 w-8" />}
          buttonText="Ver Eventos"
          onClick={() => router.push("/admin/events")}
        />
        <ActionCard
          title="Adicionar Evento"
          description="Crie um novo evento"
          icon={<Plus className="h-8 w-8" />}
          buttonText="Criar Evento"
          onClick={() => router.push("/admin/events/new")}
        />
        <ActionCard
          title="Galeria"
          description="Gerencie imagens e vídeos"
          // eslint-disable-next-line jsx-a11y/alt-text
          icon={<Image className="h-8 w-8" />}
          buttonText="Ver Galeria"
          onClick={() => router.push("/admin/gallery")}
        />
      </div>

      {/* recent events */}
      <Card className="border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
            <Calendar className="h-5 w-5" />
            Eventos Recentes
          </CardTitle>
          <CardDescription>
            Últimos eventos cadastrados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events && events.length > 0 ? (
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="dark:hover:bg-stone-750 flex items-center justify-between rounded-lg border border-stone-200 p-4 transition-colors hover:bg-stone-50 dark:border-stone-700"
                >
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {event.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {event.location} •{" "}
                      {new Date(event.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {event.isFeatured && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        <Star className="mr-1 h-3 w-3" />
                        Destaque
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        event.isActive
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {event.isActive ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-stone-500 dark:text-stone-400">
              <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>Nenhum evento cadastrado</p>
              <Button
                onClick={() => router.push("/admin/events/new")}
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Evento
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// card component
function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="border border-stone-200 bg-white transition-shadow hover:shadow-lg dark:border-stone-700 dark:bg-stone-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-stone-600 dark:text-stone-400">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
          {value}
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function ActionCard({
  title,
  description,
  icon,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <Card className="border border-stone-200 bg-white transition-shadow hover:shadow-lg dark:border-stone-700 dark:bg-stone-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
