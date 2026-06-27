import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";
import { images } from "@/lib/images";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "WD",
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: images.logo,
        sizes: "96x96",
        type: "image/webp",
      },
    ],
  };
}
