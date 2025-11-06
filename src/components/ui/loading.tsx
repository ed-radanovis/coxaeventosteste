"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-950 text-stone-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <Image
          src="/logo_EWD_apex.png"
          alt="Coxa Eventos"
          width={80}
          height={80}
          className="mb-4 rounded-full brightness-110"
        />
        <span
          className="text-lg tracking-wide text-stone-300"
          style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
        >
          Carregando experiências...
        </span>
      </motion.div>
      <motion.div className="mt-8 h-[2px] w-32 overflow-hidden rounded-full bg-stone-800">
        <motion.div
          className="h-full bg-yellow-400"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};
