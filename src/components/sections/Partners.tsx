"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { partners } from "@/data/content";
import { images } from "@/lib/images";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { GlowPulse } from "@/components/animations/GlowPulse";

export function Partners() {
  return (
    <section id="about" className="section-follow relative overflow-hidden py-[70px]">
      <div className="section-glow" aria-hidden />
      <GlowPulse
        parallax={0.3}
        color="lime"
        className="left-1/2 top-0 h-40 w-40 -translate-x-1/2"
      />

      <div className="section-container relative">
        <FadeIn variant="fadeUp">
          <h2 className="font-display mb-3 text-center text-xl font-bold tracking-tight text-text sm:mb-4 sm:text-2xl">
            Нам доверяют
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 gap-[50px] sm:grid-cols-3 lg:grid-cols-6 lg:gap-[70px]">
          {partners.map((partner) => (
            <StaggerItem key={partner.id} variant="scale">
              <motion.div
                className="partner-card group relative flex h-[4.25rem] items-center justify-center rounded-sm px-3 sm:h-[5rem] sm:px-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
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
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
