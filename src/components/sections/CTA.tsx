"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Float } from "@/components/animations/Float";
import { GlowPulse } from "@/components/animations/GlowPulse";
import { useIsDesktop } from "@/hooks/useMediaQuery";

function NeonShape() {
  const isDesktop = useIsDesktop();

  const shape = (
    <div className="relative mx-auto h-[180px] w-[180px] sm:h-[220px] sm:w-[220px] lg:mx-0 lg:h-[260px] lg:w-[260px]">
      {isDesktop ? (
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d", perspective: 800 }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[0, 60, 120].map((rotate, i) => (
            <div
              key={rotate}
              className="absolute inset-[12%] rounded-sm border-2 border-lime/50"
              style={{
                transform: `rotateX(65deg) rotateZ(${rotate}deg)`,
                opacity: 1 - i * 0.25,
              }}
            />
          ))}

          <div
            className="absolute inset-[22%] rounded-sm border border-lime/60"
            style={{ transform: "rotateX(65deg) rotateZ(30deg)" }}
          />

          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime" />
        </motion.div>
      ) : (
        <div className="absolute inset-[18%] rounded-sm border border-lime/45" />
      )}

      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <polygon
          points="100,15 175,58 175,142 100,185 25,142 25,58"
          stroke="rgba(201,242,77,0.55)"
          strokeWidth="2"
          opacity="0.85"
        />
      </svg>
    </div>
  );

  if (!isDesktop) return shape;

  return (
    <Float distance={12} duration={5}>
      {shape}
    </Float>
  );
}

export function CTA() {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="section-glow" aria-hidden />
      <div className="section-container relative">
        <FadeIn variant="scale">
          <div className="glass relative w-full overflow-hidden rounded-sm border border-white/10">
            <GlowPulse parallax={0.2} color="lime" className="-left-24 top-1/2 h-64 w-64 -translate-y-1/2" />
            <GlowPulse parallax={0.25} color="lime" className="-right-16 top-0 h-72 w-72" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/80" />

            <div className="relative grid items-center gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:gap-8 lg:p-8">
              <div className="flex flex-col items-start gap-3 sm:gap-4">
                <h2 className="font-display max-w-xl text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl lg:text-4xl">
                  Готовы обсудить ваш проект?
                </h2>
                <Button href="mailto:hello@webdushanbe.tj" icon="arrow">
                  Обсудить проект
                </Button>
              </div>

              <NeonShape />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
