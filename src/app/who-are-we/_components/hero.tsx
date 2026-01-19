"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionSeparator } from "@/components/ui/section-separator";
import { useTheme } from "next-themes";

export function WhoAreHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section className="relative flex min-h-screen items-center justify-start overflow-hidden pt-20 md:pt-16 lg:min-h-[85vh]">
        <div className="absolute inset-0 z-0 h-full w-full bg-stone-300 dark:bg-stone-800" />
        {/* skeleton content */}
        <div className="relative z-10 flex w-full flex-col items-start justify-center px-2 text-left md:px-16 lg:px-28">
          <div className="flex items-start gap-6">
            <div className="shadow-[0_0_10px_rgba(255, 255, 255, 0.1)] bg-persian-500 mt-0 h-48 w-[1.5px] origin-top rounded-full md:mt-24" />
            <div className="md:mt-16">
              <div className="mb-4 h-16 w-64 rounded bg-stone-400/20" />
              <div className="mb-4 h-16 w-56 rounded bg-stone-400/20" />
              <div className="h-12 w-32 rounded bg-stone-400/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-start overflow-hidden pt-20 md:pt-16 lg:min-h-[85vh]">
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="relative aspect-[16/9] h-full w-full">
          {/* overlay */}
          <div
            className={`absolute inset-0 z-[1] transition-colors duration-700 ${
              theme === "dark"
                ? "bg-gradient-to-r from-stone-950/70 via-stone-950/50 to-transparent"
                : "bg-gradient-to-r from-stone-800/70 via-stone-800/50 to-transparent"
            }`}
          />
          {/* background image with fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900" />
          <Image
            src="/images/image_team_grid_0_hero.jpg"
            alt="Coxa Eventos - Quem Somos"
            fill
            className="object-fill object-center"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-start justify-center px-2 text-left md:px-16 lg:px-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-start gap-6"
        >
          {/* sidebar */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="shadow-[0_0_10px_rgba(255, 255, 255, 0.1)] bg-persian-500 mt-0 h-[200px] w-[1.5px] origin-top rounded-full md:mt-20 md:h-[300px]"
          >
            {/* soft pulsating glow */}
            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full rounded-full bg-stone-100"
            />
          </motion.div>

          {/* main text */}
          <div className="md:mt-16">
            {/* main title */}
            <h1 className="text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
              <span
                className="text-crusta-500 block font-[700] italic brightness-150"
                style={{
                  fontFamily: "var(--font-charis-sil)",
                }}
              >
                Quem
              </span>
              <span
                className="text-carrot-500 block font-[700] italic brightness-150"
                style={{
                  fontFamily: "var(--font-charis-sil)",
                }}
              >
                Somos
              </span>
            </h1>

            {/* subtitle */}
            <p
              className="mt-10 max-w-7xl px-0 text-xl font-semibold text-stone-100 md:mt-4 md:text-justify md:text-2xl md:tracking-wider lg:text-3xl"
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              Dedicados em criar experiências
              <br />
              que unem tecnologia, emoção <br />e criatividade em cada evento.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator
          href="/who-are-we/#introduction"
          initialBg="bg-stone-300"
        />
      </div>
    </section>
  );
}
