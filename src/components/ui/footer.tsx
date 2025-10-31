// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { useState, useEffect } from "react";
// import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

// export function Footer() {
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <footer className="bg-stone-200 py-8">
//         <div className="container mx-auto max-w-7xl px-6">
//           <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
//             <div className="h-20 rounded-sm bg-stone-300/20" />
//             <div className="h-20 rounded-sm bg-stone-300/20" />
//             <div className="h-20 rounded-sm bg-stone-300/20" />
//             <div className="h-20 rounded-sm bg-stone-300/20" />
//           </div>
//         </div>
//       </footer>
//     );
//   }

//   return (
//     <footer
//       id="footer"
//       className={`py-8 transition-all duration-700 ${
//         !mounted
//           ? "bg-stone-200 text-stone-950"
//           : theme === "dark"
//             ? "bg-stone-900 text-stone-100"
//             : "bg-stone-200 text-stone-950"
//       }`}
//     >
//       <div className="container mx-auto max-w-7xl px-6">
//         <motion.div
//           className="grid grid-cols-1 gap-8 md:grid-cols-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           viewport={{ once: false, amount: 0.3 }}
//         >
//           {/* social icons */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             viewport={{ once: false, amount: 0.3 }}
//             className="flex flex-col items-center space-y-4 md:items-start"
//           >
//             <div className="flex gap-4">
//               <motion.div
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ duration: 0.2, ease: "easeInOut" }}
//               >
//                 <Link
//                   href="https://www.instagram.com/coxaeventos/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Instagram"
//                   className="group"
//                 >
//                   <span
//                     className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
//                       theme === "dark"
//                         ? "bg-stone-700 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
//                         : "bg-stone-800 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
//                     }`}
//                   >
//                     <FaInstagram className="transition-all duration-300 group-hover:scale-110" />
//                   </span>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ duration: 0.2, ease: "easeInOut" }}
//               >
//                 <Link
//                   href="https://www.youtube.com/channel/UCwq1ziBmTvKjfabL3eyhowQ"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="YouTube"
//                   className="group"
//                 >
//                   <span
//                     className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
//                       theme === "dark"
//                         ? "bg-stone-700 text-stone-100 hover:bg-red-600"
//                         : "bg-stone-800 text-stone-100 hover:bg-red-600"
//                     }`}
//                   >
//                     <FaYoutube className="transition-all duration-300 group-hover:scale-110" />
//                   </span>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.1, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ duration: 0.2, ease: "easeInOut" }}
//               >
//                 <Link
//                   href="https://www.facebook.com/musico.coxa"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label="Facebook"
//                   className="group"
//                 >
//                   <span
//                     className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
//                       theme === "dark"
//                         ? "bg-stone-700 text-stone-100 hover:bg-blue-600"
//                         : "bg-stone-800 text-stone-100 hover:bg-blue-600"
//                     }`}
//                   >
//                     <FaFacebook className="transition-all duration-300 group-hover:scale-110" />
//                   </span>
//                 </Link>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Coluna 2: Contato */}
//           <motion.div
//             initial={{ opacity: 0, x: -10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: false, amount: 0.3 }}
//             className="text-center md:text-left"
//           >
//             <p className="mb-2 text-sm">
//               <Link
//                 href="tel:+5519999999999"
//                 className="hover:text-carrot-400 transition-colors duration-300"
//               >
//                 +55 (19) 99999-9999
//               </Link>
//             </p>
//             <p className="text-sm">
//               <Link
//                 href="mailto:contato@coxaeventos.com"
//                 className="hover:text-carrot-400 transition-colors duration-300"
//               >
//                 contato@coxaeventos.com
//               </Link>
//             </p>
//           </motion.div>

//           {/* Coluna 3: Endereço */}
//           <motion.div
//             initial={{ opacity: 0, x: 10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: false, amount: 0.3 }}
//             className="text-center md:text-left"
//           >
//             <p className="text-sm">
//               Coxa Eventos Ltda | Serra Negra | SP | Brasil
//             </p>
//           </motion.div>

//           {/* Coluna 4: Copyright e Links */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: false, amount: 0.3 }}
//             className="space-y-2 text-center md:text-left"
//           >
//             <div className="text-sm">
//               <span className="copyright-year">
//                 © {new Date().getFullYear()}&nbsp;
//               </span>
//               <span>Todos os Direitos Reservados | Coxa Eventos Ltda</span>
//             </div>

