"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export function generateStaticParams() {
  return [{ "sign-in": [] }];
}

export default function SignInPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const appearance = {
    variables: {
      colorPrimary: isDark ? "#896CFF" : "#464444",
      colorBackground: isDark ? "#0c0a09" : "#eeeeee",
      colorText: isDark ? "#f5f5f4" : "#1c1917",
      colorInputBackground: isDark ? "#27272a" : "#ffffff",
      colorInputText: isDark ? "#f5f5f4" : "#1c1917",
    },
    elements: {
      formButtonPrimary:
        "bg-yellow-400 hover:bg-yellow-500 text-black font-semibold",

      socialButtonsBlockButton:
        "transition-colors border border-border rounded-md",

      socialButtonsProviderIcon: isDark
        ? "filter brightness-150"
        : "filter brightness-100",

      socialButtonsBlockButtonText: isDark
        ? "!text-gray-400 font-medium"
        : "!text-gray-800 font-medium",

      socialButtonsBlockButton__google: isDark
        ? "bg-[#1c1917] hover:bg-[#27272a]"
        : "bg-white hover:bg-gray-100",

      card: "shadow-lg border border-border rounded-xl",
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#212121b0] p-4 transition-colors duration-300">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/client"
        appearance={appearance}
      />
    </div>
  );
}
