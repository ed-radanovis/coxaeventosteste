"use client";

import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Loading } from "@/components/ui/loading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackToFooterButton } from "./back-to-footer-button";
import {
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  Newspaper,
  Users,
} from "lucide-react";

export function AdminDashboard() {
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
      title: "Eventos",
      description: "Gerencie eventos futuros",
      icon: <Calendar className="h-8 w-8" />,
      path: "/admin/events",
    },
    {
      title: "Vitrines",
      description: "Gerencie vitrines criadas",
      icon: <ImageIcon className="h-8 w-8" />,
      path: "/admin/display-cases",
    },
    {
      title: "Depoimentos",
      description: "Gerencie depoimentos",
      icon: <MessageSquare className="h-8 w-8" />,
      path: "/admin/testimonials",
    },
    {
      title: "Notícias",
      description: "Gerencie conteúdos em destaque",
      icon: <Newspaper className="h-8 w-8" />,
      path: "/admin/news",
    },
    {
      title: "Clientes",
      description: "Gerencie portfólio",
      icon: <Users className="h-8 w-8" />,
      path: "/admin/clients",
    },
    {
      title: "??? a Definir",
      description: "Gerencie ????",
      icon: <Users className="h-8 w-8" />,
      path: "/admin/clients",
    },
  ];

  return (
    <div
      className="min-h-screen bg-stone-300 p-6 dark:bg-stone-900"
      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div>
            <h1 className="flex justify-center text-3xl font-bold text-stone-900 md:justify-start dark:text-stone-100">
              Painel Administrativo
            </h1>
            <p className="my-3 flex justify-center text-sm text-stone-600 md:justify-start dark:text-stone-400">
              Selecione uma área para gerenciar
            </p>
          </div>

          <div
            onTouchStart={() => handleTap("user-button")}
            className={`mt-2 flex w-fit justify-center rounded-sm border px-2 py-1 transition-all duration-200 ease-in-out ${
              tappedElement === "user-button"
                ? "scale-95 border-stone-400"
                : theme === "dark"
                  ? "hover:border-persian-500 border-stone-600 bg-stone-800 hover:scale-102"
                  : "hover:border-crusta-500 border-stone-400 bg-stone-200 hover:scale-102"
            }`}
          >
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
        </div>
      </div>

      <div className="my-6">
        <BackToFooterButton />
      </div>

      {/* navigation grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            Bem-vindo ao painel administrativo. Selecione uma das áreas acima e
            faça a gestão.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
