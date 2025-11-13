export const dynamic = "force-dynamic"; // ensures non-static layout in the build

import "@/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";
import ThemeMeta from "@/components/theme-meta";
import ClerkThemeProvider from "@/components/ClerkThemeProvider"; // wrapper

export const metadata: Metadata = {
  title: "Coxa Eventos App",
  description: "A plataforma que transforma eventos em memórias inesquecíveis",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${geist.variable}`} suppressHydrationWarning>
      <head>
        <ThemeMeta />
      </head>
      <body suppressHydrationWarning>
        {/* clerk needs to be inside the ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkThemeProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
