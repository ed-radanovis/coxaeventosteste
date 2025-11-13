"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function BackToFooterButton() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  const scrollToFooterWhenAvailable = (attempts = 0) => {
    const MAX_ATTEMPTS = 30;
    const el = document.getElementById("footer");

    if (el) {
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return true;
    }

    if (attempts >= MAX_ATTEMPTS) {
      window.location.hash = "#footer";
      return false;
    }

    setTimeout(() => scrollToFooterWhenAvailable(attempts + 1), 200);
    return false;
  };

  const handleBack = () => {
    setIsLeaving(true);

    setTimeout(() => {
      router.push("/#footer");
      scrollToFooterWhenAvailable(0);
    }, 250);
  };

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.div
        animate={isLeaving ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar a home
        </Button>
      </motion.div>
    </motion.div>
  );
}
