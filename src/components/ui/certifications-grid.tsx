"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function CertificationsGrid() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const certifications = [
    {
      id: 1,
      name: "Certificado ISO-20121",
      image: "/images/image_certifications_1.jpg",
      href: "https://www.iso.org/standard/86389.html",
      alt: "Logo da certificação ISO 20121.",
    },
    {
      id: 2,
      name: "Associação Brasileira de Empresas de Eventos - ABEOC BRASIL",
      image: "/images/image_certifications_2.jpg",
      href: "https://abeoc.org.br/",
      alt: "logo da certificação ABEOC BRASIL.",
    },
    {
      id: 3,
      name: "Certificação de Excelência de Gesteros de Eventos",
      image: "/images/image_certifications_3.jpg",
      href: "https://academiaeventosturismo.org.br/",
      alt: "logo da certificação C.E.G.E.",
    },
    {
      id: 4,
      name: "National Career Certification Board (NCCB)",
      image: "/images/image_certifications_4.jpg",
      href: "https://nccboard.org/",
      alt: "logo da certificação NCCB.",
    },
    {
      id: 5,
      name: "Certificado ISO 9001",
      image: "/images/image_certifications_5.jpg",
      href: "https://www.iso.org/standard/62085.html",
      alt: "logo da certificação ISO 9001",
    },
  ];

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <section className="border-t border-b bg-stone-100 py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-28">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-center">
                  <div className="h-16 w-16 rounded-sm bg-stone-300/20 md:h-24 md:w-24" />
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
      className={`border-t border-b pt-4 pb-6 transition-all duration-700 ${
        !mounted
          ? "border-stone-400 bg-stone-100 text-stone-950"
          : theme === "dark"
            ? "border-carrot-800 bg-stone-900 text-stone-100"
            : "border-stone-400 bg-stone-100 text-stone-950"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <motion.h4
          className="mb-4 text-center text-sm font-extralight tracking-wider italic md:text-base"
          style={{ fontFamily: "var(--font-charis-sil)" }}
          initial={{ opacity: 0, y: 60, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -60, rotateX: -90 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.2,
          }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span
            className={`${
              !mounted
                ? "text-cerise-700"
                : theme === "dark"
                  ? "text-carrot-400"
                  : "text-cerise-700"
            }`}
          >
            Nossas Certificações
          </span>
        </motion.h4>
        <div className="flex justify-center">
          <motion.div
            className="inline-flex gap-4 md:grid md:grid-cols-5 md:gap-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="flex items-center justify-center rounded-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={`rounded-sm border border-stone-900 ${
                    !mounted
                      ? "shadow-lg shadow-stone-950"
                      : theme === "dark"
                        ? "shadow-md shadow-stone-700 hover:shadow-lg"
                        : "border-none shadow-md shadow-stone-800 hover:shadow-lg"
                  }`}
                >
                  <Link
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* internal container */}
                    <div
                      className={`group flex h-12 w-12 items-center justify-center rounded-sm transition-all duration-300 md:h-24 md:w-24 ${
                        !mounted
                          ? "bg-stone-400"
                          : theme === "dark"
                            ? "bg-stone-200"
                            : "bg-stone-400"
                      }`}
                    >
                      <Image
                        src={cert.image}
                        alt={cert.alt}
                        width={80}
                        height={80}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
