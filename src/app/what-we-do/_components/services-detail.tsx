"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SectionSeparator } from "@/components/ui/section-separator";
import Link from "next/link";
import { api } from "@/trpc/react";
import {
  Video,
  Users,
  Mic,
  Camera,
  Palette,
  Zap,
  Globe,
  BarChart,
  Minus,
  Plus,
  MessageSquareMore,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Video: <Video className="h-10 w-10" />,
  Users: <Users className="h-10 w-10" />,
  Mic: <Mic className="h-10 w-10" />,
  Camera: <Camera className="h-10 w-10" />,
  Palette: <Palette className="h-10 w-10" />,
  Zap: <Zap className="h-10 w-10" />,
  Globe: <Globe className="h-10 w-10" />,
  BarChart: <BarChart className="h-10 w-10" />,
};

export function ServicesDetail() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openCard, setOpenCard] = useState<string | null>(null);
  // state for taps
  const [tappedCard, setTappedCard] = useState<number | null>(null);

  // get active service details from the DB
  const { data: serviceDetails, isLoading } =
    api.serviceDetail.getActiveServiceDetails.useQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  // function for taps
  const handleCardTap = (index: number) => {
    setTappedCard(index);
    setTimeout(() => setTappedCard(null), 1500);
  };

  const handleCardClick = (id: string) => {
    setOpenCard(openCard === id ? null : id);
  };

  // during SSR, renders a skeleton
  if (!mounted || isLoading) {
    return (
      <section
        id="services-detail"
        className="relative bg-stone-100 py-24 dark:bg-stone-900"
      >
        <div className="container mx-auto px-6">
          {/* skeleton content */}
          <div className="mb-16 text-center">
            <div className="mx-auto mb-4 h-12 w-64 bg-stone-300/20 dark:bg-stone-700/20" />
            <div className="mx-auto h-6 w-96 bg-stone-300/20 dark:bg-stone-700/20" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-10 w-10 rounded-full bg-stone-300/20 dark:bg-stone-700/20" />
                <div className="h-6 w-48 bg-stone-300/20 dark:bg-stone-700/20" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-stone-300/20 dark:bg-stone-700/20" />
                  <div className="h-4 w-5/6 bg-stone-300/20 dark:bg-stone-700/20" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-32 bg-stone-300/20 dark:bg-stone-700/20" />
                  <div className="h-3 w-28 bg-stone-300/20 dark:bg-stone-700/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // sort and filter assets
  const sortedServices = serviceDetails
    ? [...serviceDetails]
        .filter((service) => service.isActive)
        .sort((a, b) => a.order - b.order)
    : [];

  if (sortedServices.length === 0) {
    return (
      <section
        id="services-detail"
        className="relative bg-stone-200 pt-28 pb-24 dark:bg-stone-900"
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
              <span className="text-stone-950 dark:text-stone-50">
                Nossas Especialidades
              </span>
            </h2>
            <h2
              className="mb-8 text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              <span className="text-stone-500">em cada</span>{" "}
              <span className="text-cerise-800 dark:text-cerise-400 italic">
                Detalhe
              </span>{" "}
              <span className="text-stone-500 italic">!</span>
            </h2>
            <p
              className="mx-auto text-xl font-medium text-stone-700 md:text-2xl lg:text-xl dark:text-stone-300"
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              Em breve teremos informações sobre nossos especialidades.
            </p>
            <p className="mt-4 text-sm text-stone-500 dark:text-stone-500">
              ⚠️ Acesse o painel administrativo para adicionar especialidades
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services-detail"
      className={`relative pt-28 pb-24 transition-colors duration-700 ${
        theme === "dark" ? "bg-stone-800" : "bg-stone-200"
      }`}
    >
      <div className="mx-auto w-full px-3">
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
              className={` ${
                !mounted
                  ? "text-stone-950"
                  : theme === "dark"
                    ? "text-stone-50"
                    : "text-stone-950"
              }`}
            >
              Nossas Especialidades
            </span>
          </h2>
          <h2
            className="mb-8 text-4xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-charis-sil)" }}
          >
            <span className="text-stone-500">em cada</span>{" "}
            <span
              className={`italic ${
                !mounted
                  ? "text-cerise-800"
                  : theme === "dark"
                    ? "text-cerise-400"
                    : "text-cerise-800"
              }`}
            >
              Detalhe
            </span>{" "}
            <span className="text-stone-500 italic">!</span>
          </h2>
          <p
            className={`mx-auto text-xl font-medium md:text-2xl lg:text-xl ${
              theme === "dark" ? "text-stone-300" : "text-stone-700"
            }`}
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            Cada serviço é executado com excelência técnica e criativa,
            garantindo resultados excepcionais.
          </p>
        </motion.div>

        {/* grid */}
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {sortedServices.map((service, index) => {
            const isOpen = openCard === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: false, amount: 0.3 }}
                className="group"
              >
                {/* main card */}
                <motion.div
                  layout
                  transition={{
                    layout: { duration: 0.5, ease: "easeInOut" },
                  }}
                  onClick={() => handleCardClick(service.id)}
                  onTouchStart={() => handleCardTap(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer overflow-hidden ${
                    theme === "dark"
                      ? "shadow-lg shadow-stone-950"
                      : "shadow-lg shadow-stone-600"
                  }`}
                >
                  {/* background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${service.bgImage})`,
                    }}
                  />

                  {/* overlay */}
                  <motion.div
                    initial={false}
                    animate={{
                      background:
                        isOpen || tappedCard === index
                          ? theme === "dark"
                            ? "linear-gradient(to top, rgba(28, 25, 23, 0.95), rgba(28, 25, 23, 0.85))"
                            : "linear-gradient(to top, rgba(28, 25, 23, 0.90), rgba(28, 25, 23, 0.80))"
                          : theme === "dark"
                            ? "linear-gradient(to top, rgba(28, 25, 23, 0.85), rgba(28, 25, 23, 0.65), rgba(28, 25, 23, 0.45))"
                            : "linear-gradient(to top, rgba(28, 25, 23, 0.80), rgba(28, 25, 23, 0.60), rgba(28, 25, 23, 0.40))",
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  />

                  {/* content container */}
                  <motion.div
                    layout
                    className="relative z-10 flex flex-col items-center px-6 text-center text-white"
                    style={{
                      minHeight: isOpen ? 500 : 380,
                      paddingTop: isOpen ? "2rem" : "2.5rem",
                      paddingBottom: isOpen ? "1rem" : "2.5rem",
                    }}
                    transition={{
                      layout: { duration: 0.5, ease: "easeInOut" },
                      minHeight: { duration: 0.5, ease: "easeInOut" },
                      padding: { duration: 0.5, ease: "easeInOut" },
                    }}
                  >
                    {/* main icon */}
                    <div
                      className={`mb-6 transition-all duration-500 ${
                        isOpen || tappedCard === index
                          ? theme === "dark"
                            ? "group-hover:text-carrot-400 text-stone-100 group-hover:scale-120"
                            : "group-hover:text-crusta-300 text-stone-100 group-hover:scale-120"
                          : theme === "dark"
                            ? "text-carrot-400 group-hover:scale-120 group-hover:text-stone-100"
                            : "text-crusta-400 group-hover:scale-120 group-hover:text-stone-100"
                      } ${tappedCard === index ? "scale-120" : ""}`}
                    >
                      {iconMap[service.iconName] ?? (
                        <Video className="h-10 w-10" />
                      )}
                    </div>

                    {/* title */}
                    <h3
                      className={`mb-3 text-2xl font-semibold transition-all duration-500 ${
                        isOpen || tappedCard === index
                          ? theme === "dark"
                            ? "text-carrot-400 group-hover:scale-105 group-hover:text-stone-100"
                            : "text-crusta-400 group-hover:scale-105 group-hover:text-stone-100"
                          : theme === "dark"
                            ? "group-hover:text-carrot-400 text-stone-100 group-hover:scale-105"
                            : "group-hover:text-crusta-400 text-stone-100 group-hover:scale-105"
                      } ${tappedCard === index ? "scale-105" : ""}`}
                      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                    >
                      {service.title}
                    </h3>

                    {/* divider line */}
                    <motion.div
                      initial={false}
                      animate={{
                        width: isOpen ? "60px" : "40px",
                        background:
                          isOpen || tappedCard === index
                            ? theme === "dark"
                              ? "#f28f00 "
                              : "#d46921"
                            : theme === "dark"
                              ? "#d6d3d1"
                              : "#f5f5f4",
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="my-4 h-[2px]"
                    />

                    <div className="relative z-20 w-full">
                      {/* short description */}
                      <p
                        className="mt-3 text-base leading-relaxed text-stone-200"
                        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                      >
                        {service.description}
                      </p>

                      {/* button */}
                      <div className="mt-6 flex items-center justify-center gap-3">
                        <div
                          className={`h-10 w-[1px] transition-all duration-500 ${
                            theme === "dark" ? "bg-carrot-400" : "bg-crusta-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-bold tracking-widest uppercase transition-colors duration-500 ${
                            theme === "dark"
                              ? "text-carrot-400"
                              : "text-crusta-400"
                          }`}
                        >
                          Saiba mais
                        </span>

                        {/* secondary icon */}
                        <motion.span
                          key={`toggle-${service.id}-${isOpen ? "minus" : "plus"}`}
                          initial={{ rotate: isOpen ? -360 : 360 }}
                          animate={{ rotate: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                            bounce: 0.1,
                          }}
                          className={`ml-3 ${
                            theme === "dark"
                              ? "text-stone-300"
                              : "text-stone-100"
                          }`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isOpen ? (
                            <Minus className="h-8 w-8" />
                          ) : (
                            <Plus className="h-8 w-8" />
                          )}
                        </motion.span>
                      </div>
                    </div>

                    {/* expanded content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          key="expanded-content"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                            marginTop: "1.5rem",
                          }}
                          exit={{
                            opacity: 0,
                            height: 0,
                            marginTop: 0,
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="w-full overflow-hidden md:max-w-full"
                        >
                          <div className="max-h-screen overflow-y-auto pr-2 md:max-h-none">
                            {/* detailed description */}
                            <p
                              className="mb-4 text-justify text-sm leading-tight tracking-wide text-stone-200"
                              style={{
                                fontFamily: "var(--font-ibm-plex-sans)",
                              }}
                            >
                              {service.detailedDescription}
                            </p>

                            {/* features */}
                            <motion.ul className="mb-8 space-y-1">
                              {service.features.map((feature, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center text-base text-stone-300"
                                  style={{
                                    fontFamily: "var(--font-ibm-plex-sans)",
                                  }}
                                >
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 + 0.1 }}
                                    className={`mr-2 h-2 w-2 rounded-full ${
                                      theme === "dark"
                                        ? "bg-carrot-400"
                                        : "bg-crusta-400"
                                    }`}
                                  />
                                  {feature}
                                </motion.li>
                              ))}
                            </motion.ul>

                            {/* link */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              <Link
                                href="/contact"
                                className={`group inline-flex items-center text-base font-bold tracking-widest transition-all duration-500 hover:scale-120 ${
                                  theme === "dark"
                                    ? "group-hover:text-carrot-400 text-stone-300"
                                    : "group-hover:text-crusta-400 text-stone-100"
                                }`}
                                style={{ fontFamily: "var(--font-charis-sil)" }}
                              >
                                <MessageSquareMore
                                  className={`h-5 w-5 transition-colors duration-500 ${
                                    theme === "dark"
                                      ? "text-carrot-400 group-hover:text-stone-300"
                                      : "text-crusta-400 group-hover:text-stone-100"
                                  }`}
                                />
                                &nbsp; Fale Conosco
                              </Link>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* secondary text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div
            className={`rounded-lg p-8 ${
              theme === "dark"
                ? "bg-stone-900/30 shadow-lg shadow-stone-950"
                : "bg-white/50 shadow-lg shadow-stone-600"
            }`}
          >
            <h4
              className={`mb-4 text-center text-2xl font-bold ${
                !mounted
                  ? "text-cerise-800"
                  : theme === "dark"
                    ? "text-cerise-400"
                    : "text-cerise-800"
              }`}
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              Abordagem Integrada
            </h4>
            <p
              className={`text-center text-lg ${
                theme === "dark" ? "text-stone-300" : "text-stone-700"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              Não trabalhamos com serviços isolados. Nossa força está na
              integração perfeita entre todas as especialidades, criando uma
              experiência coesa e impactante. Da tecnologia à criatividade, cada
              elemento é pensado para trabalhar em harmonia com os demais.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator href="#footer" initialBg="bg-stone-300" />
      </div>
    </section>
  );
}
