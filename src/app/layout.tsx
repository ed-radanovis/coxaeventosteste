// import "@/styles/globals.css";
// import { type Metadata } from "next";
// import { Geist } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
// import { TRPCReactProvider } from "@/trpc/react";
// import { ThemeProvider } from "next-themes";
// import ThemeMeta from "@/components/theme-meta";

// export const metadata: Metadata = {
//   title: "Coxa Eventos App",
//   description: "A plataforma que transforma eventos em memórias inesquecíveis",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

// const geist = Geist({
//   subsets: ["latin"],
//   variable: "--font-geist-sans",
// });

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <ClerkProvider>
//       <html lang="pt" className={`${geist.variable}`} suppressHydrationWarning>
//         <head>
//           <ThemeMeta />
//         </head>
//         <body suppressHydrationWarning>
//           <ThemeProvider attribute="class">
//             <TRPCReactProvider>{children}</TRPCReactProvider>
//           </ThemeProvider>
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }

export const dynamic = "force-dynamic"; // 👈 garante que o layout nunca será estático no build

import "@/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";
import ThemeMeta from "@/components/theme-meta";
import ClerkThemeProvider from "@/components/ClerkThemeProvider"; // 👈 nosso wrapper

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
        {/* ✅ A ordem importa: o Clerk precisa estar dentro do ThemeProvider */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkThemeProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
