export const images = {
  logo: "/images/logo.webp",
  ogCover: "/images/og-cover.webp",
  partner: (id: string) => `/images/partners/${id}.webp`,
} as const;
