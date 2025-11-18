"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SectionSeparator } from "@/components/ui/section-separator";
import { Play, Search, X } from "lucide-react";

export function About() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  // states for taps
  const [isButtonTapped, setIsButtonTapped] = useState(false);
  const [isVideoTapped, setIsVideoTapped] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // functions for taps
  const handleButtonTap = () => {
    setIsButtonTapped(true);
    setTimeout(() => setIsButtonTapped(false), 300);
  };

  const handleVideoTap = () => {
    setIsVideoTapped(true);
    setTimeout(() => setIsVideoTapped(false), 300);
    setIsVideoOpen(true);
  };

  const imageSrc = !mounted
    ? "/frames/frame_coxa_eventos_light.svg"
    : theme === "dark"
      ? "/frames/frame_coxa_eventos_dark.svg"
      : "/frames/frame_coxa_eventos_light.svg";

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section
        id="about"
        className="relative flex flex-col items-center justify-center overflow-hidden bg-stone-100 py-2 text-stone-950"
      >
        <div className="container mx-auto mt-16 mb-8 grid max-w-7xl grid-cols-1 items-center gap-2 px-6 md:mt-auto md:grid-cols-2 md:gap-10 lg:px-12">
          {/* left side - skeleton */}
          <div className="flex items-center justify-center gap-6 md:justify-normal">
            <div className="flex flex-col items-center gap-4">
              <div className="h-[200px] w-[200px] bg-stone-300/20 md:h-[350px] md:w-[350px]" />
              <div className="h-[100px] w-[150px] bg-stone-300/20" />
            </div>
            <div className="hidden h-[400px] w-[1px] bg-stone-700/50 md:block" />
          </div>
          {/* right side - skeleton */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="mt-0 mb-10 md:mt-24">
              <div className="h-12 bg-stone-300/20 md:h-16" />
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-stone-300/20" />
              <div className="h-4 bg-stone-300/20" />
              <div className="h-4 w-3/4 bg-stone-300/20" />
            </div>
            <div className="h-10 w-32 bg-stone-300/20" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* video modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
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
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 z-10 rounded-full bg-stone-100/10 p-2 text-stone-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-stone-100/20"
            >
              <X className="h-6 w-6" />
            </button>
            {/* video container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-stone-950">
              <iframe
                src="https://www.youtube.com/embed/gly8Le3_BZw?autoplay=1"
                title="Coxa Eventos - Nossa História"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <section
        id="about"
        className={`relative flex flex-col items-center justify-center overflow-hidden py-2 ${
          !mounted
            ? "bg-stone-100 text-stone-950"
            : theme === "dark"
              ? "bg-stone-900 text-stone-100"
              : "bg-stone-100 text-stone-950"
        }`}
      >
        <div className="container mx-auto mt-16 mb-8 grid max-w-7xl grid-cols-1 items-center gap-2 px-6 md:mt-auto md:grid-cols-2 md:gap-10 lg:px-12">
          {/* left side */}
          <motion.div
            className="flex items-center justify-center gap-4 md:items-start md:justify-normal md:pt-48"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8 md:gap-y-28">
              <Image
                src={imageSrc}
                alt="Coxa Eventos brand frame"
                width={160}
                height={160}
                className="h-auto w-[200px] max-w-[380px] object-contain md:w-[350px] md:max-w-[420px]"
                priority
              />

              {/* video thumbnail */}
              <motion.div
                className="h-[200px] w-[300px] cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: false, amount: 0.3 }}
                onClick={handleVideoTap}
                onTouchStart={handleVideoTap}
              >
                <div
                  className={`group relative h-full w-full overflow-hidden rounded-md border-[2px] transition-all duration-500 hover:scale-105 ${
                    !mounted
                      ? "border-carrot-400 shadow-lg shadow-stone-950"
                      : theme === "dark"
                        ? "border-cerise-500 shadow-md shadow-stone-500/50 hover:shadow-lg"
                        : "border-carrot-400 shadow-lg shadow-stone-950 hover:shadow-xl"
                  } ${
                    isVideoTapped ? "scale-105 shadow-lg brightness-110" : ""
                  }`}
                >
                  <Image
                    src="/images/image_about_yt_video.jpg"
                    alt="Conheça nossa história - Coxa Eventos"
                    width={150}
                    height={100}
                    className={`object-fit h-full w-full brightness-80 transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110 ${
                      isVideoTapped ? "scale-110 brightness-110" : ""
                    }`}
                  />

                  {/* overlay + play button */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 group-hover:bg-stone-950/20 ${
                      isVideoTapped ? "bg-stone-950/20" : "bg-stone-950/40"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-md shadow-lg transition-all duration-300 group-hover:scale-110 ${
                          !mounted
                            ? "bg-carrot-600 group-hover:bg-persian-500"
                            : theme === "dark"
                              ? "group-hover:bg-carrot-400 bg-persian-500"
                              : "bg-carrot-600 group-hover:bg-persian-500"
                        } ${isVideoTapped ? "bg-persian-500 scale-110" : ""}`}
                      >
                        <Play className="h-4 w-4 fill-stone-100 text-stone-100" />
                      </div>
                      <span
                        className={`pt-2 text-center text-sm font-semibold tracking-wide transition-colors duration-300 ${
                          theme === "dark"
                            ? "group-hover:text-persian-400 text-stone-100"
                            : "group-hover:text-carrot-300 text-stone-300"
                        } ${
                          isVideoTapped
                            ? theme === "dark"
                              ? "text-persian-400"
                              : "text-carrot-300"
                            : ""
                        }`}
                        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                      >
                        Conheça Nossa História
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* sidebar */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className={`hidden w-[1px] rounded-full md:block ${
                !mounted
                  ? "bg-stone-700/50"
                  : theme === "dark"
                    ? "bg-stone-600/50"
                    : "bg-stone-700/50"
              }`}
              style={{
                height: "750px",
                marginLeft: "auto",
                marginRight: "auto",
                boxShadow: !mounted
                  ? "0 0 6px rgba(12, 12, 12, 0.7)"
                  : theme === "dark"
                    ? "0 0 8px rgba(255,255,255,0.2)"
                    : "0 0 6px rgba(12, 12, 12, 0.7)",
              }}
            />
          </motion.div>

          {/* right side - content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            viewport={{ once: false, amount: 0.1 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* main title */}
            <div className="mt-10 mb-10 md:mt-24">
              <h3
                className={`text-[2.6rem] leading-tight font-extrabold md:flex md:flex-row md:text-[1.6rem] lg:text-[2.8rem]`}
              >
                <span
                  className={`flex justify-center italic md:flex md:justify-start ${
                    !mounted
                      ? "text-stone-950"
                      : theme === "dark"
                        ? "text-stone-500"
                        : "text-stone-950"
                  }`}
                  style={{ fontFamily: "var(--font-charis-sil)" }}
                >
                  Nós somos a&nbsp;{" "}
                </span>
                <span
                  className={`flex justify-center italic ${
                    !mounted
                      ? "text-carrot-500"
                      : theme === "dark"
                        ? "text-carrot-400"
                        : "text-carrot-500"
                  }`}
                  style={{
                    fontFamily: "var(--font-charis-sil)",
                  }}
                >
                  Coxa Eventos.
                </span>
              </h3>
            </div>

            {/* main text */}
            <div
              className={`space-y-6 text-justify text-base leading-relaxed font-semibold md:text-lg ${
                !mounted
                  ? "text-stone-700"
                  : theme === "dark"
                    ? "text-stone-300"
                    : "text-stone-700"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              <p
                className={`text-center text-xl italic md:text-start md:text-2xl ${
                  !mounted
                    ? "text-cerise-800"
                    : theme === "dark"
                      ? "text-cerise-400"
                      : "text-cerise-800"
                }`}
              >
                Seja muito bem-vindo ao nosso universo.
              </p>
              <p>
                Qual é a nossa missão? De forma simples, somos realizadores de
                sonhos e eventos. Atuamos nacionalmente criando experiências de
                todos os formatos e portes, seja para fortalecer a marca de uma
                empresa ou para celebrar os momentos mais especiais da sua vida,
                como casamentos, aniversários, formaturas, dentre outros. No
                entanto, a verdadeira magia não está apenas no &quot;o que&quot;
                fazemos, e sim no &quot;como&quot; damos vida a cada projeto. É
                essa a base para parcerias sólidas e para a realização perfeita
                da sua celebração.
              </p>
              <p>
                Nosso processo começa com uma conversa atenta. Seja para um
                evento corporativo ou pessoal, nos dedicamos a mergulhar na
                essência da sua necessidade, compreendendo seus desejos, sua
                história e seus objetivos. Só então colocamos mãos à obra para
                idealizar e construir eventos que genuinamente acolham seus
                convidados ou o seu público. Criamos, planejamos e executamos
                momentos memoráveis que fortalecem conexões, engajam pessoas e
                celebram marcas ou histórias de vida. Da ideia inicial ao último
                detalhe da realização, estamos aqui para materializar a sua
                visão, garantindo que cada evento seja único e inesquecível.
              </p>
            </div>

            {/* subtitle */}
            <div>
              <h4
                className={`text-center text-lg font-bold tracking-wide md:text-start ${
                  !mounted
                    ? "text-cerise-800"
                    : theme === "dark"
                      ? "text-cerise-400"
                      : "text-cerise-800"
                }`}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                NOSSA MARCA
              </h4>
            </div>

            {/* secondary text */}
            <div
              className={`space-y-5 text-justify text-base leading-relaxed font-semibold md:text-lg md:font-semibold ${
                !mounted
                  ? "text-stone-700"
                  : theme === "dark"
                    ? "text-stone-200"
                    : "text-stone-700"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              <p>
                Coxa Eventos é muito mais que um nome; é a promessa que
                carregamos em cada projeto.
              </p>
              <p>
                Ela traduz nossa dedicação em dar vida e energia a cada momento,
                transformando qualquer evento em uma experiência vibrante e
                verdadeiramente memorável. Seja para gerar resultados positivos
                para o seu negócio ou para celebrar uma data especial da sua
                vida, é nossa missão ativar essa magia para você. Em resumo, não
                importa a ocasião: nós a tornamos real. De eventos corporativos
                a celebrações privadas, de grandes festivais a encontros
                intimistas, nossa expertise está pronta para abraçar todo e
                qualquer tipo de desafio.
              </p>

              <p>
                Por isso, podemos dizer que nós somos a solução completa para
                tornar o seu evento único.{"  "}
                <span className="text-carrot-400 italic">
                  Não espere ... faça já seu orçamento.
                </span>
              </p>
            </div>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Button
                onTouchStart={handleButtonTap}
                className={`mb-12 flex items-center gap-2 rounded-sm border px-8 py-2 text-center text-lg font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 md:inline-flex ${
                  !mounted
                    ? "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 border-stone-200 text-stone-200 shadow-md shadow-stone-950 hover:bg-stone-200 hover:shadow-lg"
                    : theme === "dark"
                      ? "bg-carrot-600 hover:text-carrot-400 hover:border-carrot-400 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:bg-stone-800 hover:shadow-lg"
                      : "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 border-stone-200 text-stone-200 shadow-md shadow-stone-950 hover:bg-stone-200 hover:shadow-lg"
                } ${
                  isButtonTapped
                    ? "scale-102 shadow-lg " +
                      (theme === "dark"
                        ? "border-carrot-400 text-carrot-400 bg-stone-800"
                        : "border-crusta-500 text-crusta-500 bg-stone-200")
                    : ""
                }`}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                <Search className="h-5 w-5" />
                <Link href="/">Saiba mais</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
          <SectionSeparator href="/#what-we-do" initialBg="bg-stone-300" />
        </div>
      </section>
    </>
  );
}
