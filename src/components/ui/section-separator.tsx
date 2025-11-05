"use client";

import { ArrowBigDownDash } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function SectionSeparator({
  href,
  nextSectionBg,
  initialBg = "bg-stone-300",
  className = "",
}: {
  href: string;
  nextSectionBg?: string;
  initialBg?: string;
  className?: string;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // replicate hover to tap on mobile
  const [isTapped, setIsTapped] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const backgroundClass = !mounted
    ? initialBg // use default value during SSR
    : (nextSectionBg ??
      (theme === "dark"
        ? "bg-stone-600/30 hover:bg-stone-500/30"
        : "bg-stone-300 hover:bg-stone-400/50"));

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // prevent default Link behavior
    const targetId = href.split("#")[1] ?? ""; // extract the ID
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          const targetPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          const duration = 1000;
          let start: number | null = null;

          const smoothScroll = (currentTime: number) => {
            start ??= currentTime;
            const progress = Math.min((currentTime - start) / duration, 1);
            window.scrollTo(
              0,
              startPosition + distance * easeInOutQuad(progress),
            );
            if (progress < 1) {
              requestAnimationFrame(smoothScroll);
            }
          };
          // easing function
          const easeInOutQuad = (t: number) =>
            t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          requestAnimationFrame(smoothScroll);
        }, 100); // Delay ms
      }
    }
  };

  // hover to tap
  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 300);
  };

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <div className="flex justify-center">
        <div
          className={`h-12 w-12 rounded-full transition-all duration-300 ease-in-out ${initialBg} ${className} flex items-center justify-center`}
        >
          <div className="graphic-link">
            <div>
              <ArrowBigDownDash className="text-carrot-500 h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className={`h-12 w-12 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 ${backgroundClass} ${className} flex items-center justify-center ${
          !mounted
            ? "shadow-sm shadow-stone-800 hover:shadow-md"
            : theme === "dark"
              ? "shadow-sm shadow-stone-300 hover:shadow-md hover:shadow-stone-400"
              : "shadow-sm shadow-stone-800 hover:shadow-md"
        } ${isTapped ? "scale-110 shadow-md" : ""}`}
        onTouchStart={handleTap}
      >
        <Link href={href} onClick={handleScroll} className="graphic-link">
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 1.15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ArrowBigDownDash
              className={`text-carrot-500 h-8 w-8 transition-transform duration-200 ${
                isTapped ? "scale-110" : ""
              }`}
            />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
