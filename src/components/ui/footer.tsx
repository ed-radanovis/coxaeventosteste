"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import Image from "next/image";
import { SquareMousePointer, X } from "lucide-react";

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const [showEwdModal, setShowEwdModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleElementTap = (elementId: string) => {
    setTappedElement(elementId);
    setTimeout(() => setTappedElement(null), 500);
  };

  const handleEwdClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEwdModal(true);
  };

  const closeEwdModal = () => {
    setShowEwdModal(false);
  };

  // during SSR, render a skeleton
  if (!mounted) {
    return (
      <footer className="bg-stone-200 py-8">
        <div className="container mx-0 px-6 md:px-1">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="h-20 rounded-sm bg-stone-300/20" />
            <div className="h-20 rounded-sm bg-stone-300/20" />
            <div className="h-20 rounded-sm bg-stone-300/20" />
            <div className="h-20 rounded-sm bg-stone-300/20" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      {/* EWD modal */}
      <AnimatePresence>
        {showEwdModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm"
            onClick={closeEwdModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative mx-4 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* close button */}
              <button
                onClick={closeEwdModal}
                className="absolute -top-12 right-0 z-10 rounded-full bg-stone-100/10 p-3 text-stone-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-stone-100/20 md:p-2"
              >
                <X className="h-6 w-6" />
              </button>

              {/* content container */}
              <div
                className="relative w-full overflow-hidden rounded-lg bg-stone-950"
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                {/* Header */}
                <div className="border-b border-stone-700 bg-stone-800/50 p-4">
                  <h3
                    className="text-carrot-400 text-center text-lg font-semibold"
                    style={{ fontFamily: "var(--font-charis-sil)" }}
                  >
                    EWD APEX - Desenvolvimento Web
                  </h3>
                </div>

                {/* logo image */}
                <div className="flex items-center justify-center bg-black p-8">
                  <Image
                    src="/logo_EWD_apex.png"
                    alt="EWD APEX"
                    width={200}
                    height={200}
                    className={`rounded-full grayscale-0 transition-all duration-500 ease-in-out hover:scale-120 ${
                      tappedElement === "ewd-modal-logo" ? "scale-120" : ""
                    }`}
                    onTouchStart={() => handleElementTap("ewd-modal-logo")}
                  />
                </div>

                {/* description */}
                <div className="border-t border-stone-700 bg-stone-800/50 p-4 text-justify">
                  <p className="mb-3 text-sm text-stone-300">
                    Especialistas em desenvolvimento web moderno, com soluções
                    robustas escaláveis e centradas no usuário. Criamos
                    experiências digitais excepcionais com as mais recentes
                    tecnologias, design funcional com foco em SEO , usabilidade
                    e acessibilidade.
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-carrot-400 font-semibold">
                        Frontend:
                      </span>
                      <span className="text-stone-400">JS, React, Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-carrot-400 font-semibold">
                        Backend:
                      </span>
                      <span className="text-stone-400">
                        Node.js, NPM, Clerk, Stripe
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-carrot-400 font-semibold">
                        Database:
                      </span>
                      <span className="text-stone-400">
                        PostgreSQL, MySQL, MongoDB
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-carrot-400 font-semibold">
                        Design:
                      </span>
                      <span className="text-stone-400">UI/UX, Figma, PS</span>
                    </div>
                  </div>
                </div>

                {/* footer with external link */}
                <div className="group border-t border-stone-700 bg-stone-800/50 p-4">
                  <Link
                    href="https://edwebdev.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group-hover:text-carrot-400 inline-flex items-center gap-2 text-sm text-stone-300 transition-all"
                  >
                    <SquareMousePointer className="text-carrot-400 h-5 w-5 transition-all group-hover:text-stone-300" />
                    Visite nosso site
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer
        id="footer"
        className={`flex justify-center py-8 transition-all duration-700 md:py-9 ${
          !mounted
            ? "bg-stone-200 text-stone-950"
            : theme === "dark"
              ? "bg-stone-900 text-stone-100"
              : "bg-stone-200 text-stone-950"
        }`}
      >
        <div className="container mx-0 px-6 md:px-1">
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* social icons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col items-center space-y-4 md:justify-center"
            >
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Link
                    href="https://www.instagram.com/coxaeventos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group"
                    onTouchStart={() => handleElementTap("instagram")}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-95 ${
                        tappedElement === "instagram"
                          ? "scale-105 bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-300 text-stone-100"
                          : theme === "dark"
                            ? "bg-stone-600 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                            : "bg-stone-700 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                      }`}
                    >
                      <FaInstagram
                        className={`transition-all duration-300 ${
                          tappedElement === "instagram"
                            ? "scale-105"
                            : "group-hover:scale-105"
                        }`}
                      />
                    </span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Link
                    href="https://www.youtube.com/channel/UCwq1ziBmTvKjfabL3eyhowQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="group"
                    onTouchStart={() => handleElementTap("youtube")}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-95 ${
                        tappedElement === "youtube"
                          ? "scale-105 bg-red-600 text-stone-100"
                          : theme === "dark"
                            ? "bg-stone-600 text-stone-100 hover:bg-red-600"
                            : "bg-stone-700 text-stone-100 hover:bg-red-600"
                      }`}
                    >
                      <FaYoutube
                        className={`transition-all duration-300 ${
                          tappedElement === "youtube"
                            ? "scale-105"
                            : "group-hover:scale-105"
                        }`}
                      />
                    </span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Link
                    href="https://www.facebook.com/musico.coxa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="group"
                    onTouchStart={() => handleElementTap("facebook")}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-95 ${
                        tappedElement === "facebook"
                          ? "scale-105 bg-blue-600 text-stone-100"
                          : theme === "dark"
                            ? "bg-stone-600 text-stone-100 hover:bg-blue-600"
                            : "bg-stone-700 text-stone-100 hover:bg-blue-600"
                      }`}
                    >
                      <FaFacebook
                        className={`transition-all duration-300 ${
                          tappedElement === "facebook"
                            ? "scale-105"
                            : "group-hover:scale-105"
                        }`}
                      />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            {/* contact */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="px-10 text-center italic md:text-left"
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              <p
                className={`bold group mb-3 inline-flex w-fit items-center gap-4 text-sm tracking-normal transition-all duration-300 ease-in-out active:scale-98 md:mb-1 ${
                  tappedElement === "phone"
                    ? `scale-98 ${
                        theme === "dark" ? "text-stone-400" : "text-stone-800"
                      }`
                    : `text-stone-600 hover:scale-105 ${
                        theme === "dark"
                          ? "hover:text-stone-400"
                          : "hover:text-stone-800"
                      }`
                }`}
                onTouchStart={() => handleElementTap("phone")}
              >
                <FaWhatsapp
                  className={`h-5 w-5 transition-all duration-300 ${
                    tappedElement === "phone"
                      ? `scale-98 ${
                          theme === "dark"
                            ? "text-green-400 brightness-70"
                            : "text-green-600 brightness-70"
                        }`
                      : `text-stone-600 group-hover:scale-110 ${
                          theme === "dark"
                            ? "brightness-70 group-hover:text-green-400"
                            : "brightness-70 group-hover:text-green-600"
                        }`
                  }`}
                />
                <Link
                  href="https://wa.me/5519982557489?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Coxa%20Eventos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +55 (19) 9 8255-7489
                </Link>
              </p>
              <p
                className={`bold group mb-6 inline-flex w-fit items-center gap-4 text-sm tracking-normal transition-all duration-300 ease-in-out active:scale-98 ${
                  tappedElement === "phone"
                    ? `scale-98 ${
                        theme === "dark" ? "text-stone-400" : "text-stone-800"
                      }`
                    : `text-stone-600 hover:scale-105 ${
                        theme === "dark"
                          ? "hover:text-stone-400"
                          : "hover:text-stone-800"
                      }`
                }`}
                onTouchStart={() => handleElementTap("phone")}
              >
                <FaWhatsapp
                  className={`h-5 w-5 transition-all duration-300 ${
                    tappedElement === "phone"
                      ? `scale-98 ${
                          theme === "dark"
                            ? "text-green-400 brightness-70"
                            : "text-green-600 brightness-70"
                        }`
                      : `text-stone-600 group-hover:scale-110 ${
                          theme === "dark"
                            ? "brightness-70 group-hover:text-green-400"
                            : "brightness-70 group-hover:text-green-600"
                        }`
                  }`}
                />
                <Link
                  href="https://wa.me/5519981989757?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Coxa%20Eventos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +55 (19) 9 8198-9757
                </Link>
              </p>
              <p
                className={`group inline-flex w-fit items-center gap-4 text-sm tracking-wider transition-all duration-500 ease-in-out active:scale-98 ${
                  tappedElement === "email"
                    ? `scale-98 ${
                        theme === "dark" ? "text-stone-400" : "text-stone-800"
                      }`
                    : `text-stone-600 hover:scale-105 ${
                        theme === "dark"
                          ? "hover:text-stone-400"
                          : "hover:text-stone-800"
                      }`
                }`}
                onTouchStart={() => handleElementTap("email")}
              >
                <FaEnvelope
                  className={`h-5 w-5 transition-all duration-300 ${
                    tappedElement === "email"
                      ? `scale-98 ${
                          theme === "dark"
                            ? "text-blue-600 brightness-70"
                            : "text-blue-800 brightness-50"
                        }`
                      : `text-stone-500 group-hover:scale-110 ${
                          theme === "dark"
                            ? "brightness-70 group-hover:text-blue-600"
                            : "brightness-50 group-hover:text-blue-800"
                        }`
                  }`}
                />
                <Link href="mailto:eventos.coxa@gmail.com?subject=Contato%20Coxa%20Eventos&body=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços!">
                  eventos.coxa@gmail.com
                </Link>
              </p>
            </motion.div>
            {/* address */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
              className={`text-center md:text-left md:font-medium md:whitespace-nowrap ${
                !mounted
                  ? "text-stone-700"
                  : theme === "dark"
                    ? "text-stone-500"
                    : "text-stone-700"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              <p className="text-xs tracking-wide md:text-sm md:whitespace-nowrap">
                Coxa Eventos Ltda&nbsp; | &nbsp;Águas de Lindóia&nbsp; |
                &nbsp;SP&nbsp; | &nbsp;Brasil
              </p>
            </motion.div>
            {/* copyright - links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className={`space-y-6 text-center md:pr-10 md:text-left ${
                !mounted
                  ? "text-stone-800"
                  : theme === "dark"
                    ? "text-stone-600"
                    : "text-stone-800"
              }`}
              style={{ fontFamily: "var(--font-charis-sil)" }}
            >
              <div className="text-xs md:text-sm md:whitespace-nowrap">
                <span
                  className={`copyright-year tracking-normal italic md:tracking-wider ${
                    !mounted
                      ? "text-crusta-400"
                      : theme === "dark"
                        ? "text-cerise-600"
                        : "text-crusta-400"
                  }`}
                  style={{ fontFamily: "var(--font-charis-sil)" }}
                >
                  © {new Date().getFullYear()}&nbsp;Todos os Direitos
                  Reservados
                </span>
                <span style={{ fontFamily: "var(--font-ibm-plex-sans)" }}>
                  {" "}
                  &nbsp;|&nbsp; Coxa Eventos Ltda.
                </span>
              </div>

              <div
                className="flex justify-start gap-2 text-xs md:flex md:flex-nowrap md:justify-start"
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                <Link
                  href=""
                  className={`transition-all duration-300 ease-in-out active:scale-98 md:whitespace-nowrap ${
                    tappedElement === "privacy"
                      ? theme === "dark"
                        ? "text-cerise-600 scale-98"
                        : "text-crusta-400 scale-98"
                      : theme === "dark"
                        ? "hover:text-cerise-600 text-stone-500 hover:scale-105"
                        : "hover:text-crusta-400 text-stone-600 hover:scale-105"
                  }`}
                  onTouchStart={() => handleElementTap("privacy")}
                >
                  Política de Privacidade
                </Link>
                <span
                  className={`text-2xl md:text-xs ${
                    theme === "dark" ? "text-stone-400" : "text-stone-700"
                  }`}
                >
                  |
                </span>
                <Link
                  href=""
                  className={`transition-all duration-300 ease-in-out active:scale-98 md:whitespace-nowrap ${
                    tappedElement === "cookies"
                      ? theme === "dark"
                        ? "text-cerise-600 scale-98"
                        : "text-crusta-400 scale-98"
                      : theme === "dark"
                        ? "hover:text-cerise-600 text-stone-500 hover:scale-105"
                        : "hover:text-crusta-400 text-stone-600 hover:scale-105"
                  }`}
                  onTouchStart={() => handleElementTap("cookies")}
                >
                  Política de Cookies
                </Link>
                <span
                  className={`text-2xl md:text-xs ${
                    theme === "dark" ? "text-stone-400" : "text-stone-700"
                  }`}
                >
                  |
                </span>
                <Link
                  href=""
                  className={`transition-all duration-300 ease-in-out active:scale-98 md:whitespace-nowrap ${
                    tappedElement === "quality"
                      ? theme === "dark"
                        ? "text-cerise-600 scale-98"
                        : "text-crusta-400 scale-98"
                      : theme === "dark"
                        ? "hover:text-cerise-600 text-stone-500 hover:scale-105"
                        : "hover:text-crusta-400 text-stone-600 hover:scale-105"
                  }`}
                  onTouchStart={() => handleElementTap("quality")}
                >
                  Política de Qualidade
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
      {/* EWD APEX signature */}
      <motion.footer
        className={`overflow-x-hidden py-2 transition-all duration-500 md:overflow-visible md:py-1.5 ${
          theme === "dark"
            ? "bg-stone-900 text-stone-400 brightness-90"
            : "bg-stone-200 text-stone-900 brightness-95"
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{
          once: false,
          amount: 0.1,
        }}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-4">
            <motion.div
              className="inline-flex items-center gap-6 md:flex md:flex-row md:gap-4"
              initial={{ opacity: 1, x: -100 }}
              whileInView={{
                x:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 0
                    : [-100, 50, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.6, 1],
                ease: "easeInOut",
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
            >
              <button
                onClick={handleEwdClick}
                className="group inline-flex cursor-pointer touch-manipulation items-center gap-4 transition-all duration-100 ease-in-out hover:scale-103"
              >
                <Image
                  src="/logo_EWD_apex.png"
                  alt="EWD APEX"
                  width={40}
                  height={40}
                  className={`rounded-full grayscale transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:grayscale-0 ${
                    tappedElement === "ewd-group"
                      ? theme === "dark"
                        ? "scale-110 bg-stone-950/95 grayscale-0"
                        : "scale-110 bg-stone-950/95 grayscale-0"
                      : theme === "dark"
                        ? "bg-stone-950/95 opacity-60 group-hover:opacity-100"
                        : "bg-stone-950/95 opacity-90 group-hover:opacity-100"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-all duration-300 ease-in-out md:text-sm ${
                    tappedElement === "ewd-group"
                      ? theme === "dark"
                        ? "scale-103 text-stone-400"
                        : "scale-103 text-stone-600"
                      : theme === "dark"
                        ? "text-stone-400/30 group-hover:scale-103 group-hover:text-stone-400"
                        : "text-stone-600/50 group-hover:scale-103 group-hover:text-stone-600"
                  }`}
                  style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                >
                  Desenvolvido por EWD APEX - &copy; {new Date().getFullYear()}
                </span>
              </button>
            </motion.div>

            {/* contact */}
            <motion.div
              className="inline-flex items-center gap-6 md:flex-row"
              initial={{ opacity: 1, x: 100 }}
              whileInView={{
                x:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 0
                    : [100, -50, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.6, 1],
                ease: "easeInOut",
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
            >
              <p
                className={`group inline-flex w-fit items-center gap-2 text-xs tracking-tighter transition-all duration-500 ease-in-out md:text-sm md:tracking-normal ${
                  tappedElement === "ewd-whatsapp"
                    ? theme === "dark"
                      ? "scale-103 text-stone-400"
                      : "scale-103 text-stone-600"
                    : theme === "dark"
                      ? "text-stone-400/30 hover:scale-103 hover:text-stone-400"
                      : "text-stone-600/70 hover:scale-103 hover:text-stone-600"
                }`}
                onTouchStart={() => handleElementTap("ewd-whatsapp")}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                <FaWhatsapp
                  className={`h-4 w-4 transition-all duration-500 ease-in-out ${
                    tappedElement === "ewd-whatsapp"
                      ? `scale-103 ${
                          theme === "dark" ? "text-green-400" : "text-green-600"
                        }`
                      : `text-stone-600 group-hover:scale-103 ${
                          theme === "dark"
                            ? "group-hover:text-green-400"
                            : "group-hover:text-green-600"
                        }`
                  }`}
                />
                <Link
                  href="https://wa.me/5535984256707?text=Olá%20!%20%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20e%20serviços%20da%20EWD%20Apex%20!%20 %20Pode%20me%20ajudar%20?"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +55 (35) 9 8425-6707
                </Link>
              </p>

              <p
                className={`group inline-flex w-fit items-center gap-2 text-xs tracking-tighter transition-all duration-500 ease-in-out md:text-sm md:tracking-wider ${
                  tappedElement === "ewd-email"
                    ? theme === "dark"
                      ? "scale-103 text-stone-400"
                      : "scale-103 text-stone-600"
                    : theme === "dark"
                      ? "text-stone-400/30 hover:scale-103 hover:text-stone-400"
                      : "text-stone-600/70 hover:scale-103 hover:text-stone-600"
                }`}
                onTouchStart={() => handleElementTap("ewd-email")}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                <FaEnvelope
                  className={`h-4 w-4 transition-all duration-500 ease-in-out ${
                    tappedElement === "ewd-email"
                      ? `scale-103 ${
                          theme === "dark" ? "text-blue-600" : "text-blue-800"
                        }`
                      : `text-stone-600 group-hover:scale-103 ${
                          theme === "dark"
                            ? "group-hover:text-blue-600"
                            : "group-hover:text-blue-800"
                        }`
                  }`}
                />
                <Link href="mailto:edradanovis@gmail.com?subject=Contato%20EWD%20Apex&body=Olá,%20gostaria%20de%20saber%20mais%20sobre%20nossos%20serviços!">
                  edradanovis@gmail.com
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
