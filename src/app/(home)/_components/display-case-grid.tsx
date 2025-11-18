"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { X, Youtube, Video, TvMinimalPlay } from "lucide-react";
import { api } from "@/trpc/react";
import { Loading } from "@/components/ui/loading";

type ShowcaseItem = {
  id: string;
  title: string;
  image: string;
  href: string;
  type: string;
  description?: string | null;
};

export function DisplayCaseGrid() {
  const { theme } = useTheme();
  const [tappedCard, setTappedCard] = useState<number | null>(null);
  const [selectedShowcase, setSelectedShowcase] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // get active displaycases from the DB
  const { data: displayCases, isLoading } =
    api.displayCase.getActiveDisplayCases.useQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardTap = (index: number) => {
    setTappedCard(index);
    setTimeout(() => setTappedCard(null), 300);
  };

  // prevents click on the card
  const handleTitleClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedShowcase(index);
  };

  const closeModal = () => {
    setSelectedShowcase(null);
  };

  const getConvertedType = (type: string): "video" | "youtube" => {
    return type.toLowerCase() as "video" | "youtube";
  };

  const renderModalContent = (showcase: ShowcaseItem) => {
    const convertedType = getConvertedType(showcase.type);

    switch (convertedType) {
      case "youtube":
        return (
          <iframe
            src={showcase.href}
            title={`YouTube - ${showcase.title}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      case "video":
        return (
          <video
            controls
            autoPlay
            muted
            className="h-full w-full bg-stone-950 object-contain"
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            <source src={showcase.href} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        );

      default:
        return (
          <div
            className="flex h-full items-center justify-center bg-stone-800"
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            <p className="text-stone-400">Conteúdo não disponível</p>
          </div>
        );
    }
  };

  const getOriginalLinkIcon = (type: string) => {
    const convertedType = getConvertedType(type);
    switch (convertedType) {
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <Video className="h-4 w-4" />;
    }
  };

  const getOriginalLinkText = (type: string) => {
    const convertedType = getConvertedType(type);
    switch (convertedType) {
      case "youtube":
        return "Assistir no YouTube";
      case "video":
        return "Abrir vídeo original";
      default:
        return "Ver original";
    }
  };

  const currentShowcase =
    selectedShowcase !== null && displayCases
      ? displayCases[selectedShowcase]
      : null;

  const currentTheme = mounted ? theme : "dark";

  // loading / empty states
  if (isLoading) {
    return (
      <section className="flex h-96 items-center justify-center bg-stone-900 dark:bg-stone-100">
        <Loading />
      </section>
    );
  }

  if (!displayCases || displayCases.length === 0) {
    return (
      <section
        className="dark:bg-carrot-800/80 flex h-96 items-center justify-center bg-stone-500"
        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
      >
        <div className="text-stone-100 dark:text-stone-400">
          Nenhuma Vitrine disponível no momento
        </div>
      </section>
    );
  }

  return (
    <>
      {/* video modal */}
      <AnimatePresence>
        {selectedShowcase !== null && currentShowcase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative mx-4 w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* close button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 z-10 rounded-full bg-stone-100/10 p-2 text-stone-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-stone-100/20"
              >
                <X className="h-6 w-6" />
              </button>

              {/* content container */}
              <div className="relative w-full overflow-hidden rounded-lg bg-stone-950">
                {/* header */}
                <div className="border-b border-stone-700 bg-stone-800/50 p-4">
                  <h3
                    className="text-carrot-500 text-lg font-semibold"
                    style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                  >
                    {currentShowcase.title}
                  </h3>
                </div>

                {/* content */}
                <div className="aspect-video w-full bg-black">
                  {renderModalContent(currentShowcase)}
                </div>

                {/* footer with external link */}
                <div className="border-t border-stone-700 bg-stone-800/50 p-4">
                  <Link
                    href={
                      getConvertedType(currentShowcase.type) === "youtube"
                        ? currentShowcase.href
                            .replace("embed/", "watch?v=")
                            .replace("?autoplay=1", "")
                        : currentShowcase.href
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-carrot-400 inline-flex items-center gap-2 text-sm text-stone-300 transition-colors"
                  >
                    {getOriginalLinkIcon(currentShowcase.type)}
                    {getOriginalLinkText(currentShowcase.type)}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="display-case-grid"
        className={`relative flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-in-out ${
          currentTheme === "dark" ? "bg-stone-900" : "bg-stone-100"
        }`}
      >
        {/* image grid */}
        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-4 md:gap-1.5 md:px-1.5">
          {displayCases.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              className="group relative block h-full w-full overflow-hidden"
              onTouchStart={() => handleCardTap(index)}
            >
              {/* image */}
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={600}
                className={`h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${
                  tappedCard === index ? "scale-110" : ""
                }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-stone-950/80 transition-all duration-500 ease-in-out group-hover:opacity-100 ${
                  tappedCard === index ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* content */}
              <div
                className={`absolute inset-0 flex flex-col items-start justify-end p-6 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 md:opacity-60 ${
                  tappedCard === index
                    ? "scale-105 opacity-100"
                    : "opacity-100 md:opacity-60"
                }`}
              >
                {/* button */}
                <button
                  onClick={(e) => handleTitleClick(index, e)}
                  onTouchStart={() => handleCardTap(index)}
                  className="text-carrot-400 hover:text-persian-800 flex items-center gap-2 text-4xl font-semibold italic transition-all duration-500 ease-in-out hover:scale-95"
                >
                  <TvMinimalPlay className="h-7 w-7" /> Ver vitrine
                </button>

                {/* title */}
                <button
                  onClick={(e) => handleTitleClick(index, e)}
                  className="text-left text-lg text-stone-100 transition-all duration-500 ease-in-out hover:scale-98"
                  style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                >
                  {item.title}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
