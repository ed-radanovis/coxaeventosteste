"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SectionSeparator } from "@/components/ui/section-separator";

interface HeroVideo {
  src: string;
  position: string;
}

export function WhatWeDoHero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState<number>(0);

  const videos: HeroVideo[] = [
    {
      src: "/videos/hero_what_we_do/video_hero_1.mp4",
      position: "object-center",
    },
    {
      src: "/videos/hero_what_we_do/video_hero_2.mp4",
      position: "object-center",
    },
    {
      src: "/videos/hero_what_we_do/video_hero_3.mp4",
      position: "object-center",
    },
    {
      src: "/videos/hero_what_we_do/video_hero_4.mp4",
      position: "object-center",
    },
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 13000);
    return () => clearInterval(interval);
  }, [videos.length]);

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
              <div className="mb-4 h-16 w-32 rounded bg-stone-400/20" />
              <div className="mb-4 h-16 w-40 rounded bg-stone-400/20" />
              <div className="h-12 w-48 rounded bg-stone-400/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-start overflow-hidden pt-20 md:pt-16 lg:min-h-[85vh]">
      {/* background videos */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="relative aspect-[16/9] h-full w-full">
          {/* overlay */}
          <div
            className={`absolute inset-0 z-[1] transition-colors duration-700 ${
              theme === "dark"
                ? "bg-gradient-to-r from-stone-950/70 via-stone-950/35 to-transparent"
                : "bg-gradient-to-r from-stone-800/70 via-stone-800/35 to-transparent"
            }`}
          />
          {/* video fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900" />
          <AnimatePresence mode="wait">
            {videos[index] && (
              <motion.video
                key={videos[index].src}
                autoPlay
                loop
                muted
                playsInline
                className={`absolute inset-0 h-full w-full object-cover ${videos[index].position}`}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <source src={videos[index].src} type="video/mp4" />
              </motion.video>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-start justify-center px-2 text-left md:px-16 lg:px-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex items-start gap-6"
          >
            {/* sidebar */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="shadow-[0_0_10px_rgba(255, 255, 255, 0.1)] bg-persian-500 mt-0 h-[200px] w-[1.5px] origin-top rounded-full md:mt-10 md:h-[300px] lg:mt-14"
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
                  className="text-crusta-500 block font-[700] italic brightness-200"
                  style={{
                    fontFamily: "var(--font-charis-sil)",
                  }}
                >
                  O QUE
                </span>
                <span
                  className="text-crusta-500 block font-[700] italic brightness-150"
                  style={{
                    fontFamily: "var(--font-charis-sil)",
                  }}
                >
                  FAZEMOS
                </span>
                <span
                  className="text-cerise-500 text:lg mt-6 block font-[600] brightness-150 md:text-5xl"
                  style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                >
                  E COMO FAZEMOS
                </span>
              </h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator
          href="#process"
          initialBg="bg-stone-300"
          className="bg-stone-300/20"
        />
      </div>
    </section>
  );
}
