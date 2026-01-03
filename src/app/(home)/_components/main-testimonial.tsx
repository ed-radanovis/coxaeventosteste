"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { SectionSeparator } from "@/components/ui/section-separator";

const TESTIMONIALS = [
  {
    text: "Trabalhar com a Coxa Eventos transformou o planejamento do meu evento, antes uma fonte de estresse, em uma experiência surpreendentemente leve. Sua abordagem única une cuidado minucioso com uma criatividade que encanta. O grande diferencial foi encontrar uma equipe que não apenas ouviu meus desejos, mas os interpretou com maestria, entregando um resultado ainda mais brilhante do que eu havia imaginado.",
    author: "Expo Tricô - Monte Sião",
  },
  {
    text: "A atuação da empresa foi além de tudo que havíamos previsto. Em cada etapa do processo, da concepção da identidade visual ao suporte para nossas apresentações, o time demonstrou uma maestria e um profissionalismo que fizeram toda a diferença. O cuidado com a organização e a condução impecável de cada momento transformaram nossa expectativa em uma vivência verdadeiramente completa e sem contratempos.",
    author: "Orinter - Tours & Travels",
  },
  {
    text: "Eles entraram em cena e transformaram o planejamento do nosso casamento, em uma jornada leve e prazerosa. Sua sensibilidade em captar cada detalhe da nossa história e traduzi-lo em elementos visuais e experiências foi o que nos conquistou. No grande dia, tudo fluiu com uma harmonia que só quem é verdadeiramente especializado pode proporcionar. Eles não apenas organizaram um evento, mas conduziram cada momento com uma discrição e eficiência notáveis, permitindo que nós e nossos familiares vivêssemos plenamente a magia da celebração.",
    author: "Noiva - Casamento A.L. 08/2025",
  },
];

export function MainTestimonial() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const autoplayMs = 4000;

  useEffect(() => {
    setMounted(true);
  }, []);

  // autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;
        return nextIndex >= TESTIMONIALS.length ? 0 : nextIndex;
      });
    }, autoplayMs);

    return () => clearInterval(timer);
  }, []);

  const testimonial = (TESTIMONIALS[index] ?? TESTIMONIALS[0])!;

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section
        id="main-testimonial"
        className="relative flex h-dvh items-start justify-center overflow-hidden bg-stone-200 pt-48 text-stone-950 transition-colors duration-700 sm:pt-24 md:items-center md:py-20"
      >
        <div className="pointer-events-none absolute inset-0 z-0 mt-0 h-dvh w-full bg-stone-300 md:mt-28 md:h-3/4" />
        {/* skeleton overlay - fixed for SSR */}
        <div className="bg-crusta-700/50 absolute inset-0" />{" "}
        {/* skeleton content */}
        <div className="relative z-0 mx-auto w-full max-w-5xl px-8 text-left md:mt-0 md:mr-auto md:ml-20">
          <div className="relative min-h-[60vh] max-w-2xl rounded-md bg-stone-950/30 px-4 py-1 text-left backdrop-blur-sm md:min-h-[60vh] md:px-10 md:py-12">
            <div className="mb-4 flex items-center justify-start gap-4 md:mb-8">
              <div className="h-6 w-48 rounded bg-stone-300/20" />
            </div>
            <div className="space-y-4">
              <div className="h-4 rounded bg-stone-300/20" />
              <div className="h-4 rounded bg-stone-300/20" />
              <div className="h-4 w-3/4 rounded bg-stone-300/20" />
              <div className="mt-4 h-6 w-32 rounded bg-stone-300/20" />
            </div>

            {/* skeleton indicators */}
            <div className="fixed bottom-8 left-8 z-50 flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  className="h-[6px] w-4 rounded-full bg-stone-300/20 md:w-8"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-300/20">
            <div className="h-8 w-8 rounded bg-stone-400" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="main-testimonial"
      className={`relative flex h-dvh items-start justify-center overflow-hidden pt-48 transition-colors duration-700 sm:pt-24 md:items-center md:py-20 ${
        theme === "dark"
          ? "bg-stone-800 text-stone-100"
          : "bg-stone-200 text-stone-950"
      }`}
    >
      {/* background video */}
      <div className="pointer-events-none absolute inset-0 z-0 mt-0 h-dvh w-full md:mt-28 md:h-3/4">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          poster="/videos/main_testimonial/image_aerea_aguas_de_lindoia_poster.jpg"
          src="/videos/main_testimonial/filmagem_aerea_aguas_de_lindoia.mp4"
        />
        {/* overlay */}
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-stone-900/60" : "bg-crusta-700/50"
          }`}
        />
      </div>

      {/* content */}
      <div className="relative z-0 mx-auto w-full max-w-5xl px-8 text-left md:mt-0 md:mr-auto md:ml-20">
        <div
          className="relative min-h-[60vh] max-w-2xl rounded-md bg-stone-950/30 px-4 py-1 text-left backdrop-blur-sm md:min-h-[60vh] md:px-10 md:py-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Main Testimonials"
        >
          <div className="mb-4 flex items-center justify-start gap-4 md:mb-8">
            <h3
              className="text-xl font-semibold tracking-wide text-stone-100/90 italic md:text-2xl"
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              Principais depoimentos :
            </h3>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="max-w-3xl"
            >
              <p
                className="text-center text-base leading-tight font-light text-stone-300 md:text-justify md:text-lg md:leading-normal"
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                <span
                  className={`align-baseline text-4xl md:text-6xl ${
                    theme === "dark" ? "text-carrot-400" : "text-carrot-500"
                  }`}
                >
                  ❛❛
                </span>{" "}
                {testimonial.text}
              </p>

              <footer>
                <span
                  className={`inline-block pt-6 text-base font-medium tracking-normal uppercase italic md:tracking-wide ${
                    theme === "dark" ? "text-carrot-400" : "text-carrot-500"
                  }`}
                  style={{ fontFamily: "var(--font-charis-sil)" }}
                >
                  {testimonial.author}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* indicators */}
          <div className="fixed bottom-8 left-8 z-50 flex gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-[6px] w-4 rounded-full transition-all duration-300 md:w-8 ${
                  i === index ? "bg-carrot-400 scale-125" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator
          href="/#news-and-views"
          initialBg="bg-stone-300"
          className="bg-stone-300/20"
        />
      </div>
    </section>
  );
}
