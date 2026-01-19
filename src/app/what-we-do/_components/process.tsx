"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect, type JSX } from "react";
import { SectionSeparator } from "@/components/ui/section-separator";
import { api } from "@/trpc/react";
import {
  Search,
  Lightbulb,
  Palette,
  Zap,
  CheckCircle,
  Target,
} from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
  Search: <Search className="h-6 w-6" />,
  Lightbulb: <Lightbulb className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  CheckCircle: <CheckCircle className="h-6 w-6" />,
  Target: <Target className="h-6 w-6" />,
};

export function Process() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // state for taps
  const [tappedCard, setTappedCard] = useState<number | null>(null);

  // get active process from the DB
  const { data: processSteps, isLoading } =
    api.process.getActiveProcessSteps.useQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  // function for taps
  const handleCardTap = (index: number) => {
    setTappedCard(index);
    setTimeout(() => setTappedCard(null), 1500);
  };

  if (!mounted || isLoading) {
    return (
      <section
        id="process"
        className="relative bg-stone-100 py-24 dark:bg-stone-900"
      >
        <div className="container mx-auto px-6">
          {/* skeleton content */}
          <div className="mb-16 h-12 w-64 bg-stone-300/20 dark:bg-stone-700/20" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-10 w-10 rounded-full bg-stone-300/20 dark:bg-stone-700/20" />
                <div className="h-6 w-48 bg-stone-300/20 dark:bg-stone-700/20" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-stone-300/20 dark:bg-stone-700/20" />
                  <div className="h-4 w-5/6 bg-stone-300/20 dark:bg-stone-700/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // sort and filter assets
  const sortedSteps = processSteps
    ? [...processSteps]
        .filter((step) => step.isActive)
        .sort((a, b) => a.order - b.order)
    : [];

  if (sortedSteps.length === 0) {
    return (
      <section
        id="process"
        className="relative bg-stone-100 pt-28 pb-24 dark:bg-stone-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mb-16 text-center"
          >
            <h2
              className="mb-4 text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              <span className="text-stone-950 dark:text-stone-500">
                Nosso Processo
              </span>{" "}
              <span className="text-carrot-600 dark:text-carrot-400">
                Criativo
              </span>
            </h2>
            <p
              className="mx-auto text-xl font-medium text-stone-600 md:text-2xl lg:text-xl dark:text-stone-400"
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              Em breve teremos informações sobre nosso processo de trabalho.
            </p>
            <p className="mt-4 text-sm text-stone-500 dark:text-stone-500">
              ⚠️ Acesse o painel administrativo para adicionar Processos.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="process"
      className={`relative pt-28 pb-24 transition-colors duration-700 ${
        theme === "dark" ? "bg-stone-900" : "bg-stone-100"
      }`}
    >
      <div className="container mx-auto px-6">
        {/* main title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2
            className="mb-4 text-4xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-charis-sil)" }}
          >
            <span
              className={`${
                !mounted
                  ? "text-stone-950"
                  : theme === "dark"
                    ? "text-stone-500"
                    : "text-stone-950"
              }`}
            >
              Nosso Processo
            </span>{" "}
            <span
              className={`${
                !mounted
                  ? "text-carrot-600"
                  : theme === "dark"
                    ? "text-carrot-400"
                    : "text-carrot-600"
              }`}
            >
              Criativo
            </span>
          </h2>
          <p
            className={`mx-auto text-xl font-medium md:text-2xl lg:text-xl ${
              theme === "dark" ? "text-stone-400" : "text-stone-600"
            }`}
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            Uma metodologia comprovada que garante excelência em cada etapa,
            desde a concepção até a execução.
          </p>
        </motion.div>

        {/* process cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sortedSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="group relative"
              onTouchStart={() => handleCardTap(index)}
            >
              {/* external number */}
              <div
                className={`absolute -top-2 -left-4 flex h-10 w-10 items-center justify-center rounded-full text-base font-bold transition-all duration-300 group-hover:scale-110 ${
                  tappedCard === index
                    ? "scale-110 " +
                      (theme === "dark"
                        ? "text-carrot-500 bg-stone-700"
                        : "text-crusta-500 bg-stone-300")
                    : theme === "dark"
                      ? "bg-carrot-500 group-hover:text-carrot-500 text-stone-900 group-hover:bg-stone-700"
                      : "bg-crusta-500 group-hover:text-crusta-500 text-stone-100 group-hover:bg-stone-300"
                }`}
              >
                {index + 1}
              </div>

              {/* card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex h-full flex-col rounded-lg p-6 transition-all duration-300 group-hover:scale-102 ${
                  tappedCard === index
                    ? "scale-102 " +
                      (theme === "dark" ? "bg-stone-800/60" : "bg-stone-50/70")
                    : theme === "dark"
                      ? "bg-stone-800/80 hover:bg-stone-800/60"
                      : "bg-white hover:bg-stone-50/70"
                } ${
                  theme === "dark" ? "shadow-md shadow-stone-700" : "shadow-lg"
                }`}
              >
                {/* icon */}
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${
                    tappedCard === index
                      ? "scale-110 " +
                        (theme === "dark"
                          ? "bg-carrot-500 text-stone-900"
                          : "bg-crusta-500 text-stone-100")
                      : theme === "dark"
                        ? "text-carrot-400 group-hover:bg-carrot-500 bg-stone-700 group-hover:text-stone-900"
                        : "text-crusta-500 group-hover:bg-crusta-500 bg-stone-100 group-hover:text-stone-100"
                  }`}
                >
                  {iconMap[step.icon] ?? <Search className="h-6 w-6" />}
                </div>

                {/* card title */}
                <h3
                  className={`mb-3 text-xl font-semibold transition-colors duration-300 ${
                    tappedCard === index
                      ? theme === "dark"
                        ? "text-carrot-400"
                        : "text-crusta-500"
                      : theme === "dark"
                        ? "group-hover:text-carrot-400 text-stone-200"
                        : "group-hover:text-crusta-500 text-stone-800"
                  }`}
                  style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                >
                  {step.title}
                </h3>

                {/* description */}
                <p
                  className={`flex-1 text-justify ${
                    theme === "dark" ? "text-stone-400" : "text-stone-600"
                  }`}
                  style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                >
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mx-auto mt-16 max-w-3xl text-center"
        >
          <p
            className={`text-lg italic md:text-xl md:tracking-widest lg:text-lg ${
              theme === "dark" ? "text-stone-300" : "text-stone-700"
            }`}
            style={{ fontFamily: "var(--font-charis-sil)" }}
          >
            Cada etapa é cuidadosamente planejada e executada com precisão,
            garantindo que seu evento não seja apenas mais um, mas uma
            experiência marcante e memorável.
          </p>
        </motion.div>
      </div>

      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator href="#services-detail" initialBg="bg-stone-300" />
      </div>
    </section>
  );
}
