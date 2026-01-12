"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionSeparator } from "@/components/ui/section-separator";
import { WandSparkles } from "lucide-react";

interface HeroVideo {
  src: string;
  position: string;
}

export function Hero() {
  const { theme } = useTheme();
  const [, setMounted] = useState(false);
  const [isButtonTapped, setIsButtonTapped] = useState(false);
  const [tappedSocial, setTappedSocial] = useState<string | null>(null);

  const videos: HeroVideo[] = [
    { src: "/videos/hero/video_hero_1.mp4", position: "object-[center_46%]" },
    { src: "/videos/hero/video_hero_2.mp4", position: "object-[center_42%]" },
    { src: "/videos/hero/video_hero_3.mp4", position: "object-[center_45%]" },
    { src: "/videos/hero/video_hero_4.mp4", position: "object-[center_45%]" },
  ];

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 12500);
    return () => clearInterval(interval);
  }, [videos.length]);

  // replicate hover to tap on mobile
  const handleButtonTap = () => {
    setIsButtonTapped(true);
    setTimeout(() => setIsButtonTapped(false), 300);
  };

  const handleSocialTap = (social: string) => {
    setTappedSocial(social);
    setTimeout(() => setTappedSocial(null), 300);
  };

  return (
    <section className="relative flex min-h-screen items-center justify-start overflow-hidden pt-20 md:pt-16">
      {/* background videos */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <AnimatePresence mode="wait">
          {videos[index] && (
            <motion.video
              key={videos[index].src}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 h-full w-full object-cover ${videos[index].position}`}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.2 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <source src={videos[index].src} type="video/mp4" />
            </motion.video>
          )}
        </AnimatePresence>
      </div>

      {/* overlay */}
      <div
        className={`absolute inset-0 z-[1] transition-colors duration-700 ${
          theme === "dark"
            ? "bg-gradient-to-r from-stone-950/70 via-stone-950/35 to-transparent"
            : "bg-gradient-to-r from-stone-300/30 via-stone-300/10 to-transparent"
        }`}
      />

      {/* cinematography */}
      <div className="relative z-10 flex w-full flex-col items-start justify-center px-2 text-left md:px-16 lg:px-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex items-start gap-6"
          >
            {/* sidebar */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="shadow-[0_0_10px_rgba(255, 255, 255, 0.1)] bg-persian-500 mt-0 w-[1.5px] origin-top rounded-full md:mt-24"
              style={{ height: "220px" }}
            >
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
                className="h-full w-full rounded-full bg-stone-100"
              />
            </motion.div>
            {/* main text */}
            <div className="md:mt-16">
              {/* main title */}
              <h1 className="text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
                <span
                  className="text-crusta-500 block font-[700] italic brightness-200"
                  style={{
                    fontFamily: "var(--font-charis-sil)",
                  }}
                >
                  Inovação
                </span>
                <span
                  className="text-crusta-500 block font-[700] italic brightness-150"
                  style={{
                    fontFamily: "var(--font-charis-sil)",
                  }}
                >
                  Tecnologia
                </span>
                <div className="inline-flex gap-4">
                  <span
                    className="text-carrot-100 block font-[700] italic"
                    style={{
                      fontFamily: "var(--font-charis-sil)",
                    }}
                  >
                    &
                  </span>
                  <span
                    className="text-crusta-500 block font-[700] italic brightness-200"
                    style={{
                      fontFamily: "var(--font-charis-sil)",
                    }}
                  >
                    Criatividade
                  </span>
                </div>
                <span
                  className="text-cerise-500 text:lg mt-6 block font-[600] brightness-150 md:text-5xl"
                  style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                >
                  EM EVENTOS
                </span>
              </h1>

              {/* subtitle */}
              <p
                className="mt-10 max-w-7xl px-0 text-xl font-semibold text-stone-100 md:mt-4 md:text-justify md:text-2xl md:tracking-wider lg:text-3xl"
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                Traga vida a sua marca, sua festa, <br />
                confraternização ou treinamento, <br />
                através de eventos inesquecíveis !
              </p>

              {/* CTA button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  onTouchStart={handleButtonTap}
                  className={`bg-cerise-600 text-cerise-100 hover:bg-cerise-600/80 mx-auto mt-16 flex w-full justify-center rounded-sm p-2 text-lg font-semibold transition-all duration-300 ease-in-out active:scale-98 md:mx-0 md:mt-8 md:w-1/2 md:px-8 md:py-4 ${
                    theme === "dark"
                      ? "shadow-sm shadow-stone-500/50 hover:shadow-md"
                      : "shadow-md shadow-stone-800 hover:shadow-lg"
                  } ${
                    isButtonTapped
                      ? "!bg-cerise-600/80 !scale-102 shadow-md"
                      : ""
                  }`}
                  style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
                >
                  <Link href="/">
                    <WandSparkles className="h-5 w-5" />
                    Descubra nossa magia
                  </Link>
                </Button>
              </motion.div>

              {/* social icons */}
              <div className="mt-16 flex items-center justify-center gap-4 md:mt-10 md:justify-normal">
                <Link
                  href="https://www.instagram.com/coxaeventos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group"
                  onTouchStart={() => handleSocialTap("instagram")}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-90 ${
                      theme === "dark" ? "bg-stone-700" : "bg-stone-800"
                    } text-stone-100 ${
                      tappedSocial === "instagram"
                        ? "scale-110 !bg-gradient-to-br !from-purple-600 !via-pink-600 !to-yellow-300"
                        : "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                    }`}
                  >
                    <FaInstagram
                      className={`transition-all duration-300 ${
                        tappedSocial === "instagram"
                          ? "scale-130"
                          : "group-hover:scale-130"
                      }`}
                    />
                  </span>
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCwq1ziBmTvKjfabL3eyhowQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="group"
                  onTouchStart={() => handleSocialTap("youtube")}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-90 ${
                      theme === "dark" ? "bg-stone-700" : "bg-stone-800"
                    } text-stone-100 ${
                      tappedSocial === "youtube"
                        ? "scale-110 !bg-red-600"
                        : "hover:bg-red-600"
                    }`}
                  >
                    <FaYoutube
                      className={`transition-all duration-300 ${
                        tappedSocial === "youtube"
                          ? "scale-130"
                          : "group-hover:scale-130"
                      }`}
                    />
                  </span>
                </Link>
                <Link
                  href="https://www.facebook.com/musico.coxa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group"
                  onTouchStart={() => handleSocialTap("facebook")}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-90 ${
                      theme === "dark" ? "bg-stone-700" : "bg-stone-800"
                    } text-stone-100 ${
                      tappedSocial === "facebook"
                        ? "scale-110 !bg-blue-600"
                        : "hover:bg-blue-600"
                    }`}
                  >
                    <FaFacebook
                      className={`transition-all duration-300 ${
                        tappedSocial === "facebook"
                          ? "scale-130"
                          : "group-hover:scale-130"
                      }`}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
        <SectionSeparator
          href="/#about"
          initialBg="bg-stone-300"
          className="bg-stone-300/20"
        />
      </div>
    </section>
  );
}
