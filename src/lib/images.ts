export const images = {
  logo: "/images/logo.png",
  ogCover: "/images/og-cover.webp",
  partner: (id: string) => `/images/partners/${id}.webp`,
} as const;
