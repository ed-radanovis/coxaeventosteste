"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { Home, ShieldAlert, LogOut, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface AccessDeniedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userRole?: string;
}

export function AccessDeniedDialog({
  open,
  onOpenChange,
  userRole,
}: AccessDeniedDialogProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [tappedElement, setTappedElement] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTap = (elementId: string) => {
    setTappedElement(elementId);
    setTimeout(() => setTappedElement(null), 300);
  };

  const handleClose = () => {
    onOpenChange(false);
    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border border-stone-200 sm:max-w-md dark:border-stone-700"
        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <DialogHeader>
            {/* animated icon */}
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              initial={{ rotate: -270, scale: 0 }}
              animate={{ rotate: 0, scale: 1.1 }}
              transition={{ type: "spring", damping: 35, delay: 0.3 }}
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(135deg, #ff0000, #500202)"
                    : "linear-gradient(135deg, #640303, #ff0000)",
                boxShadow:
                  theme === "dark"
                    ? "0 4px 8px rgba(255, 255, 255, 0.3)"
                    : "0 8px 8px rgba(3, 3, 3, 0.3)",
              }}
            >
              <ShieldAlert className="h-8 w-8 text-white" />
            </motion.div>

            <DialogTitle className="text-center text-2xl font-bold text-stone-900 dark:text-stone-100">
              Acesso Restrito
            </DialogTitle>
            <DialogDescription className="text-center text-base text-stone-600 dark:text-stone-400">
              Esta área é exclusiva para{" "}
              <span className="text-carrot-500 dark:text-carrot-400 font-semibold">
                administradores
              </span>
              .
              {userRole ? (
                <span className="mt-3 block text-sm">
                  Seu perfil atual:{" "}
                  <span className="text-cerise-600 dark:text-cerise-400 font-medium">
                    {userRole}
                  </span>
                </span>
              ) : (
                <span className="mt-3 block text-sm">
                  Seu usuário não possui permissões de administrador.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            {/* back button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={handleClose}
                onTouchStart={() => handleTap("home-button")}
                className={`flex w-full items-center justify-center gap-2 rounded-sm border px-4 py-3 text-center text-lg font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 ${
                  !mounted
                    ? "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 border-stone-200 text-stone-200 shadow-md shadow-stone-950 hover:bg-stone-200 hover:shadow-lg"
                    : theme === "dark"
                      ? "bg-carrot-600 hover:text-carrot-400 hover:border-carrot-400 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:bg-stone-800 hover:shadow-md"
                      : "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 border-stone-200 text-stone-200 shadow-md shadow-stone-950 hover:bg-stone-200 hover:shadow-lg"
                } ${
                  tappedElement === "home-button"
                    ? "scale-102 shadow-lg " +
                      (theme === "dark"
                        ? "border-carrot-400 text-carrot-400 bg-stone-800"
                        : "border-crusta-500 text-crusta-500 bg-stone-200")
                    : ""
                }`}
              >
                <Home className="h-5 w-5" />
                Voltar para Home
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* exit button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <SignOutButton redirectUrl="/">
                <Button
                  onTouchStart={() => handleTap("logout-button")}
                  className={`flex w-full items-center justify-center gap-2 rounded-sm border px-4 py-3 text-center text-lg font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 ${
                    !mounted
                      ? "hover:border-cerise-500 hover:text-cerise-500 bg-cerise-500 border-stone-200 text-stone-200 shadow-md shadow-stone-950 hover:bg-stone-200 hover:shadow-lg"
                      : theme === "dark"
                        ? "bg-cerise-600 hover:text-cerise-600 hover:border-cerise-600 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:bg-stone-800 hover:shadow-md"
                        : "hover:border-cerise-500 hover:text-cerise-500 bg-cerise-500 border-stone-200 text-stone-200 shadow-md shadow-stone-950 hover:bg-stone-200 hover:shadow-lg"
                  } ${
                    tappedElement === "logout-button"
                      ? "scale-102 shadow-lg " +
                        (theme === "dark"
                          ? "border-cerise-600 text-cerise-600 bg-stone-800"
                          : "border-cerise-500 text-cerise-500 bg-stone-200")
                      : ""
                  }`}
                >
                  <LogOut className="h-5 w-5" />
                  Sair da Conta
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </SignOutButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 border-t border-stone-200 pt-4 text-center text-sm text-stone-500 dark:border-stone-700 dark:text-stone-400"
          >
            <p className="mb-1">Precisa de acesso administrativo?</p>
            <p className="text-xs">Contate um administrador do sistema</p>
            <div className="mt-3 flex justify-center gap-2.5">
              {[...Array<number>(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-carrot-400 dark:bg-carrot-500 h-1 w-1 rounded-full"
                  animate={{ scale: [1, 2, 1] }}
                  transition={{
                    repeat: Infinity,
                    delay: i * 0.4,
                    duration: 2.8,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
