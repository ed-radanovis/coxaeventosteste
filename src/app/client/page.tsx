"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function ClientPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return <div>Carregando...</div>;
  }

  if (!userId) {
    router.push("/sign-in?redirect_url=/client");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {/* Header com UserButton */}
      <div className="absolute top-8 right-8">
        <UserButton afterSignOutUrl="/" />
      </div>
      <h1 className="font-charis-sil text-3xl font-bold text-white">
        Área do Cliente
      </h1>
      <p className="font-charis-sil mt-4 text-lg font-normal text-yellow-300 italic">
        Bem-vindo! Aqui você verá suas vantagens (cupons, novidades) em breve...
      </p>
    </div>
  );
}
