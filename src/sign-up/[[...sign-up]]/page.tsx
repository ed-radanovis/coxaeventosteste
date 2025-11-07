"use client";

import { useState, useEffect } from "react";
import { SignUp } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      key={theme}
      className="flex min-h-screen items-center justify-center bg-[#212121b0] p-4 transition-colors duration-300"
    >
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
}
