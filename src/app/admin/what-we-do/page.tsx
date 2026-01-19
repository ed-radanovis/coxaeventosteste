"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Loading } from "@/components/ui/loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Workflow, Wrench } from "lucide-react";

export default function WhatWeDoPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tappedElement, setTappedElement] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTap = (elementId: string) => {
    setTappedElement(elementId);
    setTimeout(() => setTappedElement(null), 300);
  };

  if (!mounted) return <Loading />;

  const navigationItems = [
    {
      title: "Processo Criativo",
      description: "Gerencie as etapas do Processo Criativo",
      icon: <Workflow className="h-8 w-8" />,
      path: "/admin/what-we-do/process",
    },
    {
      title: "Nossas Especialidades",
      description: "Gerencie os detalhes de Nossas Especialidades",
      icon: <Wrench className="h-8 w-8" />,
      path: "/admin/what-we-do/services-detail",
    },
  ];

  return (
    <div
      className="min-h-screen bg-stone-300 p-6 dark:bg-stone-900"
      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
    >
      {/* header */}
      <div className="mb-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div>
            <h1 className="flex justify-center text-3xl font-bold text-stone-900 md:justify-start dark:text-stone-100">
              Gerenciar - O Que Fazemos
            </h1>
            <p className="my-3 flex justify-center text-sm text-stone-600 md:justify-start dark:text-stone-400">
              Selecione uma área para gerenciar
            </p>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Settings className="h-6 w-6 text-stone-600 dark:text-stone-400" />
            <span className="text-sm text-stone-600 dark:text-stone-400">
              O Que Fazemos
            </span>
          </div>
        </div>
      </div>

      <div className="my-6">
        <Button
          size="sm"
          onClick={() => {
            handleTap("back-button");
            router.push("/admin");
          }}
          onTouchStart={() => handleTap("back-button")}
          className={`flex items-center gap-2 border transition-all duration-300 ease-in-out ${
            tappedElement === "back-button"
              ? "scale-98"
              : theme === "dark"
                ? "bg-stone-600/60 text-stone-400 hover:scale-102 hover:bg-stone-600"
                : "border-stone-400 bg-stone-100/80 text-stone-500 hover:scale-102 hover:bg-stone-100"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Button>
      </div>

      {/* navigation grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {navigationItems.map((item, index) => (
          <Card
            key={item.title}
            className={`cursor-pointer border border-stone-200 bg-stone-100 transition-all duration-300 ease-in-out hover:shadow-lg dark:border-stone-700 dark:bg-stone-800 ${
              tappedElement === `nav-${index}` ? "scale-95" : "hover:scale-102"
            }`}
            onClick={() => router.push(item.path)}
            onTouchStart={() => handleTap(`nav-${index}`)}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-lg p-3 ${
                    theme === "dark"
                      ? "bg-stone-700 text-stone-300"
                      : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      theme === "dark" ? "text-stone-100" : "text-stone-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-stone-400" : "text-stone-600"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className={`mt-4 w-full transition-all duration-200 ease-in-out ${
                  tappedElement === `btn-${index}`
                    ? "scale-95"
                    : "hover:scale-102"
                } ${
                  theme === "dark"
                    ? "text-stone-300 hover:bg-stone-700/50 hover:text-stone-100"
                    : "text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
                }`}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  handleTap(`btn-${index}`);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(item.path);
                }}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border border-stone-200 bg-stone-200/50 dark:border-stone-700 dark:bg-stone-800/30">
        <CardContent className="p-6 text-center">
          <p
            className={`text-sm ${
              theme === "dark" ? "text-stone-400" : "text-stone-600"
            }`}
          >
            Gerencie os conteúdos da página O Que Fazemos - Processo Criativo e
            Nossas Especialidades.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
