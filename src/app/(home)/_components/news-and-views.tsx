"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SectionSeparator } from "@/components/ui/section-separator";

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "FORÁGUA 2026: Inovação em Recursos Hídricos e Sustentabilidade",
    author: "Rofer Feiras e Eventos",
    date: "06 e 07 de Maio 2026",
    description:
      "Feira internacional que reuni especialistas em gestão de recursos hídricos. Conceito visual sustentável, coordenação de palestrantes internacionais e a estrutura modular que permiti experiências interativas sobre preservação ambiental e tecnologia hídrica.",
    image: "/images/image_new_views_1.jpg",
    imageAlt: "FORÁGUA 2026 - feira internacional de recursos hídricos",
    href: "https://www.foragua.com.br/",
  },
  {
    id: 2,
    title: "Feira EBS: O Maior Encontro de Gestores de Eventos e Marketing",
    author: "Rofer Feiras e Eventos",
    date: "27 e 28 de Maio 2026",
    description:
      "O principal evento para gestores e profissionais de marketing e eventos realizado no país. Reúne toda a cadeia produtiva deste mercado em um único lugar, proporcionando muito conteúdo, informação, networking qualificado e principalmente negócios.",
    image: "/images/image_new_views_2.jpg",
    imageAlt: "Feira EBS - evento para gestores de marketing e eventos",
    href: "https://feiraebs.com.br/",
  },
  {
    id: 3,
    title: "Festival do Café e da Cachaça: Tradição e Sabor em Serra Negra",
    author: "Prefeitura Serra Negra",
    date: "15 de Agosto 2026",
    description:
      "Um evento que celebra as riquezas da região com degustações de cafés especiais e cachaças artesanais. Infraestrutura, palcos para shows regionais e a experiência imersiva que conecta visitantes à cultura local em meio às montanhas de Serra Negra.",
    image: "/images/image_new_views_3.jpg",
    imageAlt: "Festival do Café e Cachaça em Serra Negra - evento cultural",
    href: "https://www.serranegra.sp.gov.br/eventos/festival-do-cafe-e-da-cachaca",
  },
];

