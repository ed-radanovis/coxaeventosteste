import { generatePageMetadata } from "@/lib/metadata";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { About } from "./_components/about";
import { WhatWeDo } from "./_components/what-we-do";
import { ShowcaseGrid } from "./_components/show-case-grid";
import { ServicesGrid } from "./_components/services-grid";
import { MainTestimonial } from "./_components/main-testimonial";
import { NewsAndViews } from "./_components/news-and-views";
import { ClientsCarousel } from "@/components/ui/clients-carousel";
import { CertificationsGrid } from "@/components/ui/certifications-grid";
import { Footer } from "@/components/ui/footer";

export const generateMetadata = () => generatePageMetadata("Home");

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <WhatWeDo />
      <ShowcaseGrid />
      <ServicesGrid />
      <MainTestimonial />
      <NewsAndViews />
      <ClientsCarousel />
      <CertificationsGrid />
      <Footer />
    </>
  );
}
