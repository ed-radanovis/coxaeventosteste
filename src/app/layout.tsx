import "@/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";
import ThemeMeta from "@/components/theme-meta";

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
    <ClerkProvider>
      <html lang="pt" className={`${geist.variable}`} suppressHydrationWarning>
        <head>
          <ThemeMeta />
        </head>
        <body suppressHydrationWarning>
          <ThemeProvider attribute="class">
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
