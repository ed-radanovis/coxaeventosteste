"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ClientsCarousel() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tappedLogo, setTappedLogo] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const companies = [
    {
      id: 1,
      name: "Hotel Guarany",
      logo: "/images/image_clients_carousel_1.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 2,
      name: "CBF",
      logo: "/images/image_clients_carousel_2.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 3,
      name: "Oscar Inn Eco Resort",
      logo: "/images/image_clients_carousel_3.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 4,
      name: "FPF",
      logo: "/images/image_clients_carousel_4.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 5,
      name: "Monte Real Centro de Convenções",
      logo: "/images/image_clients_carousel_5.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 6,
      name: "OAB - Minas Gerais",
      logo: "/images/image_clients_carousel_6.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 7,
      name: "SINTHORESCA",
      logo: "/images/image_clients_carousel_7.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 8,
      name: "Prefeitura de Águas de Lindóia",
      logo: "/images/image_clients_carousel_8.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 9,
      name: "Chic Chopp",
      logo: "/images/image_clients_carousel_9.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
    {
      id: 10,
      name: "Prefeitura de Monte Sião",
      logo: "/images/image_clients_carousel_10.jpg",
      invert: false,
      size: "w-[40vw] md:w-[12vw]",
    },
  ];

  // replicate hover to tap
  const handleTap = (id: number) => {
    setTappedLogo(id);
    setTimeout(() => setTappedLogo(null), 3500);
  };

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section className="border-t bg-stone-200 py-4 text-stone-950 transition-all duration-700 md:pt-4 md:pb-6">
        <div className="container mx-0 max-w-full px-0">
          <div className="mb-4 text-center">
            <div className="h-6 bg-stone-300/20" />
          </div>
          <div className="relative overflow-hidden">
            {/* carousel skeleton */}
            <div className="flex items-center">
              {companies.map((_, index) => (
                <div key={index} className="flex shrink-0 items-center">
                  <div className="flex h-[20vw] w-[40vw] items-center justify-center px-2 md:h-[15vw] md:w-[20vw]">
                    <div className="h-[20vw] w-[40vw] rounded-sm bg-stone-300/20 md:h-[8vw] md:w-[12vw]" />
                  </div>
                  {index < companies.length - 1 && (
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
      className={`border-t py-4 transition-all duration-700 md:pt-4 md:pb-6 ${
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
            Clientes que já se Encantaram com nossa Magia.
          </span>
        </motion.h4>

        {/* carousel */}
        <div className="relative overflow-hidden">
          <div className="animate-marquee flex w-max">
            {[...companies, ...companies].map((company, index, array) => (
              <div
                key={`${company.id}-${index}`}
                className="flex shrink-0 items-center"
              >
                {/* logo container */}
                <div
                  className="group flex h-[20vw] w-[40vw] items-center justify-center px-2 md:h-[10vw] md:w-[20vw] md:px-20"
                  onTouchStart={() => handleTap(company.id)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <Image
                      src={company.logo}
                      alt={`Logo ${company.name}`}
                      width={100}
                      height={60}
                      className={`scale-60 object-contain transition-all duration-300 md:scale-80 ${
                        company.invert
                          ? "grayscale invert group-hover:grayscale-0 group-hover:invert-0"
                          : "grayscale group-hover:grayscale-0"
                      } ${
                        tappedLogo === company.id ? "grayscale-0" : ""
                      } ${company.size}`}
                    />
                  </motion.div>
                </div>

                {/* sidebar */}
                {index < array.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className={`h-[20vw] w-[1px] rounded-full md:block md:h-[10vw] ${
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
