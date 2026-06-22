"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { HeroTechCore } from "@/components/sections/HeroTechCore";
import { GlowPulse } from "@/components/animations/GlowPulse";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export function Hero() {
  const isDesktop = useIsDesktop();

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[4.25rem] pb-3 sm:pt-[4.5rem] sm:pb-4"
    >
      <div className="pointer-events-none absolute inset-0">
        <GlowPulse
          parallax={isDesktop ? 0.3 : undefined}
          color="primary"
          className="-left-24 top-1/4 h-56 w-56"
        />
        <GlowPulse
          parallax={isDesktop ? 0.2 : undefined}
          color="accent"
          className="-right-24 bottom-1/4 h-48 w-48 [animation-delay:2s]"
        />
      </div>

      <div className="section-container relative grid w-full items-start gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="relative z-10 flex flex-col gap-3.5 sm:gap-4">
          <FadeIn eager variant="fadeUp">
            <span className="glass inline-flex w-fit rounded-full border border-primary/20 px-4 py-1.5 text-xs font-medium text-text-secondary sm:text-sm">
              IT-компания в Таджикистане
            </span>
          </FadeIn>

          <FadeIn eager delay={0.08} variant="fadeUp">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
              Создаем решения,
              <br />
              которые
              <br />
              <span className="gradient-text-hero">приносят клиентов</span>
            </h1>
          </FadeIn>

          <FadeIn eager delay={0.16} variant="fadeLeft">
            <p className="max-w-lg text-base leading-relaxed text-text-secondary">
              Разрабатываем веб-сайты,
              <br className="hidden sm:block" />
              CRM системы и цифровые продукты,
              <br className="hidden sm:block" />
              которые помогают бизнесу расти.
            </p>
          </FadeIn>

          <FadeIn eager delay={0.24} variant="scale">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="#contacts" icon="arrow">
                Обсудить проект
              </Button>
              <Button href="#projects" variant="outline" icon="play">
                Смотреть кейсы
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn eager delay={0.12} variant="fadeRight" className="relative z-10 w-full">
          <HeroTechCore />
        </FadeIn>
      </div>
    </section>
  );
}
