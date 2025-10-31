import { type Metadata } from "next";

export function generatePageMetadata(pageTitle: string): Metadata {
  const baseTitle = "Coxa Eventos";
  const fullTitle = `${baseTitle} | ${pageTitle}`;
  const baseDescription =
    "Criação e produção de eventos corporativos, festas e experiências únicas. Mais de 10 anos transformando momentos em memórias.";

  return {
    title: fullTitle,
    description: `${pageTitle} - ${baseDescription}`,
    keywords: [
      "eventos corporativos",
      "festas",
      "São Paulo",
      "produção de eventos",
      "música ao vivo",
    ],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: fullTitle,
      description: `${pageTitle} - ${baseDescription}`,
      type: "website",
      locale: "pt_BR",
      siteName: "Coxa Eventos",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: `${pageTitle} - ${baseDescription}`,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    metadataBase: new URL("https://coxaeventos.com"), // Substitua pelo domínio real quando hospedar
    alternates: {
      canonical: "/", // Ajuste para páginas dinâmicas depois (ex.: /events/[id])
    },
  };
}
