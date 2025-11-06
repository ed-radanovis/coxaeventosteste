"use client";

import { useState, useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      key={theme}
      className="flex min-h-screen items-center justify-center bg-[#212121b0] p-4 transition-colors duration-300"
    >
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl="/client"
      />
    </div>
  );
}
