"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionSeparator } from "@/components/ui/section-separator";
import Link from "next/link";

const items = [
  {
    title: "Reuniões e Conferências",
    icon: "/icons/icon_conference.png",
    href: "/",
  },
  {
    title: "Congressos",
    icon: "/icons/icon_congress.png",
    href: "/",
  },
  {
    title: "Exposições",
    icon: "/icons/icon_exhibition.png",
    href: "/",
  },
  {
    title: "Feiras Comerciais",
    icon: "/icons/icon_business_fair2.png",
    href: "/",
  },
  {
    title: "Lançamentos de Produtos",
    icon: "/icons/icon_launch_product.png",
    href: "/",
  },
  {
    title: "Eventos Esportivos",
    icon: "/icons/icon_sporting_events.png",
    href: "/",
  },
  {
    title: "Casamentos",
    icon: "/icons/icon_wedding.png",
    href: "/",
  },
  {
    title: "Shows Musicais",
    icon: "/icons/icon_music_show.png",
    href: "/",
  },
  {
    title: "Cinema",
    icon: "/icons/icon_cinema.png",
    href: "/",
  },
  {
    title: "Celebrações",
    icon: "/icons/icon_celebrations.png",
    href: "/",
  },
];

export function ServicesGrid() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tappedItem, setTappedItem] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  const handleItemTap = (index: number) => {
    setTappedItem(index);
    setTimeout(() => setTappedItem(null), 300);
  };

  // during SSR, render a skeleton
  if (!mounted) {
    return (
      <section
        id="services-grid"
        className="relative flex flex-col items-center justify-center overflow-hidden bg-stone-100 pb-2 text-stone-950 md:h-screen md:pb-0"
      >
        <div className="container mx-auto mb-20 grid max-w-7xl grid-cols-2 gap-x-10 gap-y-10 px-6 pt-28 sm:grid-cols-3 md:mb-0 md:gap-y-32 md:pt-0 lg:grid-cols-5">
          {items.map((_, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 h-28 w-28 bg-stone-300/20" />
              <div className="h-6 w-24 bg-stone-300/20" />
            </div>
          ))}
        </div>
        <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform">
          <SectionSeparator
            href="/#main-testimonial"
            initialBg="bg-stone-300"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="services-grid"
      className={`relative flex flex-col items-center justify-center overflow-hidden pb-2 transition-all duration-700 md:h-screen md:pb-0 ${
        theme === "dark"
          ? "bg-stone-900 text-stone-100"
          : "bg-stone-100 text-stone-950"
      }`}
    >
      {/* icon grid */}
      <div className="container mx-auto mb-20 grid max-w-7xl grid-cols-2 gap-x-10 gap-y-10 px-6 pt-28 sm:grid-cols-3 md:mb-0 md:gap-y-32 md:pt-0 lg:grid-cols-5">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: index * 0.05,
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="group flex flex-col items-center text-center"
          >
            {/* mask-image */}
            <Link
              href={item.href}
              className="flex flex-col items-center text-center"
              onTouchStart={() => handleItemTap(index)}
            >
              <div
                className={`relative mb-4 flex h-28 w-28 items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                  theme === "dark"
                    ? "text-carrot-500 group-hover:text-stone-600"
                    : "group-hover:text-crusta-500 text-stone-600"
                } ${
                  tappedItem === index
                    ? "scale-110 " +
                      (theme === "dark"
                        ? "!text-stone-600"
                        : "!text-crusta-500")
                    : ""
                }`}
                style={{
                  maskImage: `url(${item.icon})`,
                  WebkitMaskImage: `url(${item.icon})`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  backgroundColor: "currentColor",
                }}
              />

              {/* title */}
              <h3
                className={`text-md font-semibold transition-all duration-500 group-hover:scale-[1.08] ${
                  theme === "dark"
                    ? "group-hover:text-carrot-500 text-stone-600"
                    : "text-crusta-500 group-hover:text-stone-600"
                } ${
                  tappedItem === index
                    ? "scale-[1.08] " +
                      (theme === "dark"
                        ? "!text-carrot-500"
                        : "!text-stone-600")
                    : ""
                }`}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                {item.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator href="/#main-testimonial" initialBg="bg-stone-300" />
      </div>
    </section>
  );
}
