"use client";

import Image from "next/image";
import { partners } from "@/data/content";
import { images } from "@/lib/images";
import { FadeIn } from "@/components/ui/FadeIn";
import styles from "./Partners.module.css";

const carouselPartners = [...partners, ...partners];

function PartnerLogo({ partner }: { partner: (typeof partners)[number] }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardInner}>
        <Image
          src={images.partner(partner.id)}
          alt={partner.name}
          width={960}
          height={1200}
          loading="lazy"
          sizes="(max-width: 640px) 200px, 280px"
          quality={100}
          className={styles.cardImage}
        />
      </div>
    </article>
  );
}

export function Partners() {
  return (
    <section id="partners" className="relative overflow-hidden bg-[#050505] py-[50px]">
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
