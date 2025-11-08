"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Loading from "./loading";
import { useEffect } from "react";

export default function ClientPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in?redirect_url=/client");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) return <Loading />;

  if (!userId) return <Loading />;

  if (!userId) {
    router.push("/sign-in?redirect_url=/client");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
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
                "text-carrot-500 dark:text-stone-300 dark:hover:text-yellow-400",
              userButtonPopoverActionButtonIcon: "dark:text-stone-400",
            },
          }}
        />
      </div>
      <h1 className="font-charis-sil text-3xl font-bold text-white">
        Área do Cliente
      </h1>
      <p className="font-charis-sil mt-4 text-lg font-normal text-amber-500 italic">
        Bem-vindo! Aqui você verá suas vantagens (cupons, novidades) em breve...
      </p>
    </div>
  );
}
