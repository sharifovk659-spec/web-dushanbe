"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { HeroShader } from "@/components/sections/HeroShader";

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-banner relative flex min-h-[88vh] items-center overflow-hidden pt-[6.5rem] pb-12 sm:pt-[7rem] sm:pb-16"
    >
      <HeroShader />

      <div className="section-container relative z-10 w-full">
        <div className="flex max-w-3xl flex-col gap-3.5 sm:gap-4 lg:max-w-4xl">
          <FadeIn eager variant="fadeUp">
            <span className="inline-flex w-fit rounded-sm border border-white/10 bg-[rgba(11,11,11,0.65)] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] text-text-secondary sm:text-sm">
              IT-компания в Таджикистане
            </span>
          </FadeIn>

          <FadeIn eager delay={0.08} variant="fadeUp">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="lg:whitespace-nowrap">Создаем решения, которые</span>
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
      </div>
    </section>
  );
}
