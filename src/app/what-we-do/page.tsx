import { generatePageMetadata } from "@/lib/metadata";
import { Navbar } from "../(home)/_components/navbar";
import { WhatWeDoHero } from "./_components/hero";
import { Process } from "./_components/process";
import { ServicesDetail } from "./_components/services-detail";
import { CtaSection } from "./_components/cta-section";
import { ServicesCarousel } from "./_components/services-carousel";
import { Footer } from "@/components/ui/footer";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateMetadata = () => generatePageMetadata("O Que Fazemos");

export default async function WhatWeDoPage() {
  await delay(2000);
  return (
    <main className="min-h-screen">
      <Navbar />
      <WhatWeDoHero />
      <Process />
      <ServicesDetail />
      <CtaSection />
      <ServicesCarousel />
      <Footer />
    </main>
  );
}
