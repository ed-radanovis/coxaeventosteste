import { generatePageMetadata } from "@/lib/metadata";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { About } from "./_components/about";
import { DisplayCaseGrid } from "./_components/display-case-grid";
import { WhatWeDo } from "./_components/what-we-do";
import { ServicesGrid } from "./_components/services-grid";
import { MainTestimonial } from "./_components/main-testimonial";
import { NewsAndViews } from "./_components/news-and-views";
import { ClientsCarousel } from "@/components/ui/clients-carousel";
import { CertificationsGrid } from "@/components/ui/certifications-grid";
import { Footer } from "@/components/ui/footer";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateMetadata = () => generatePageMetadata("Home");

export default async function Home() {
  await delay(2000);
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <DisplayCaseGrid />
      <WhatWeDo />
      <ServicesGrid />
      <MainTestimonial />
      <NewsAndViews />
      <ClientsCarousel />
      <CertificationsGrid />
      <Footer />
    </>
  );
}
