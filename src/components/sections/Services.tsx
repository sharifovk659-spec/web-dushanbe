"use client";

import {
  HiCodeBracket,
  HiDevicePhoneMobile,
  HiChartBar,
  HiPaintBrush,
  HiMagnifyingGlassCircle,
} from "react-icons/hi2";
import { services } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { GlowPulse } from "@/components/animations/GlowPulse";
import { cn } from "@/lib/utils";

const iconComponents = {
  code: HiCodeBracket,
  mobile: HiDevicePhoneMobile,
  crm: HiChartBar,
  design: HiPaintBrush,
  seo: HiMagnifyingGlassCircle,
};

const colorStyles = {
  primary: "text-primary bg-primary/15 shadow-[0_0_12px_rgba(79,70,229,0.2)]",
  accent: "text-accent bg-accent/15 shadow-[0_0_12px_rgba(59,130,246,0.2)]",
  lime: "text-lime bg-lime/15 shadow-[0_0_12px_rgba(132,204,22,0.2)]",
};

export function Services() {
  return (
    <section id="services" className="section-spacing relative">
      <GlowPulse
        parallax={0.45}
        color="accent"
        className="-right-32 top-16 h-64 w-64"
      />

      <div className="section-container relative">
        <SectionHeading
          badge="Услуги"
          title="Наши услуги"
          subtitle="Полный цикл разработки — от идеи до запуска и продвижения."
        />

        <StaggerContainer className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconComponents[service.icon as keyof typeof iconComponents];
            return (
              <StaggerItem
                key={service.id}
                variant="scale"
                className={cn(
                  "h-full",
                  i === 4 &&
                    "sm:col-span-2 sm:mx-auto sm:max-w-md lg:col-span-1 lg:mx-0 lg:max-w-none",
                )}
              >
                <GlassCard hover className="group h-full p-4 sm:p-5">
                  <div
                    className={cn(
                      "mb-4 flex items-center justify-center rounded-xl p-1.5 transition-transform duration-300 group-hover:scale-105",
                      colorStyles[service.color],
                    )}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-text">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
