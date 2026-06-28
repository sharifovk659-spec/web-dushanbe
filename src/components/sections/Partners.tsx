"use client";

import Image from "next/image";
import { partners } from "@/data/content";
import { images } from "@/lib/images";
import { FadeIn } from "@/components/ui/FadeIn";
import styles from "./Partners.module.css";

const carouselPartners = [...partners, ...partners];

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <div className="partner-card group relative flex h-[4.25rem] w-full items-center justify-center rounded-sm px-3 sm:h-[5rem] sm:px-4">
      <span className="partner-card-border" aria-hidden />
      <span className="partner-card-glow" aria-hidden />
      <Image
        src={images.partner(partner.id)}
        alt={partner.name}
        width={160}
        height={56}
        loading="lazy"
        className="partner-logo relative z-[1] h-7 w-auto max-w-[85%] sm:h-9 lg:h-10"
      />
    </div>
  );
}

export function Partners() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#050505] py-[50px]">
      <div className="section-container relative mb-[50px]">
        <FadeIn variant="fadeUp">
          <h2 className="font-display text-center text-xl font-bold tracking-tight text-text sm:text-2xl">
            Нам доверяют
          </h2>
        </FadeIn>
      </div>

      <div className={styles.marqueeOuter} aria-label="Партнёры компании">
        <div className={styles.marqueeTrack}>
          {carouselPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className={styles.slide}
              aria-hidden={index >= partners.length ? true : undefined}
            >
              <PartnerLogo partner={partner} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
