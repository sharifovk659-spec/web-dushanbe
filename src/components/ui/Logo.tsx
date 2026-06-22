import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/content";
import { images } from "@/lib/images";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#hero" className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src={images.logo}
        alt={siteConfig.name}
        width={36}
        height={36}
        loading="lazy"
      />
      <span className="text-base font-bold tracking-tight text-text sm:text-lg">
        {siteConfig.name}
      </span>
    </Link>
  );
}
