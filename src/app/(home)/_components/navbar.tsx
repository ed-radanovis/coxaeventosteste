"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { Menu, X, Mail } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // states for taps
  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const [tappedSocial, setTappedSocial] = useState<string | null>(null);

  // navbar scroll - transparent to solid
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menu on click outside (for desktop)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest(".menu-container") &&
        !target.closest(".hamburger-button")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // functions for taps
  const handleTap = (elementId: string) => {
    setTappedElement(elementId);
    setTimeout(() => setTappedElement(null), 300);
  };

  const handleSocialTap = (social: string) => {
    setTappedSocial(social);
    setTimeout(() => setTappedSocial(null), 300);
  };

  const bgClass = !mounted
    ? "bg-stone-950/5"
    : isScrolled
      ? theme === "dark"
        ? "bg-stone-600/70"
        : "bg-stone-900/70"
      : theme === "dark"
        ? "bg-stone-100/5"
        : "bg-stone-950/5";

  // during SSR, render a skeleton
  if (!mounted) {
    return (
      <nav className="fixed top-0 right-0 left-0 z-50 bg-stone-950/5 py-4 backdrop-blur-sm">
        <div className="container mx-auto px-2 md:px-6">
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="h-[60px] w-[120px] rounded-full bg-stone-300/20 md:h-[80px] md:w-[200px]" />

            {/* button */}
            <div className="flex items-center gap-12 md:gap-16">
              <div className="h-8 w-24 rounded-full bg-stone-300/20" />
              <div className="h-14 w-14 rounded-lg bg-stone-300/20" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* navbar */}
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${bgClass} py-4 backdrop-blur-sm`}
      >
        <div className="container mx-auto px-2 md:px-6">
          <div className="flex items-center justify-between">
            {/* left side */}
            <Link
              href="/"
              className="transition-opacity duration-500"
              style={{ display: "contents" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              >
                <Image
                  src="/logo_navbar.png"
                  width={530}
                  height={298}
                  className={`h-[60px] w-[120px] rounded-full border border-solid border-transparent md:h-[80px] md:w-[200px] ${
                    isScrolled ? "opacity-100" : "opacity-80"
                  }`}
                  alt="Coxa Eventos Logo"
                />
              </motion.div>
            </Link>

            {/* right side */}
            <div className="flex items-center gap-12 md:gap-16">
              {/* theme toggle */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              >
                <div
                  className={
                    isScrolled
                      ? ""
                      : "rounded-full bg-stone-100/20 p-1 backdrop-blur-sm"
                  }
                >
                  <ThemeToggle />
                </div>
              </motion.div>

              {/* hamburger button */}
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(true)}
                onTouchStart={() => handleTap("hamburger")}
                className={`hamburger-button h-14 w-14 rounded-lg p-3 transition-all duration-300 active:scale-[.90] active:opacity-30 md:p-4 ${
                  isScrolled
                    ? "text-carrot-500 hover:bg-stone-100/20 hover:text-amber-400"
                    : "text-carrot-500 hover:bg-stone-100/20 hover:text-amber-400"
                } ${
                  tappedElement === "hamburger"
                    ? "scale-95 bg-stone-100/20 !text-amber-400"
                    : ""
                }`}
              >
                <Menu
                  size={36}
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="!h-8 !w-8"
                />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-950/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* side menu (off-canvas) */}
      <div
        className={`menu-container fixed top-0 right-0 z-50 h-full w-160 max-w-full bg-stone-900/95 shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        {/* header do menu */}
        <div className="flex items-center justify-between border-b border-stone-700 p-8">
          <span
            className={`text-2xl font-bold tracking-widest italic ${
              theme === "dark" ? "text-carrot-500" : "text-crusta-500"
            }`}
            style={{ fontFamily: "var(--font-charis-sil)" }}
          >
            Menu
          </span>

          {/* close button */}
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen(false)}
            onTouchStart={() => handleTap("close-menu")}
            className={`hover:text-cerise-500 h-12 w-12 rounded-md p-3 text-stone-100 transition-all duration-300 ease-in-out hover:bg-stone-100/10 active:scale-90 ${
              tappedElement === "close-menu"
                ? "!text-cerise-500 scale-95 bg-stone-100/10"
                : ""
            }`}
          >
            <X size={36} strokeWidth={2.5} className="!h-10 !w-10" />
          </Button>
        </div>

        <div className="flex h-full flex-col p-6">
          <div className="flex-0 space-y-1">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              HOME
            </MobileNavLink>

            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              QUEM SOMOS
            </MobileNavLink>

            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              O QUE FAZEMOS
            </MobileNavLink>

            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              NOSSO PORTFÓLIO
            </MobileNavLink>

            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              NOVIDADES
            </MobileNavLink>

            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              CONTATO
            </MobileNavLink>
          </div>

          {/* contact */}
          <div
            className="mt-10 space-y-4 border-t border-stone-700 pt-6"
            style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
          >
            <div className="mb-10 space-y-2">
              <Link
                href="mailto:edradanovis@gmail.com?subject=Contato%20Coxa%20Eventos&body=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços!"
                className={`flex items-center gap-3 transition-all duration-200 ease-in-out ${
                  tappedElement === "email"
                    ? "text-cerise-500 scale-[1.02]"
                    : "hover:text-cerise-500 text-stone-300 hover:scale-[1.02]"
                }`}
                onTouchStart={() => handleTap("email")}
              >
                <Mail className="h-6 w-6" />
                <span className="text-base">contato@coxaeventos.com.br</span>
              </Link>
              <Link
                href="https://wa.me/5519982557489?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Coxa%20Eventos"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 transition-all duration-200 ease-in-out ${
                  tappedElement === "phone"
                    ? "text-carrot-500 scale-[1.02]"
                    : "hover:text-carrot-500 text-stone-300 hover:scale-[1.02]"
                }`}
                onTouchStart={() => handleTap("phone")}
              >
                <FaWhatsapp className="h-6 w-6" />
                <span className="text-base">+55 (19) 9 8255-7489</span>
              </Link>
            </div>

            {/* action buttons */}
            <div
              className="space-y-4 tracking-wider"
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    onTouchStart={() => handleTap("signin")}
                    className={`flex w-full items-center rounded-sm border text-base shadow-md transition-all duration-200 ease-in-out ${
                      tappedElement === "signin"
                        ? "border-crusta-500 text-crusta-400 scale-[1.02] bg-stone-950/30 shadow-lg active:scale-[.98]"
                        : theme === "dark"
                          ? "bg-carrot-500/80 hover:border-carrot-500 hover:text-carrot-400 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
                          : "bg-crusta-500/80 hover:border-crusta-500 hover:text-crusta-400 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Área do Cliente
                  </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex justify-center">
                  <UserButton
                    showName
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-7 h-7 md:w-10 md:h-10",
                        userButtonBox:
                          "flex flex-col-reverse items-center text-muted-foreground",
                        userButtonOuterIdentifier: "text-xm md:text-base",
                        userButtonPopoverActionButton:
                          "dark:text-stone-300 dark:hover:text-yellow-400",
                        userButtonPopoverActionButtonIcon:
                          "dark:text-stone-400",
                      },
                    }}
                  />
                </div>
              </SignedIn>
              <Button
                asChild
                onTouchStart={() => handleTap("contact")}
                className={`flex w-full items-center rounded-sm border text-base shadow-md transition-all duration-200 ease-in-out ${
                  tappedElement === "contact"
                    ? "border-cerise-700 text-cerise-700 scale-[1.02] bg-stone-950/30 shadow-lg active:scale-[.98]"
                    : theme === "dark"
                      ? "bg-persian-800/50 hover:border-persian-500 hover:text-persian-500 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
                      : "bg-cerise-900/50 hover:border-cerise-700 hover:text-cerise-700 border-stone-200 text-stone-200 hover:scale-[1.02] hover:bg-stone-950/30 hover:shadow-lg active:scale-[.98]"
                }`}
              >
                <Link href="/contact">Fale Conosco</Link>
              </Button>
            </div>

            {/* social icons */}
            <div className="mt-6 flex items-center justify-center gap-4 md:justify-normal">
              <Link
                href="https://www.instagram.com/coxaeventos/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onTouchStart={() => handleSocialTap("instagram")}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                    tappedSocial === "instagram"
                      ? "scale-130 bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-300"
                      : theme === "dark"
                        ? "bg-stone-700 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                        : "bg-stone-800 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                  }`}
                >
                  <FaInstagram
                    className={`transition-all duration-200 ease-in-out hover:scale-130 ${
                      tappedSocial === "instagram"
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  />
                </span>
              </Link>

              <Link
                href="https://www.youtube.com/channel/UCwq1ziBmTvKjfabL3eyhowQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                onTouchStart={() => handleSocialTap("youtube")}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                    tappedSocial === "youtube"
                      ? "scale-130 bg-red-600"
                      : theme === "dark"
                        ? "bg-stone-700 text-stone-100 hover:bg-red-600"
                        : "bg-stone-800 text-stone-100 hover:bg-red-600"
                  }`}
                >
                  <FaYoutube
                    className={`transition-all duration-200 ease-in-out hover:scale-130 ${
                      tappedSocial === "youtube"
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  />
                </span>
              </Link>

              <Link
                href="https://www.facebook.com/musico.coxa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                onTouchStart={() => handleSocialTap("facebook")}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                    tappedSocial === "facebook"
                      ? "scale-110 bg-blue-600"
                      : theme === "dark"
                        ? "bg-stone-700 text-stone-100 hover:bg-blue-600"
                        : "bg-stone-800 text-stone-100 hover:bg-blue-600"
                  }`}
                >
                  <FaFacebook
                    className={`transition-all duration-200 ease-in-out hover:scale-130 ${
                      tappedSocial === "facebook"
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// component for mobile links
function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: string;
  onClick: () => void;
}) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 300);
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      onTouchStart={handleTap}
      className={`block rounded-lg px-4 py-3 text-sm font-medium tracking-widest uppercase transition-all duration-200 ease-in-out ${
        isTapped
          ? "!text-carrot-400 scale-95 bg-stone-800/60"
          : "hover:text-carrot-400 text-stone-100 hover:bg-stone-800/60"
      }`}
      style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
    >
      {children}
    </Link>
  );
}
