"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { motion } from "framer-motion";

type Theme = "system" | "light" | "dark";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // theme sync
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setMounted(true);
  }, [setTheme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  // during SSR, renders a skeleton
  if (!mounted) {
    return (
      <div className="flex items-center gap-2.5 rounded-full bg-stone-700/30 px-3 pt-1 md:gap-3 md:p-0.5 md:pt-1.5 dark:bg-stone-600/30">
        <div className="h-4 w-4 rounded-full md:h-5 md:w-5" />
        <div className="h-3 w-3 rounded-full md:h-5 md:w-5" />
        <div className="h-3 w-3 rounded-full md:h-5 md:w-5" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 rounded-full bg-stone-700/30 px-3 pt-1 md:gap-3 md:p-0.5 md:pt-1.5 dark:bg-stone-600/30">
      {/* light */}
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          variant={theme === "light" ? "default" : "ghost"}
          size="icon"
          onClick={() => handleThemeChange("light")}
          className={`h-4 w-4 rounded-full md:h-5 md:w-5 ${
            theme === "light"
              ? "bg-carrot-400 text-stone-200"
              : "text-stone-600 dark:text-stone-300"
          }`}
        >
          <Sun className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* system */}
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          variant={theme === "system" ? "default" : "ghost"}
          size="icon"
          onClick={() => handleThemeChange("system")}
          className={`h-3 w-3 rounded-full md:h-5 md:w-5 ${
            theme === "system"
              ? "bg-stone-700 text-white"
              : "text-stone-400 dark:text-stone-400"
          }`}
        >
          <Monitor className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* dark */}
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          variant={theme === "dark" ? "default" : "ghost"}
          size="icon"
          onClick={() => handleThemeChange("dark")}
          className={`h-3 w-3 rounded-full md:h-5 md:w-5 ${
            theme === "dark"
              ? "bg-stone-900 text-white"
              : "text-stone-400 dark:text-stone-400"
          }`}
        >
          <Moon className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
