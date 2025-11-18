"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

export function BackToFooterButton() {
  const router = useRouter();
  const { theme } = useTheme();
  const [tappedElement, setTappedElement] = useState<string | null>(null);

  const handleTap = (id: string, duration = 200) => {
    setTappedElement(id);
    setTimeout(() => setTappedElement(null), duration);
  };

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
    handleTap("back-footer");
    setTimeout(() => {
      router.push("/#footer");
      scrollToFooterWhenAvailable(0);
    }, 250);
  };

  return (
    <Button
      size="sm"
      onClick={handleBack}
      onTouchStart={() => handleTap("back-footer")}
      className={`flex items-center gap-2 border transition-all duration-300 ease-in-out ${
        tappedElement === "back-footer"
          ? "scale-98"
          : theme === "dark"
            ? "bg-stone-600/60 text-stone-400 hover:scale-102 hover:bg-stone-600"
            : "border-stone-400 bg-stone-100/80 text-stone-500 hover:scale-102 hover:bg-stone-100"
      }`}
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar a home
    </Button>
  );
}
