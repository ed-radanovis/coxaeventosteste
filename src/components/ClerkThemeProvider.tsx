"use client";

import { type ReactNode, useMemo } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function ClerkThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const appearance = useMemo(
    () => ({
      variables: {
        colorPrimary: isDark ? "#896CFF" : "#464444",
        colorBackground: isDark ? "#0c0a09" : "#eeeeee",
        colorText: isDark ? "#f5f5f4" : "#1c1917",
        colorInputBackground: isDark ? "#27272a" : "#ffffff",
        colorInputText: isDark ? "#f5f5f4" : "#1c1917",

        colorNeutral: isDark ? "#cecece" : "#0f0e0e",
        colorTextOnPrimaryBackground: isDark ? "#f5f5f4" : "#1c1917",
        colorTextSecondary: isDark ? "#777777" : "#44403c",
        colorAlphaShade: isDark ? "#ffffff20" : "#00000020",
      },
      elements: {
        formButtonPrimary:
          "bg-yellow-400 hover:bg-yellow-500 text-black font-semibold",
        card: "shadow-lg border border-border rounded-xl",

        socialButtonsBlockButton:
          "transition-colors border border-border rounded-md",
        socialButtonsProviderIcon: isDark
          ? "filter brightness-150"
          : "filter brightness-100",

        socialButtonsBlockButton__google: isDark
          ? "bg-stone-950 hover:bg-stone-800"
          : "bg-white hover:bg-gray-100",

        socialButtonsBlockButtonText__google: isDark
          ? "!text-stone-400 font-medium"
          : "!text-stone-800 font-medium",
      },
    }),
    [isDark],
  );

  return (
    <ClerkProvider appearance={appearance} key={theme}>
      {children}
    </ClerkProvider>
  );
}
