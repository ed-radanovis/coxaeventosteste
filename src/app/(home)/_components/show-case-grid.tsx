"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const showcases = [
  {
    title: "Esportivo - futcamp NE1O ",
    image: "/images/image_services_grid_1.jpg",
    href: "/sporty-futcamp",
  },
  {
    title: "Evento - 1ª Expo Tricô",
    image: "/images/image_services_grid_2.jpg",
    href: "/knitting-exhibition",
  },
  {
    title: "Celebração - Posse OAB-MG",
    image: "/images/image_services_grid_3.jpg",
    href: "/OAB-celebration",
  },
  {
    title: "Festa Infantil - Rei Leão",
    image: "/images/image_services_grid_4.jpg",
    href: "/childrens-party-the-lion-king",
  },
];

export function ShowcaseGrid() {
  const { theme } = useTheme();

  return (
    <section
      id="show-case-grid"
      className={`relative flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-in-out ${
        theme === "dark" ? "bg-stone-900" : "bg-stone-100"
      }`}
    >
      {/* image grid */}
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-4 md:gap-0.5 md:px-0.5">
        {showcases.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="group relative block h-full w-full overflow-hidden"
          >
            {/* image */}
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.10]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-stone-950/80 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100" />

            {/* hover */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-6 opacity-30 transition-all duration-700 ease-in-out group-hover:scale-[1.05] group-hover:opacity-100">
              <Link
                href={item.href}
                className="text-carrot-400 hover:text-persian-800 text-4xl font-semibold italic transition-all duration-500 ease-in-out hover:scale-[.95]"
                style={{ fontFamily: "var(--font-charis-sil)" }}
              >
                Ver vitrine
              </Link>
              <p
                className="text-lg text-stone-100 transition-all duration-500 ease-in-out hover:scale-[.98]"
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
