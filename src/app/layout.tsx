import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/data/content";
import { images } from "@/lib/images";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Веб-разработка и цифровые решения в Таджикистане`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "WEB DUSHANBE — IT-компания в Душанбе. Создаём сайты, мобильные приложения, CRM-системы и UI/UX дизайн. 5+ лет опыта, 25+ проектов.",
  keywords: [
    "веб-разработка Душанбе",
    "создание сайтов Таджикистан",
    "мобильные приложения",
    "CRM системы",
    "UI UX дизайн",
    "WEB DUSHANBE",
    "IT компания Душанбе",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Создаём сайты, которые приносят клиентов`,
    description: siteConfig.tagline,
    images: [
      {
        url: images.ogCover,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: [images.ogCover],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${images.logo}`,
  description: siteConfig.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: "пр. Рудаки 95",
    addressLocality: "Душанбе",
    addressCountry: "TJ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: "customer service",
    availableLanguage: ["Russian", "Tajik"],
  },
  sameAs: [
    "https://instagram.com/webdushanbe",
    "https://t.me/webdushanbe",
    "https://linkedin.com/company/webdushanbe",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
