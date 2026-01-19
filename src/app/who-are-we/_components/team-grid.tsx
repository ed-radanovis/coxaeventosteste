"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  X,
  Mail,
  Linkedin,
  Instagram,
  Award,
  Briefcase,
  Users,
  Sparkles,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionSeparator } from "@/components/ui/section-separator";
import { api } from "@/trpc/react";
import { Loading } from "@/components/ui/loading";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  expertise: string[];
  linkedin?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  email?: string | null;
  yearsExperience: number;
}

interface DbTeamMember {
  id: string | number;
  name: string | null;
  role: string | null;
  image: string | null;
  description: string | null;
  expertise: string[] | string | null;
  linkedin?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  email?: string | null;
  yearsExperience?: number | null;
  isActive?: boolean;
}

export function TeamGrid() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [tappedCard, setTappedCard] = useState<string | null>(null);
  const [isButtonTapped, setIsButtonTapped] = useState(false);
  const [tappedSocial, setTappedSocial] = useState<string | null>(null);

  // get active team members from the DB
  const { data: dbTeamMembers, isLoading } =
    api.teamMember.getActiveTeamMembers.useQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleButtonTap = () => {
    setIsButtonTapped(true);
    setTimeout(() => setIsButtonTapped(false), 300);
  };

  const handleCardTap = (id: string) => {
    setTappedCard(id);
    setTimeout(() => setTappedCard(null), 300);
  };

  const handleSocialTap = (social: string) => {
    setTappedSocial(social);
    setTimeout(() => setTappedSocial(null), 300);
  };

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // convert db member to local interface
  const convertDbMemberToLocal = (dbMember: DbTeamMember): TeamMember => {
    let expertise: string[] = [];
    if (Array.isArray(dbMember.expertise)) {
      expertise = dbMember.expertise.filter(
        (item): item is string => typeof item === "string",
      );
    } else if (typeof dbMember.expertise === "string") {
      expertise = [dbMember.expertise];
    }

    const id = dbMember.id?.toString() ?? "";

    return {
      id,
      name: dbMember.name ?? "",
      role: dbMember.role ?? "",
      image: dbMember.image ?? "/default-avatar.png",
      description: dbMember.description ?? "",
      expertise,
      linkedin: dbMember.linkedin ?? null,
      instagram: dbMember.instagram ?? null,
      youtube: dbMember.youtube ?? null,
      email: dbMember.email ?? null,
      yearsExperience: Number(dbMember.yearsExperience) || 0,
    };
  };

  const teamMembers: TeamMember[] = dbTeamMembers
    ? dbTeamMembers.map(convertDbMemberToLocal)
    : [];

  // loading / empty states
  if (isLoading) {
    return (
      <section className="flex h-96 items-center justify-center bg-stone-100 dark:bg-stone-900">
        <Loading />
      </section>
    );
  }

  if (!dbTeamMembers || dbTeamMembers.length === 0) {
    return (
      <section className="bg-stone-100 px-6 pt-28 pb-20 md:px-12 dark:bg-stone-900">
        <div className="container mx-auto max-w-6xl py-20 text-center">
          <h2 className="mb-4 text-3xl font-bold text-stone-700 dark:text-stone-300">
            Nossa Equipe
          </h2>
          <p className="text-stone-600 dark:text-stone-400">
            Em breve teremos informações sobre nossa equipe.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`overflow-hidden rounded-lg ${
                  theme === "dark"
                    ? "bg-stone-800 text-stone-100"
                    : "bg-stone-100 text-stone-900"
                }`}
                style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
              >
                {/* close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 rounded-full bg-stone-950/20 p-2 text-stone-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-stone-950/30"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* content */}
                <div className="grid md:grid-cols-5">
                  {/* image */}
                  <div className="md:col-span-2">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* details */}
                  <div className="px-6 py-4 md:col-span-3 md:p-8">
                    <div className="mb-4">
                      <h3 className="mb-1 text-2xl font-bold">
                        {selectedMember.name}
                      </h3>
                      <div className="mb-3 flex items-center gap-2">
                        <Briefcase className="text-carrot-500 h-4 w-4" />
                        <span
                          className={`font-semibold ${
                            theme === "dark"
                              ? "text-carrot-400"
                              : "text-crusta-600"
                          }`}
                        >
                          {selectedMember.role}
                        </span>
                      </div>

                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-stone-500" />
                          <span className="text-sm">
                            {selectedMember.yearsExperience} anos
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mb-6 text-stone-600 dark:text-stone-300">
                      {selectedMember.description}
                    </p>

                    {/* expertise */}
                    <div className="mb-6">
                      <h4
                        className={`mb-3 flex items-center gap-2 font-medium tracking-widest ${
                          !mounted
                            ? "text-cerise-800"
                            : theme === "dark"
                              ? "text-cerise-400"
                              : "text-cerise-800"
                        }`}
                        style={{ fontFamily: "var(--font-charis-sil)" }}
                      >
                        <Sparkles className="h-4 w-4" />
                        Especialidades
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className={`rounded-sm border border-stone-400 px-3 py-1 text-sm lg:text-xs ${
                              theme === "dark"
                                ? "bg-stone-700 text-stone-300 shadow-xs shadow-stone-300"
                                : "bg-stone-200 text-stone-700 shadow-sm shadow-stone-700"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* social links */}
                    <div className="flex gap-4">
                      {selectedMember.linkedin && (
                        <Link
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="group"
                          onTouchStart={() => handleSocialTap("linkedin")}
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-90 ${
                              theme === "dark" ? "bg-stone-700" : "bg-stone-800"
                            } text-stone-100 ${
                              tappedSocial === "linkedin"
                                ? "scale-110 !bg-blue-700"
                                : "hover:bg-blue-700"
                            }`}
                          >
                            <Linkedin
                              className={`transition-all duration-300 ${
                                tappedSocial === "linkedin"
                                  ? "scale-115"
                                  : "group-hover:scale-115"
                              }`}
                            />
                          </span>
                        </Link>
                      )}

                      {selectedMember.instagram && (
                        <Link
                          href={selectedMember.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="group"
                          onTouchStart={() => handleSocialTap("instagram")}
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-90 ${
                              theme === "dark" ? "bg-stone-700" : "bg-stone-800"
                            } text-stone-100 ${
                              tappedSocial === "instagram"
                                ? "scale-110 !bg-gradient-to-br !from-purple-600 !via-pink-600 !to-yellow-300"
                                : "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-yellow-300"
                            }`}
                          >
                            <Instagram
                              className={`transition-all duration-300 ${
                                tappedSocial === "instagram"
                                  ? "scale-115"
                                  : "group-hover:scale-115"
                              }`}
                            />
                          </span>
                        </Link>
                      )}

                      {selectedMember.youtube && (
                        <Link
                          href={selectedMember.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                          className="group"
                          onTouchStart={() => handleSocialTap("youtube")}
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-90 ${
                              theme === "dark" ? "bg-stone-700" : "bg-stone-800"
                            } text-stone-100 ${
                              tappedSocial === "youtube"
                                ? "scale-110 !bg-red-600"
                                : "hover:bg-red-600"
                            }`}
                          >
                            <Youtube
                              className={`transition-all duration-300 ${
                                tappedSocial === "youtube"
                                  ? "scale-130"
                                  : "group-hover:scale-130"
                              }`}
                            />
                          </span>
                        </Link>
                      )}

                      {selectedMember.email && (
                        <Link
                          href={`mailto:${selectedMember.email}`}
                          aria-label="Email"
                          className="group"
                          onTouchStart={() => handleSocialTap("email")}
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all duration-300 active:scale-90 ${
                              theme === "dark" ? "bg-stone-700" : "bg-stone-800"
                            } text-stone-100 ${
                              tappedSocial === "email"
                                ? "scale-110 !bg-blue-900"
                                : "hover:bg-blue-900"
                            }`}
                          >
                            <Mail
                              className={`transition-all duration-300 ${
                                tappedSocial === "email"
                                  ? "scale-115"
                                  : "group-hover:scale-115"
                              }`}
                            />
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* team grid */}
      <section
        id="team"
        className={`relative px-0 pt-28 pb-20 transition-colors duration-700 ${
          theme === "dark"
            ? "bg-stone-800 text-stone-100"
            : "bg-stone-200 text-stone-950"
        }`}
        style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
      >
        <div className="mx-2">
          {/* title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2
              className={`mb-6 text-3xl font-bold italic md:text-4xl lg:text-5xl ${
                theme === "dark" ? "text-stone-500" : "text-stone-800"
              }`}
            >
              <span style={{ fontFamily: "var(--font-charis-sil)" }}>
                Nossa{" "}
                <span
                  className={`${
                    !mounted
                      ? "text-carrot-600"
                      : theme === "dark"
                        ? "text-carrot-400"
                        : "text-carrot-600"
                  }`}
                >
                  Equipe
                </span>
              </span>
            </h2>
            <p
              className={`mx-auto text-base font-medium md:text-xl ${
                theme === "dark" ? "text-stone-400" : "text-stone-600"
              }`}
              style={{ fontFamily: "var(--font-ibm-plex-sans)" }}
            >
              Os profissionais apaixonados que transformam sua visão em
              realidade
            </p>
          </motion.div>

          {/* image grid */}
          <div className="grid grid-cols-1 gap-3 px-1 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openModal(member)}
                onTouchStart={() => handleCardTap(member.id)}
              >
                <div
                  className={`relative mb-4 h-2/3 overflow-hidden transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-stone-800 shadow-lg shadow-stone-950"
                      : "bg-stone-200 shadow-lg shadow-stone-600"
                  } ${tappedCard === member.id ? "scale-95" : "group-hover:scale-102"}`}
                >
                  {/* image */}
                  <div className="relative aspect-square">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    {/* experience badge */}
                    <div
                      className={`absolute top-4 right-4 rounded-sm px-3 py-1 text-sm font-semibold backdrop-blur-sm ${
                        theme === "dark"
                          ? "text-carrot-400 bg-stone-900/60"
                          : "text-crusta-600 bg-stone-200/50"
                      }`}
                    >
                      XP : {member.yearsExperience} anos +
                    </div>

                    {/* hover content */}
                    <div className="absolute right-0 bottom-0 left-0 translate-y-full p-6 transition-transform duration-500 group-hover:translate-y-0 lg:bottom-14">
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-stone-300" : "text-stone-400"
                        }`}
                      >
                        {member.description.substring(0, 100)}...
                      </p>
                      <Button
                        size="sm"
                        onTouchStart={handleButtonTap}
                        className={`group relative mt-4 inline-flex w-1/3 items-center justify-center gap-3 rounded-sm border px-0 py-0 text-xs font-medium transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 ${
                          !mounted
                            ? "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-950 hover:bg-stone-100"
                            : theme === "dark"
                              ? "bg-carrot-600 hover:text-carrot-400 hover:border-carrot-400 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:scale-102 hover:bg-stone-900 hover:shadow-lg"
                              : "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-800 hover:scale-102 hover:bg-stone-100 hover:shadow-xl"
                        } ${
                          isButtonTapped
                            ? "scale-102 shadow-lg " +
                              (theme === "dark"
                                ? "!border-carrot-400 !text-carrot-400 bg-stone-900"
                                : "!border-crusta-500 !text-crusta-500 bg-stone-100")
                            : ""
                        }`}
                      >
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </div>

                {/* name & role */}
                <div className="text-center">
                  <h3
                    className={`mb-1 text-xl font-bold ${
                      !mounted
                        ? "text-stone-950"
                        : theme === "dark"
                          ? "text-stone-400"
                          : "text-stone-700"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p
                    className={`font-medium ${
                      theme === "dark" ? "text-carrot-400" : "text-crusta-600"
                    }`}
                  >
                    {member.role}
                  </p>
                </div>

                {/* expertise tags */}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {member.expertise.slice(0, 2).map((skill, idx) => (
                    <span
                      key={idx}
                      className={`rounded-sm border border-stone-400 px-2 py-1 text-xs ${
                        theme === "dark"
                          ? "bg-stone-800 text-stone-300 shadow-xs shadow-stone-300"
                          : "bg-stone-300 text-stone-700 shadow-sm shadow-stone-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-2 mb-6 text-center"
          >
            <p
              className={`mb-10 text-base md:text-lg ${
                theme === "dark" ? "text-stone-400" : "text-stone-600"
              }`}
            >
              Conheça nossa equipe completa e como podemos ajudar no seu próximo
              evento
            </p>
            <Button
              size="lg"
              onTouchStart={handleButtonTap}
              onClick={() => (window.location.href = "/contact")}
              className={`group relative inline-flex items-center justify-center gap-3 rounded-sm border px-1 py-3 text-base font-medium transition-all duration-300 ease-in-out hover:scale-102 active:scale-98 md:px-6 md:text-sm ${
                !mounted
                  ? "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-950 hover:bg-stone-100"
                  : theme === "dark"
                    ? "bg-carrot-600 hover:text-carrot-400 hover:border-carrot-400 border-stone-400 text-stone-200 shadow-md shadow-stone-600 hover:scale-102 hover:bg-stone-900 hover:shadow-lg"
                    : "hover:border-crusta-500 hover:text-crusta-500 bg-crusta-500 text-stone-200 shadow-lg shadow-stone-800 hover:scale-102 hover:bg-stone-100 hover:shadow-xl"
              } ${
                isButtonTapped
                  ? "scale-102 shadow-lg " +
                    (theme === "dark"
                      ? "!border-carrot-400 !text-carrot-400 bg-stone-900"
                      : "!border-crusta-500 !text-crusta-500 bg-stone-100")
                  : ""
              }`}
            >
              <Users className="h-5 w-5" />
              Fale com Nossa Equipe
            </Button>
          </motion.div>
        </div>
        <div className="absolute -bottom-[-8px] left-1/2 z-10 -translate-x-1/2 transform md:-bottom-[-12px]">
          <SectionSeparator href="/#footer" initialBg="bg-stone-300" />
        </div>
      </section>
    </>
  );
}
