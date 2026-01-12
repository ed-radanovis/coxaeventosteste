"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionSeparator } from "@/components/ui/section-separator";

export function Introduction() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSrc = !mounted
    ? "/frames/frame_coxa_eventos_light.svg"
    : theme === "dark"
      ? "/frames/frame_coxa_eventos_dark.svg"
      : "/frames/frame_coxa_eventos_light.svg";

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section id="introduction" className="relative pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* left side - skeleton */}
            <div className="space-y-6">
              <div className="h-16 rounded bg-stone-300/20" />
              <div className="h-4 rounded bg-stone-300/20" />
              <div className="h-4 rounded bg-stone-300/20" />
              <div className="h-4 w-3/4 rounded bg-stone-300/20" />
            </div>
            {/* right side - skeleton */}
            <div className="flex flex-col items-center">
              <div className="h-64 w-64 rounded bg-stone-300/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="introduction"
      className={`relative overflow-hidden pt-28 pb-20 ${
        theme === "dark"
          ? "bg-stone-900 text-stone-100"
          : "bg-stone-100 text-stone-950"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* left side - content  */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-8"
          >
            {/* title */}
            <div>
              <h2
                className="text-3xl leading-tight font-bold italic md:text-4xl lg:text-5xl"
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
                  Nossa Equipe&nbsp;...
                </span>
                <br />
                <span
                  className={`${
                    !mounted
                      ? "text-carrot-500"
                      : theme === "dark"
                        ? "text-carrot-400"
                        : "text-carrot-500"
                  }`}
                >
                  O Verdadeiro Diferencial.
                </span>
              </h2>
            </div>

            {/* divider line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="mt-0 h-[1px] w-28 origin-center"
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <div
                  className={`absolute inset-0 ${
                    theme === "dark" ? "bg-stone-600" : "bg-stone-400"
                  }`}
                />

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
                  className="shadow-[0_0_10px_rgba(255, 255, 255, 0.1)] bg-persian-500 absolute inset-0 h-full w-full rounded-full"
                />
              </div>
            </motion.div>

            {/* main text */}
            <div
              className={`space-y-6 text-justify text-lg leading-relaxed ${
                theme === "dark" ? "text-stone-300" : "text-stone-700"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              <p>
                Nosso time é a alma da{" "}
                <strong
                  className={`${
                    !mounted
                      ? "text-cerise-800"
                      : theme === "dark"
                        ? "text-cerise-400"
                        : "text-cerise-800"
                  }`}
                >
                  Coxa Eventos
                </strong>
                .
              </p>
              <p>
                Cada profissional traz não apenas expertise técnica, mas
                histórias de vida que enriquecem nossa abordagem criativa. Somos
                mais que especialistas em eventos - somos contadores de
                histórias, solucionadores de problemas e realizadores de sonhos.
              </p>
              <p>
                Combinamos paixão por detalhes com tecnologia de ponta,
                transformando visões em experiências sensoriais completas. Nossa
                força está na diversidade de habilidades: da logística impecável
                à criatividade sem limites, da produção técnica à gestão
                estratégica.
              </p>
              <p>
                Quando você escolhe a Coxa Eventos, não está contratando um
                serviço - está adquirindo parceiros comprometidos que respiram
                seu projeto como se fosse único. Porque para nós, cada evento é
                uma oportunidade de criar algo extraordinário.
              </p>
              <p
                className={`italic ${
                  !mounted
                    ? "text-cerise-800"
                    : theme === "dark"
                      ? "text-cerise-400"
                      : "text-cerise-800"
                }`}
                style={{ fontFamily: "var(--font-charis-sil)" }}
              >
                Juntos, não apenas planejamos eventos
                <strong> - criamos memórias!</strong>
              </p>
            </div>
          </motion.div>

          {/* right side - content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative h-48 w-48 md:h-64 md:w-64">
              <Image
                src={imageSrc}
                alt="Coxa Eventos brand frame"
                fill
                className={`object-contain transition-all duration-700 ${
                  theme === "dark"
                    ? "opacity-90 hover:opacity-100"
                    : "opacity-80 hover:opacity-100"
                }`}
              />
              {/* animated glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full p-2"
                animate={{
                  boxShadow: [
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? `0 0 20px ${theme === "dark" ? "rgba(214, 126, 0, 0.5)" : "rgba(128, 26, 51, 0.5)"}`
                      : `0 0 40px ${theme === "dark" ? "rgba(214, 126, 0, 0.5)" : "rgba(128, 26, 51, 0.5)"}`,
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? `0 0 50px ${theme === "dark" ? "rgba(214, 126, 0, 0.7)" : "rgba(128, 26, 51, 0.7)"}`
                      : `0 0 80px ${theme === "dark" ? "rgba(214, 126, 0, 0.7)" : "rgba(128, 26, 51, 0.7)"}`,
                    typeof window !== "undefined" && window.innerWidth < 768
                      ? `0 0 20px ${theme === "dark" ? "rgba(214, 126, 0, 0.5)" : "rgba(128, 26, 51, 0.5)"}`
                      : `0 0 40px ${theme === "dark" ? "rgba(214, 126, 0, 0.5)" : "rgba(128, 26, 51, 0.5)"}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
              className={`mt-8 text-center text-sm italic ${
                theme === "dark" ? "text-stone-400" : "text-stone-600"
              }`}
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              Onde cada detalhe conta, <br />e cada evento é único.
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator href="/who-are-we/#team" initialBg="bg-stone-300" />
      </div>
    </section>
  );
}
