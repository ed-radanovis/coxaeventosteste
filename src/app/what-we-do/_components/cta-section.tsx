"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function CtaSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // state for taps
  const [tappedButton, setTappedButton] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // function for taps
  const handleButtonTap = (buttonId: string) => {
    setTappedButton(buttonId);
    setTimeout(() => setTappedButton(null), 300);
  };

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section className="relative bg-stone-100 py-24 dark:bg-stone-900">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 h-12 w-64 bg-stone-300/20 dark:bg-stone-700/20" />
            <div className="mb-8 h-6 w-full bg-stone-300/20 dark:bg-stone-700/20" />
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="h-12 flex-1 bg-stone-300/20 dark:bg-stone-700/20" />
              <div className="h-12 flex-1 bg-stone-300/20 dark:bg-stone-700/20" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative border-t py-10 transition-colors duration-700 ${
        theme === "dark"
          ? "border-carrot-800 bg-stone-900"
          : "border-stone-400 bg-stone-100"
      }`}
    >
      <div
        className={`container mx-4 w-fit rounded-lg px-2 py-6 md:mx-4 md:px-4 lg:mx-auto ${
          theme === "dark"
            ? "bg-stone-800/60 shadow-md shadow-stone-700"
            : "bg-stone-200 shadow-lg shadow-stone-600"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* title */}
          <h2
            className="mb-6 text-4xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-charis-sil)" }}
          >
            <span
              className={theme === "dark" ? "text-stone-300" : "text-stone-700"}
            >
              Pronto para
            </span>{" "}
            <span
              className={`italic ${
                !mounted
                  ? "text-cerise-800"
                  : theme === "dark"
                    ? "text-cerise-400"
                    : "text-cerise-800"
              }`}
            >
              Transformar
            </span>{" "}
            <span
              className={theme === "dark" ? "text-stone-300" : "text-stone-700"}
            >
              Seu Evento?
            </span>
          </h2>

          {/* subtitle */}
          <p
            className={`mb-10 text-lg ${
              theme === "dark" ? "text-stone-300" : "text-stone-700"
            }`}
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            Vamos juntos criar uma experiência memorável. Entre em contato para
            uma consultoria gratuita e descubra como podemos elevar seu evento
            ao próximo nível.
          </p>
          {/* CTA buttons */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
            {/* appointments */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                onTouchStart={() => handleButtonTap("schedule")}
                className={`group relative inline-flex items-center justify-center gap-3 rounded-sm border px-1 py-3 text-base font-medium transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 md:px-6 md:text-sm ${
                  !mounted
                    ? "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-950 hover:bg-stone-100"
                    : theme === "dark"
                      ? "bg-carrot-600 hover:text-carrot-400 hover:border-carrot-400 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:scale-102 hover:bg-stone-900 hover:shadow-lg"
                      : "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-800 hover:scale-102 hover:bg-stone-100 hover:shadow-xl"
                } ${
                  tappedButton === "schedule"
                    ? "scale-102 shadow-lg " +
                      (theme === "dark"
                        ? "!border-carrot-400 !text-carrot-400 bg-stone-900"
                        : "!border-crusta-500 !text-crusta-500 bg-stone-100")
                    : ""
                }`}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                <Link href="/contact">
                  <Calendar className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
                  Agendar Consulta
                </Link>
              </Button>
            </motion.div>

            {/* WhatsApp */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                onTouchStart={() => handleButtonTap("whatsapp")}
                className={`group relative inline-flex items-center justify-center gap-3 rounded-sm border px-1 py-3 text-base font-medium transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 md:px-6 md:text-sm ${
                  !mounted
                    ? "border-green-500 text-green-500 shadow-lg shadow-stone-950 hover:border-green-500 hover:bg-green-50 hover:text-green-500"
                    : theme === "dark"
                      ? "border-green-50 bg-green-800 text-green-50 shadow-md shadow-stone-600 hover:scale-102 hover:border-green-400 hover:bg-stone-900 hover:text-green-400 hover:shadow-lg"
                      : "border-green-300 bg-green-800 text-green-300 shadow-lg shadow-stone-800 hover:scale-102 hover:border-green-700 hover:bg-green-50 hover:text-green-700 hover:shadow-xl"
                } ${
                  tappedButton === "whatsapp"
                    ? "scale-102 shadow-lg " +
                      (theme === "dark"
                        ? "!border-green-400 bg-stone-900 !text-green-300"
                        : "!border-green-500 bg-green-50 !text-green-500")
                    : ""
                }`}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                <Link
                  href="https://wa.me/5519982557489?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Coxa%20Eventos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-5 w-5 transition-all duration-300 group-hover:scale-110" />
                  Falar no WhatsApp
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
            className="mx-auto mt-12"
          >
            <p
              className={`text-sm ${
                theme === "dark" ? "text-stone-500" : "text-stone-600"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              <span className="font-semibold">Resposta em até 24 horas.</span>{" "}
              Nossa equipe está pronta para entender suas necessidades e
              apresentar soluções personalizadas.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
