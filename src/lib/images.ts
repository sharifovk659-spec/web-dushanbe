export const images = {
  logo: "/images/logo.png",
  footerLogo: "/images/footer-logo.png",
  ogCover: "/images/og-cover.webp",
  partner: (id: string) => `/images/partners/${id}.png`,
} as const;