export function NewsAndViews() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tappedCard, setTappedCard] = useState<number | null>(null);
  const [isButtonTapped, setIsButtonTapped] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardTap = (index: number) => {
    setTappedCard(index);
    setTimeout(() => setTappedCard(null), 800);
  };

  const handleButtonTap = () => {
    setIsButtonTapped(true);
    setTimeout(() => setIsButtonTapped(false), 300);
  };

  // prevents click on the card
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section
        id="news-and-views"
        className="relative flex flex-col items-center justify-center overflow-hidden bg-stone-100 px-6 py-20 text-stone-950 md:px-12 md:py-24"
      >
        {/* gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-stone-300/10 to-stone-300/30" />

        <div className="container mx-auto max-w-7xl">
          {/* header */}
          <div className="mb-12 text-center">
            <div className="h-16 bg-stone-300/20 md:h-20" />
          </div>

          {/* grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col overflow-hidden rounded-sm bg-stone-300/10"
              >
                <div className="h-80 bg-stone-300/20" />
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="mb-2 h-6 bg-stone-300/20" />
                    <div className="mb-4 h-4 w-3/4 bg-stone-300/20" />
                    <div className="space-y-2">
                      <div className="h-3 bg-stone-300/20" />
                      <div className="h-3 bg-stone-300/20" />
                      <div className="h-3 w-5/6 bg-stone-300/20" />
                    </div>
                  </div>
                  <div className="mt-6 h-4 w-20 bg-stone-300/20" />
                </div>
              </div>
            ))}
          </div>

          {/* button */}
          <div className="mt-16 flex justify-center">
            <div className="h-12 w-48 bg-stone-300/20" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="news-and-views"
      className={`relative flex flex-col items-center justify-center overflow-hidden px-6 py-20 transition-all duration-700 md:px-12 md:py-24 ${
        !mounted
          ? "bg-stone-100 text-stone-950"
          : theme === "dark"
            ? "bg-stone-900 text-stone-100"
            : "bg-stone-100 text-stone-950"
      }`}
    >
      {/* bg overlay */}

      {/* <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-stone-800/10 to-stone-800/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: false, amount: 0.3 }}
      /> */}
      <div className="container mx-auto mt-4 max-w-7xl">
        {/* header */}
        <motion.h2
          className="mb-12 text-center text-5xl font-bold tracking-tight italic md:text-6xl"
          style={{ fontFamily: "var(--font-charis-sil)" }}
          initial={{ opacity: 0, y: 60, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -60, rotateX: -90 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.2,
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* mobile */}
          <div className="flex flex-col items-center md:inline">
            <span>Destaques</span>
            <span
              className={`my-1 ${
                !mounted
                  ? "text-crusta-500"
                  : theme === "dark"
                    ? "text-carrot-400"
                    : "text-crusta-500"
              } md:mx-10`}
            >
              &
            </span>
            <div className="flex items-center md:inline">
              <span
                className={`${
                  !mounted
                    ? "text-stone-600"
                    : theme === "dark"
                      ? "text-stone-500"
                      : "text-stone-600"
                }`}
              >
                Notícias
              </span>
              <span
                className={`ml-1 ${
                  !mounted
                    ? "text-crusta-500"
                    : theme === "dark"
                      ? "text-carrot-400"
                      : "text-crusta-500"
                }`}
              >
                .
              </span>
            </div>
          </div>
        </motion.h2>

        {/* post grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {posts.map((post, index) => {
            const getAnimationProps = () => {
              switch (index) {
                case 0: // left
                  return {
                    initial: { opacity: 0, x: -100 },
                    exit: { opacity: 0, x: -100 },
                  };
                case 1: // center
                  return {
                    initial: { opacity: 0, y: 100 },
                    exit: { opacity: 0, y: 100 },
                  };
                case 2: // right
                  return {
                    initial: { opacity: 0, x: 100 },
                    exit: { opacity: 0, x: 100 },
                  };
                default:
                  return {
                    initial: { opacity: 0, y: 50 },
                    exit: { opacity: 0, y: 50 },
                  };
              }
            };

            const animationProps = getAnimationProps();

            return (
              <motion.article
                key={post.id}
                className={`group relative flex flex-col overflow-hidden rounded-sm ${
                  !mounted
                    ? "bg-stone-500/50 shadow-lg shadow-stone-950 hover:shadow-xl"
                    : theme === "dark"
                      ? "bg-stone-800/60 shadow-md shadow-stone-600 hover:shadow-lg"
                      : "bg-stone-500/50 shadow-lg shadow-stone-950 hover:shadow-xl"
                } ${tappedCard === index ? "scale-102 shadow-lg" : ""}`}
                {...animationProps}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: {
                    duration: 0.4,
                    ease: "easeInOut",
                  },
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: 0.3 + index * 0.1,
                }}
                viewport={{ once: false, amount: 0.3 }}
                onTouchStart={() => handleCardTap(index)}
              >
                {/* image overlay */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className={`object-cover brightness-90 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110 ${
                      tappedCard === index ? "scale-110 brightness-110" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/30 transition-all duration-500 group-hover:opacity-100 ${
                      tappedCard === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                {/* text */}
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 text-xl leading-tight font-semibold md:text-2xl">
                      <span
                        className={`transition-all duration-500 ${
                          !mounted
                            ? "group-hover:text-crusta-500 text-stone-700"
                            : theme === "dark"
                              ? "group-hover:text-carrot-400 text-stone-400"
                              : "group-hover:text-crusta-500 text-stone-700"
                        } ${
                          tappedCard === index
                            ? theme === "dark"
                              ? "!text-carrot-400"
                              : "!text-crusta-500"
                            : ""
                        }`}
                        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                      >
                        {post.title}
                      </span>
                    </h3>

                    <div
                      className={`mb-4 text-sm ${
                        !mounted
                          ? "text-crusta-500 group-hover:text-stone-600"
                          : theme === "dark"
                            ? "text-carrot-400 group-hover:text-stone-500"
                            : "text-crusta-500 group-hover:text-stone-600"
                      } ${tappedCard === index ? "text-stone-600" : ""}`}
                      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                    >
                      <span>By {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>

                    <p
                      className={`text-justify text-sm leading-relaxed md:text-base ${
                        !mounted
                          ? "text-stone-900"
                          : theme === "dark"
                            ? "text-stone-100"
                            : "text-stone-900"
                      }`}
                      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                    >
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className={`font-medium transition-all duration-300 ${
                        !mounted
                          ? "text-carrot-500 hover:text-carrot-600"
                          : theme === "dark"
                            ? "text-carrot-400 hover:text-cerise-500"
                            : "text-crusta-600 hover:text-cerise-700"
                      } ${
                        tappedCard === index
                          ? theme === "dark"
                            ? "!text-cerise-500"
                            : "!text-cerise-700"
                          : ""
                      }`}
                      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                    >
                      Ler mais ...
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* button */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Button
            asChild
            className={`group relative inline-flex items-center justify-center gap-3 rounded-sm border px-8 py-4 text-lg font-medium transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
              !mounted
                ? "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-950 hover:bg-stone-100"
                : theme === "dark"
                  ? "bg-carrot-600 hover:text-carrot-400 hover:border-carrot-400 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:bg-stone-900 hover:shadow-lg"
                  : "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-800 hover:bg-stone-100 hover:shadow-xl"
            } ${
              isButtonTapped
                ? "scale-105 shadow-lg " +
                  (theme === "dark"
                    ? "border-carrot-400 text-carrot-400 bg-stone-900"
                    : "border-crusta-500 text-crusta-500 bg-stone-100")
                : ""
            }`}
            style={{ fontFamily: "var(--font-charis-sil)" }}
            onTouchStart={handleButtonTap}
          >
            <Link href="/">
              <Newspaper className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
              <span>Veja todos os Destaques & Notícias</span>
            </Link>
          </Button>
        </motion.div>
      </div>
      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator href="/#footer" initialBg="bg-stone-300" />
      </div>
    </section>
  );
}
