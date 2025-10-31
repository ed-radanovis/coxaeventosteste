"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeMeta() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeColor = !mounted
    ? "#ffffff"
    : theme === "dark"
      ? "#1a1a1a"
      : "#ffffff";

  return <meta name="theme-color" content={themeColor} />;
}
