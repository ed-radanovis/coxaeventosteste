"use client";

import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface ClientUserButtonProps {
  onNavigate?: () => void;
}

export function ClientUserButton({ onNavigate }: ClientUserButtonProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const userBtnWrapRef = useRef<HTMLDivElement | null>(null);

  const handleElementTap = (elementId: string) => {
    setTappedElement(elementId);
    setTimeout(() => setTappedElement(null), 500);
  };

  const handleMainClick = () => {
    if (onNavigate) {
      onNavigate();
    }
    router.push("/client");
  };

  // trigger UserButton in the wrapper
  const handleUserButtonClick = (e: React.MouseEvent | React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".cl-userButton-root")) return;

    const root = userBtnWrapRef.current;
    if (!root) return;
    const btn = root.querySelector<HTMLButtonElement>("button");
    if (btn) btn.click();
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Button
        onClick={handleMainClick}
        onTouchStart={() => handleElementTap("client-access-navbar")}
        className={`flex w-2/3 items-center rounded-sm border text-sm shadow-md transition-all duration-200 ease-in-out ${
          tappedElement === "client-access-navbar"
            ? "border-crusta-500 text-crusta-400 scale-[1.02] bg-stone-950/30 shadow-lg active:scale-[.98]"
            : theme === "dark"
              ? "bg-carrot-500/30 hover:border-carrot-500 hover:text-carrot-400 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
              : "bg-crusta-500/30 hover:border-crusta-500 hover:text-crusta-400 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
        }`}
        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
      >
        Voltar para Área do Cliente
        <ArrowRight className="h-4 w-4" />
      </Button>
      <div
        ref={userBtnWrapRef}
        role="button"
        tabIndex={0}
        onClick={handleUserButtonClick}
        onTouchStart={handleUserButtonClick}
        className={`flex w-1/3 cursor-pointer items-center justify-center rounded-sm border text-base shadow-md transition-all duration-200 ease-in-out select-none active:scale-[.98] md:h-full ${
          tappedElement === "user-button"
            ? "border-crusta-500 text-crusta-400 scale-[1.02] bg-stone-950/30 shadow-lg active:scale-[.98]"
            : theme === "dark"
              ? "bg-carrot-500/30 hover:border-carrot-500 hover:text-carrot-400 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
              : "hover:border-crusta-500 hover:text-crusta-400 bg-crusta-500/30 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
        }`}
      >
        <UserButton
          showName
          appearance={{
            elements: {
              avatarBox: "w-4 h-4 md:w-8 md:h-8",
              userButtonBox:
                "flex flex-col-reverse items-center text-muted-foreground w-full h-full justify-center",
              userButtonOuterIdentifier: "text-xs md:text-sm",
              userButtonPopoverActionButton:
                "dark:text-stone-300 dark:hover:text-yellow-400",
              userButtonPopoverActionButtonIcon: "dark:text-stone-400",
            },
          }}
        />
      </div>
    </div>
  );
}
