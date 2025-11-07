"use client";

import { api } from "@/trpc/react";
import Loading from "./loading";
import { useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminTestPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  // 🧪 TESTE 1: Listar eventos
  const { data: events, isLoading } = api.admin.getAllEvents.useQuery();

  // 🧪 TESTE 2: Criar evento
  const createMutation = api.admin.createEvent.useMutation({
    onSuccess: () => {
      console.log("Evento criado!");
      // Recarregar a lista
      window.location.reload();
    },
  });

  // ✅ CORRIGIDO: Redirecionamento seguro com useEffect
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in?redirect_url=/admin/test"); // ✅ CORRIGIDO: redirect para /admin/test
    }
  }, [isLoaded, userId, router]);

  const handleCreateTest = () => {
    createMutation.mutate({
      title: "Evento Teste " + Date.now(),
      description: "Descrição do evento teste",
      date: new Date(),
      location: "São Paulo, SP",
      image: "/images/image_services_grid_1.jpg",
      price: 0,
      isFeatured: true,
      isActive: true,
    });
  };
  if (!isLoaded || isLoading) return <Loading />;

  if (!userId) return <Loading />;

  return (
    <div className="p-8">
      {/* Header com UserButton */}
      <div className="absolute top-8 right-8">
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
      <h1 className="text-2xl font-bold">🧪 Teste Admin Router</h1>

      {/* 🧪 BOTÃO CRIAR EVENTO */}
      <button
        onClick={handleCreateTest}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? "Criando..." : "Criar Evento Teste"}
      </button>

      {/* 🧪 LISTA DE EVENTOS */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Eventos ({events?.length})</h2>
        {events?.map((event) => (
          <div key={event.id} className="mt-2 border p-4">
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>Local: {event.location}</p>
            <p>Data: {event.date.toLocaleString()}</p>
            <p>Destaque: {event.isFeatured ? "✅" : "❌"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
