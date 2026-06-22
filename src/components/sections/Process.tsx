"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const stepColors = {
  primary: {
    ring: "border-primary/50 text-primary",
    glow: "shadow-[0_0_16px_rgba(79,70,229,0.25)]",
    dot: "bg-primary",
  },
  lime: {
    ring: "border-lime/50 text-lime",
    glow: "shadow-[0_0_16px_rgba(132,204,22,0.25)]",
    dot: "bg-lime",
  },
  accent: {
    ring: "border-accent/50 text-accent",
    glow: "shadow-[0_0_16px_rgba(59,130,246,0.25)]",
    dot: "bg-accent",
  },
};

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const vLineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      if (lineProgressRef.current && lineRef.current) {
        gsap.fromTo(
          lineProgressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              end: "bottom 40%",
              scrub: 1,
            },
          },
        );
      }

      if (vLineProgressRef.current) {
        gsap.fromTo(
          vLineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          },
        );
      }

      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 32,
          scale: 0.94,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.08,
        });
      });

      const numbers = gsap.utils.toArray<HTMLElement>(".process-number");
      numbers.forEach((num, i) => {
        gsap.from(num, {
          opacity: 0,
          scale: 0.5,
          rotation: -20,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: num,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.08,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing relative">
      <div className="section-container">
        <SectionHeading
          badge="Процесс"
          title="Как мы работаем"
          subtitle="Прозрачный и структурированный подход к каждому проекту."
          align="center"
        />

        {/* Desktop timeline */}
        <div className="relative mt-4 hidden lg:block">
          <div
            ref={lineRef}
            className="absolute left-[10%] right-[10%] top-10 h-px bg-white/10"
          />
          <div
            ref={lineProgressRef}
            className="absolute left-[10%] right-[10%] top-10 h-px origin-left bg-gradient-to-r from-primary via-accent to-lime"
            style={{ transform: "scaleX(0)" }}
          />

          <div className="grid grid-cols-5 gap-4">
            {processSteps.map((step) => {
              const colors = stepColors[step.color];
              return (
                <div
                  key={step.step}
                  className="process-step relative flex flex-col items-center text-center"
                >
                  <div
                    className={cn(
                      "process-number glass relative z-10 mb-5 flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full border-2",
                      colors.ring,
                      colors.glow,
                    )}
                  >
                    <span className="text-lg font-bold leading-none">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "absolute top-10 z-[5] h-2.5 w-2.5 -translate-y-1/2 rounded-full",
                      colors.dot,
                    )}
                  />
                  <h3 className="mb-2 text-base font-semibold text-text sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet timeline */}
        <div className="relative mt-4 lg:hidden">
          <div
            ref={vLineRef}
            className="absolute bottom-0 left-6 top-0 w-px bg-white/10"
          />
          <div
            ref={vLineProgressRef}
            className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-primary via-accent to-lime"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="flex flex-col gap-8 pl-16">
            {processSteps.map((step) => {
              const colors = stepColors[step.color];
              return (
                <div key={step.step} className="process-step relative">
                  <div
                    className={cn(
                      "process-number glass absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold",
                      colors.ring,
                      colors.glow,
                    )}
                  >
                    {String(step.step).padStart(2, "0")}
                  </div>
                  <span
                    className={cn(
                      "absolute -left-[1.65rem] top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full",
                      colors.dot,
                    )}
                  />
                  <h3 className="mb-1.5 text-base font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
