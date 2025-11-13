"use client";

import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function AdminUserButton() {
  const router = useRouter();
  const { theme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [tappedElement, setTappedElement] = useState<string | null>(null);

  const handleElementTap = (elementId: string) => {
    setTappedElement(elementId);
    setTimeout(() => setTappedElement(null), 500);
  };

  const handleMainClick = () => {
    router.push("/admin/events");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleMainClick}
        onTouchStart={() => handleElementTap("admin-access")}
        className={`flex rounded-sm border px-1 text-xs transition-all duration-200 ease-in-out md:h-6 ${
          tappedElement === "admin-access"
            ? theme === "dark"
              ? "text-cerise-500 scale-102 bg-stone-900"
              : "text-crusta-400 scale-102 bg-stone-200"
            : theme === "dark"
              ? "hover:text-cerise-500 border-stone-600 bg-stone-900 text-stone-600 hover:scale-102 hover:bg-stone-900 active:scale-[.98]"
              : "hover:text-crusta-400 border-stone-400 bg-stone-200 text-stone-400 hover:scale-102 hover:bg-stone-200 active:scale-[.98]"
        }`}
        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
      >
        Ir para gerenciamento
        <ArrowRight className="h-4 w-4" />
      </Button>
      <div
        className="absolute -right-10 -bottom-1 cursor-pointer md:-top-1"
        onClick={toggleMenu}
      >
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-6 h-6",
              userButtonTrigger: "opacity-100",
            },
          }}
        />
      </div>
    </div>
  );
}
