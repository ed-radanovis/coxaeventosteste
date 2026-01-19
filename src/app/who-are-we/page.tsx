import { generatePageMetadata } from "@/lib/metadata";
import { Navbar } from "../(home)/_components/navbar";
import { WhoAreHero } from "./_components/hero";
import { Introduction } from "./_components/introduction";
import { TeamGrid } from "./_components/team-grid";
import { CertificationsGrid } from "@/components/ui/certifications-grid";
import { Footer } from "@/components/ui/footer";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateMetadata = () => generatePageMetadata("Quem Somos");

export default async function WhoAreWePage() {
  await delay(2000);
  return (
    <>
      <Navbar />
      <WhoAreHero />
      <Introduction />
      <TeamGrid />
      <CertificationsGrid />
      <Footer />
    </>
  );
}
