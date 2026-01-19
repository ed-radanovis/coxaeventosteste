"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";

export function ServicesCarousel() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // state for taps
  const [tappedItem, setTappedItem] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "Reuniões e Conferências",
      icon: "/icons/icon_conference.png",
      href: "/services/conferences",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 2,
      title: "Congressos",
      icon: "/icons/icon_congress.png",
      href: "/services/congresses",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 3,
      title: "Exposições",
      icon: "/icons/icon_exhibition.png",
      href: "/services/exhibitions",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 4,
      title: "Feiras Comerciais",
      icon: "/icons/icon_business_fair2.png",
      href: "/services/business-fairs",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 5,
      title: "Lançamentos de Produtos",
      icon: "/icons/icon_launch_product.png",
      href: "/services/product-launches",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 6,
      title: "Eventos Esportivos",
      icon: "/icons/icon_sporting_events.png",
      href: "/services/sporting-events",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 7,
      title: "Casamentos",
      icon: "/icons/icon_wedding.png",
      href: "/services/weddings",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 8,
      title: "Shows Musicais",
      icon: "/icons/icon_music_show.png",
      href: "/services/music-shows",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 9,
      title: "Cinema",
      icon: "/icons/icon_cinema.png",
      href: "/services/cinema-events",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 10,
      title: "Celebrações",
      icon: "/icons/icon_celebrations.png",
      href: "/services/celebrations",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
  ];

  // function for taps
  const handleTap = (id: number) => {
    setTappedItem(id);
    setTimeout(() => setTappedItem(null), 3500);
  };

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section
        className={`border-t border-b py-4 transition-all duration-700 md:pt-3 md:pb-2 ${
          theme === "dark"
            ? "border-carrot-800 bg-stone-800 text-stone-100"
            : "border-stone-400 bg-stone-200 text-stone-950"
        }`}
      >
        <div className="container mx-0 max-w-full px-0">
          <div className="mb-4 text-center">
            <div className="h-6 bg-stone-300/20" />
          </div>
          <div className="relative overflow-hidden">
            {/* carousel skeleton */}
            <div className="flex items-center">
              {services.map((_, index) => (
                <div key={index} className="flex shrink-0 items-center">
                  <div className="flex h-[20vw] w-[40vw] flex-col items-center justify-center px-2 md:h-[6vw] md:w-[20vw]">
                    <div className="mb-2 h-[15vw] w-[15vw] rounded-sm bg-stone-300/20 md:h-[8vw] md:w-[8vw]" />
                    <div className="h-4 w-[30vw] bg-stone-300/20 md:w-[12vw]" />
                  </div>
                  {index < services.length - 1 && (
                    <div className="h-[5vw] w-[0.1vw] bg-stone-300/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`border-t border-b py-4 transition-all duration-700 md:pt-1 md:pb-0 ${
        theme === "dark"
          ? "border-carrot-800 bg-stone-800 text-stone-100"
          : "border-stone-400 bg-stone-200 text-stone-950"
      }`}
    >
      <div className="container mx-0 max-w-full px-0">
        <motion.h4
          className="mb-4 text-center text-sm font-extralight tracking-wider italic md:text-base"
          style={{ fontFamily: "var(--font-charis-sil)" }}
          initial={{ opacity: 0, y: 60, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span
            className={theme === "dark" ? "text-cerise-600" : "text-crusta-400"}
          >
            Tipos de Eventos que Realizamos.
          </span>
        </motion.h4>

        {/* carousel */}
        <div className="relative overflow-hidden">
          <div className="animate-marquee flex w-max">
            {[...services, ...services].map((service, index, array) => (
              <div
                key={`${service.id}-${index}`}
                className="flex shrink-0 items-center"
              >
                {/* service container */}
                <Link
                  href={service.href}
                  className="group flex h-[20vw] w-[40vw] flex-col items-center justify-center px-2 lg:h-[6vw] lg:w-[20vw] lg:px-15"
                  onTouchStart={() => handleTap(service.id)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative mb-2"
                  >
                    <div
                      className={`flex h-[15vw] w-[15vw] items-center justify-center transition-all duration-300 group-hover:scale-110 md:h-[8vw] md:w-[8vw] lg:h-[3vw] lg:w-[3vw] ${
                        theme === "dark"
                          ? "text-carrot-500 group-hover:text-stone-600"
                          : "group-hover:text-crusta-500 text-stone-600"
                      } ${
                        tappedItem === service.id
                          ? "scale-110 " +
                            (theme === "dark"
                              ? "!text-stone-600"
                              : "!text-crusta-500")
                          : ""
                      }`}
                      style={{
                        maskImage: `url(${service.icon})`,
                        WebkitMaskImage: `url(${service.icon})`,
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        backgroundColor: "currentColor",
                      }}
                    />
                  </motion.div>

                  {/* title */}
                  <h3
                    className={`text-center text-xs font-semibold transition-all duration-300 group-hover:scale-105 sm:text-sm md:text-base ${
                      theme === "dark"
                        ? "group-hover:text-carrot-500 text-stone-600"
                        : "text-crusta-500 group-hover:text-stone-600"
                    } ${
                      tappedItem === service.id
                        ? "scale-105 " +
                          (theme === "dark"
                            ? "!text-carrot-500"
                            : "!text-stone-600")
                        : ""
                    }`}
                    style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                  >
                    {service.title}
                  </h3>
                </Link>

                {/* sidebar */}
                {index < array.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className={`h-[20vw] w-[1px] rounded-full md:block md:h-[15vw] lg:block lg:h-[5vw] ${
                      theme === "dark" ? "bg-stone-600/50" : "bg-stone-700/50"
                    }`}
                    style={{
                      boxShadow:
                        theme === "dark"
                          ? "0 0 8px rgba(255, 255, 255, 0.2)"
                          : "0 0 6px rgba(12, 12, 12, 0.7)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
