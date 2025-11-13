"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-stone-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <div className="mb-4 h-36 w-36 md:h-50 md:w-50">
          <Image
            src="/logo_EWD_apex.png"
            alt="Coxa Eventos"
            width={200}
            height={200}
            className="h-full w-full rounded-full object-cover brightness-110"
          />
        </div>
        <span
          className="text-sm tracking-wide text-stone-300 md:text-base"
          style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
        >
          Loading your
        </span>
        <span
          className="text-sm tracking-wide text-stone-300 md:text-base"
          style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
        >
          digital experience ...{" "}
        </span>
      </motion.div>
      <motion.div className="mt-8 h-[2px] w-32 overflow-hidden rounded-full bg-stone-800">
        <motion.div
          className="h-full bg-amber-500"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};