//             <div className="flex flex-wrap justify-center gap-2 text-xs md:justify-start">
//               <Link
//                 href="/privacy"
//                 className="hover:text-carrot-400 transition-colors duration-300"
//               >
//                 Política de Privacidade
//               </Link>
//               <span>|</span>
//               <Link
//                 href="/cookie-policy"
//                 className="hover:text-carrot-400 transition-colors duration-300"
//               >
//                 Política de Cookies
//               </Link>
//               <span>|</span>
//               <Link
//                 href="/quality-policy"
//                 className="hover:text-carrot-400 transition-colors duration-300"
//               >
//                 Política de Qualidade
//               </Link>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import Image from "next/image";

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <footer className="bg-stone-200 py-8">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="h-20 rounded-sm bg-stone-300/20" />
            <div className="h-20 rounded-sm bg-stone-300/20" />
            <div className="h-20 rounded-sm bg-stone-300/20" />
            <div className="h-20 rounded-sm bg-stone-300/20" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer
        id="footer"
        className={`py-8 transition-all duration-700 ${
          !mounted
            ? "bg-stone-200 text-stone-950"
            : theme === "dark"
              ? "bg-stone-900 text-stone-100"
              : "bg-stone-200 text-stone-950"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* social icons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col items-center space-y-4 md:items-start"
            >
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Link
                    href="https://www.instagram.com/coxaeventos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-stone-700 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                          : "bg-stone-800 text-stone-100 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                      }`}
                    >
                      <FaInstagram className="transition-all duration-300 group-hover:scale-110" />
                    </span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Link
                    href="https://www.youtube.com/channel/UCwq1ziBmTvKjfabL3eyhowQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="group"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-stone-700 text-stone-100 hover:bg-red-600"
                          : "bg-stone-800 text-stone-100 hover:bg-red-600"
                      }`}
                    >
                      <FaYoutube className="transition-all duration-300 group-hover:scale-110" />
                    </span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Link
                    href="https://www.facebook.com/musico.coxa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="group"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-stone-700 text-stone-100 hover:bg-blue-600"
                          : "bg-stone-800 text-stone-100 hover:bg-blue-600"
                      }`}
                    >
                      <FaFacebook className="transition-all duration-300 group-hover:scale-110" />
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Coluna 2: Contato */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center md:text-left"
            >
              <p className="mb-2 text-sm">
                <Link
                  href="tel:+5519999999999"
                  className="hover:text-carrot-400 transition-colors duration-300"
                >
                  +55 (19) 99999-9999
                </Link>
              </p>
              <p className="text-sm">
                <Link
                  href="mailto:contato@coxaeventos.com"
                  className="hover:text-carrot-400 transition-colors duration-300"
                >
                  contato@coxaeventos.com
                </Link>
              </p>
            </motion.div>

            {/* Coluna 3: Endereço */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center md:text-left"
            >
              <p className="text-sm">
                Coxa Eventos Ltda | Serra Negra | SP | Brasil
              </p>
            </motion.div>

            {/* Coluna 4: Copyright e Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-2 text-center md:text-left"
            >
              <div className="text-sm">
                <span className="copyright-year">
                  © {new Date().getFullYear()}&nbsp;
                </span>
                <span>Todos os Direitos Reservados | Coxa Eventos Ltda</span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs md:justify-start">
                <Link
                  href="/privacy"
                  className="hover:text-carrot-400 transition-colors duration-300"
                >
                  Política de Privacidade
                </Link>
                <span>|</span>
                <Link
                  href="/cookie-policy"
                  className="hover:text-carrot-400 transition-colors duration-300"
                >
                  Política de Cookies
                </Link>
                <span>|</span>
                <Link
                  href="/quality-policy"
                  className="hover:text-carrot-400 transition-colors duration-300"
                >
                  Política de Qualidade
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Assinatura EWD APEX - Bem sutil */}
      <motion.footer
        className={`py-2 transition-all duration-500 ${
          theme === "dark"
            ? "bg-stone-950 text-stone-400"
            : "bg-stone-300 text-stone-600"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/logo_EWD_apex.png"
              alt="EWD APEX"
              width={20}
              height={20}
              className="opacity-40 transition-opacity hover:opacity-60"
            />
            <span className="text-xs opacity-40">
              Desenvolvido por{" "}
              <a
                href="https://edwebdev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                EWD APEX
              </a>{" "}
              - &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </motion.footer>
    </>
  );
}
