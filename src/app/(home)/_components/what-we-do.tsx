"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { SectionSeparator } from "@/components/ui/section-separator";
import { useState, useEffect } from "react";

export function WhatWeDo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isButtonTapped, setIsButtonTapped] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleButtonTap = () => {
    setIsButtonTapped(true);
    setTimeout(() => setIsButtonTapped(false), 300);
  };

  // during SSR, render a skeleton
  if (!mounted) {
    return (
      <section
        id="what-we-do"
        className="relative flex items-center justify-center overflow-hidden bg-stone-200 py-24 text-stone-950"
      >
        <div className="container mx-auto mt-0 flex max-w-7xl flex-col-reverse items-start justify-center gap-10 px-6 md:mt-8 md:flex-row md:gap-20 lg:px-12">
          {/* left side - skeleton */}
          <div className="flex w-full flex-col justify-center md:w-2/3">
            <div className="mb-8 h-12 bg-stone-300/20 md:h-20" />
            <div className="space-y-4">
              <div className="h-4 bg-stone-300/20" />
              <div className="h-4 bg-stone-300/20" />
              <div className="h-4 w-3/4 bg-stone-300/20" />
              <div className="h-4 bg-stone-300/20" />
              <div className="h-4 w-5/6 bg-stone-300/20" />
            </div>
            <div className="mt-10 h-12 w-48 bg-stone-300/20" />
            <div className="mt-12 h-6 bg-stone-300/20" />
          </div>

          {/* sidebar skeleton */}
          <div className="mt-16 hidden h-[550px] w-[1px] bg-stone-700/50 md:block" />

          {/* right side - skeleton */}
          <div className="flex w-full flex-col items-center md:w-1/3 md:items-end md:self-center">
            <div className="text-center leading-[1.2] md:text-left">
              <div className="mb-1.5 h-16 bg-stone-300/20 md:h-20" />
              <div className="h-16 bg-stone-300/20 md:h-20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="what-we-do"
      className={`relative flex items-center justify-center overflow-hidden py-24 transition-colors duration-700 ${
        !mounted
          ? "bg-stone-200 text-stone-950"
          : theme === "dark"
            ? "bg-stone-800 text-stone-100"
            : "bg-stone-200 text-stone-950"
      }`}
    >
      <div className="container mx-auto mt-0 flex max-w-7xl flex-col-reverse items-start justify-center gap-10 px-6 md:mt-8 md:flex-row md:gap-20 lg:px-12">
        {/* left side - content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex w-full flex-col justify-center md:w-2/3"
        >
          {/* subtitle */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className={`mb-8 text-lg font-semibold italic md:text-5xl ${
              !mounted
                ? "text-stone-800"
                : theme === "dark"
                  ? "text-stone-500"
                  : "text-stone-800"
            }`}
            style={{ fontFamily: "var(--font-charis-sil)" }}
          >
            Criamos Experiências{" "}
            <span
              className={`${
                !mounted
                  ? "text-cerise-800"
                  : theme === "dark"
                    ? "text-cerise-400"
                    : "text-cerise-800"
              }`}
            >
              Inesquecíveis&nbsp;
            </span>
            !
          </motion.h3>

          {/* main text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className={`space-y-6 text-justify text-base leading-relaxed font-semibold md:text-lg ${
              !mounted
                ? "text-stone-700"
                : theme === "dark"
                  ? "text-stone-300"
                  : "text-stone-700"
            }`}
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            <p>
              Com atuação nacional, trazemos uma visão internacional para cada
              projeto, seja para uma grande marca ou para a celebração dos seus
              sonhos. Essa abrangência nos permite idealizar momentos dinâmicos
              e memoráveis em qualquer lugar, utilizando formatos presenciais,
              virtuais ou híbridos.
            </p>
            <p>
              Nossa equipe é formada por especialistas dedicados em todas as
              áreas da gestão de eventos. Trabalhamos lado a lado com você,
              mergulhando na sua essência - seja a cultura da sua empresa ou a
              emoção da sua história pessoal - para compreender suas metas e
              anseios. Dessa conexão, nascem soluções meticulosamente
              planejadas, que refletem com autenticidade a sua identidade e os
              seus maiores desejos.
            </p>
            <p>Descubra como podemos transformar a sua ideia em realidade.</p>
          </motion.div>

          {/* CTA button */}
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
            href="/"
            onTouchStart={handleButtonTap}
            className={`group relative mt-10 inline-flex items-center justify-center gap-3 rounded-sm border px-1 py-3 text-base font-medium transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 md:px-6 md:text-lg ${
              !mounted
                ? "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-950 hover:bg-stone-100"
                : theme === "dark"
                  ? "bg-carrot-600 hover:text-carrot-400 hover:border-carrot-400 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:bg-stone-900 hover:shadow-lg"
                  : "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-800 hover:bg-stone-100 hover:shadow-xl"
            } ${
              isButtonTapped
                ? "scale-102 shadow-lg " +
                  (theme === "dark"
                    ? "!border-carrot-400 !text-carrot-400 bg-stone-900"
                    : "!border-crusta-500 !text-crusta-500 bg-stone-100")
                : ""
            }`}
          >
            <Sparkles className="h-5 w-5" />
            <span className="relative z-10">
              Veja mais sobre O Que NÓS Fazemos
            </span>
          </motion.a>

          {/* final phrase */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.3, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className={`mt-12 text-justify text-xl font-medium md:text-xl ${
              !mounted
                ? "text-stone-800"
                : theme === "dark"
                  ? "text-stone-400"
                  : "text-stone-800"
            }`}
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            Independente do tamanho do seu evento, a nossa missão é assegurar
            que cada detalhe seja perfeito.{" "}
            <span
              className={`text-justify font-semibold italic ${
                !mounted
                  ? "text-cerise-800"
                  : theme === "dark"
                    ? "text-cerise-400"
                    : "text-cerise-800"
              }`}
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              Estamos te aguardando.
            </span>
          </motion.p>
        </motion.div>
        {/* sidebar */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className={`mt-16 hidden w-[1px] rounded-full md:mt-60 md:block lg:mt-16 ${
            !mounted
              ? "bg-stone-700/50"
              : theme === "dark"
                ? "bg-stone-600/50"
                : "bg-stone-700/50"
          }`}
          style={{
            height: "550px",
            boxShadow: !mounted
              ? "0 0 6px rgba(12, 12, 12, 0.7)"
              : theme === "dark"
                ? "0 0 8px rgba(255,255,255,0.2)"
                : "0 0 6px rgba(12, 12, 12, 0.7)",
          }}
        />
        {/* right side - main title */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex w-full flex-col md:mr-10 md:ml-0 md:w-1/3 md:items-end md:self-center lg:mr-0"
        >
          <div className="text-center leading-[1.2] md:text-left">
            <h2
              className="mb-1.5 text-5xl font-bold md:text-4xl lg:text-7xl"
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              O QUE
            </h2>
            <h1
              className="text-5xl font-bold md:text-4xl lg:text-7xl"
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              <span className="text-stone-500">NÓS</span>{" "}
              <span
                className={`${
                  !mounted
                    ? "text-carrot-600"
                    : theme === "dark"
                      ? "text-carrot-400"
                      : "text-carrot-600"
                }`}
              >
                FAZEMOS
              </span>
            </h1>
          </div>
        </motion.div>
      </div>
      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator href="/#services-grid" initialBg="bg-stone-300" />
      </div>
    </section>
  );
}
