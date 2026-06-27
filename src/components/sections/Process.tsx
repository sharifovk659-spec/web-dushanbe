"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/content";
import type { ThemeColor } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowPulse } from "@/components/animations/GlowPulse";
import { cn } from "@/lib/utils";
import { useProcessTimeline } from "@/hooks/useProcessTimeline";
import {
  buildSerpentinePath,
  getNodePosition,
  getViewBoxHeight,
  VB_W,
  X_LEFT,
} from "@/lib/processTimeline";
import styles from "./Process.module.css";

gsap.registerPlugin(ScrollTrigger);

const STEP_COUNT = processSteps.length;
const PATH_D = buildSerpentinePath(STEP_COUNT);
const VB_H = getViewBoxHeight(STEP_COUNT);
const START_LEFT_PCT = (X_LEFT / VB_W) * 100;

const stepColors: Record<
  ThemeColor,
  { ring: string; glow: string; dot: string; num: string }
> = {
  primary: {
    ring: "border-primary/50 text-primary",
    glow: "shadow-[0_0_16px_rgba(201,242,77,0.25)]",
    dot: "bg-primary",
    num: styles.stepNumPrimary,
  },
  lime: {
    ring: "border-lime/50 text-lime",
    glow: "shadow-[0_0_16px_rgba(201,242,77,0.25)]",
    dot: "bg-lime",
    num: styles.stepNumLime,
  },
  accent: {
    ring: "border-accent/50 text-accent",
    glow: "shadow-[0_0_16px_rgba(201,242,77,0.25)]",
    dot: "bg-accent",
    num: styles.stepNumAccent,
  },
};

const nodeColorClass: Record<ThemeColor, string> = {
  primary: styles.nodePrimary,
  lime: styles.nodeLime,
  accent: styles.nodeAccent,
};

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const probeRef = useRef<SVGPathElement>(null);
  const vLineProgressRef = useRef<HTMLDivElement>(null);

  useProcessTimeline({
    section: sectionRef,
    drawPath: drawRef,
    probePath: probeRef,
    stepCount: STEP_COUNT,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (vLineProgressRef.current) {
        gsap.fromTo(
          vLineProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>(".process-step-mobile").forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.05,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing relative overflow-hidden">
      <div className="section-glow" aria-hidden />
      <GlowPulse color="lime" className="right-0 top-1/4 h-40 w-40 opacity-60" />
      <div className="section-container">
        <SectionHeading
          badge="Процесс"
          title="Как мы работаем"
          subtitle="Прозрачный и структурированный подход к каждому проекту."
        />

        <div
          className={cn("process-timeline relative mx-auto mt-8 hidden lg:block", styles.timeline)}
          style={{ height: `${STEP_COUNT * 26}rem` }}
        >
          <svg
            className={styles.svg}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <path ref={probeRef} className={styles.probe} d={PATH_D} />
            <path className={styles.baseLine} d={PATH_D} />
            <path ref={drawRef} className={styles.drawLine} d={PATH_D} />
          </svg>

          <span
            className={styles.startDot}
            style={{ left: `${START_LEFT_PCT}%`, top: 0 }}
            aria-hidden
          />

          {processSteps.map((step, i) => {
            const pos = getNodePosition(i, STEP_COUNT);
            const isRight = i % 2 === 0;
            const colors = stepColors[step.color];

            return (
              <div key={step.step}>
                <span
                  className={cn("process-node", styles.node, nodeColorClass[step.color])}
                  style={{ left: `${pos.leftPct}%`, top: `${pos.topPct}%` }}
                  aria-hidden
                />
                <div
                  className={cn(
                    "process-step-desktop",
                    styles.content,
                    isRight ? styles.contentRight : styles.contentLeft,
                  )}
                  style={
                    isRight
                      ? { top: `${pos.topPct}%`, left: `calc(${pos.leftPct}% + 64px)` }
                      : { top: `${pos.topPct}%`, right: `calc(${100 - pos.leftPct}% + 64px)` }
                  }
                >
                  <span className={cn(styles.stepNum, colors.num)}>
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mb-2 text-xl font-semibold text-text">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative mt-4 lg:hidden">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-white/10" />
          <div
            ref={vLineProgressRef}
            className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-lime/20 via-lime to-lime/20"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="flex flex-col gap-8 pl-16">
            {processSteps.map((step) => {
              const colors = stepColors[step.color];
              return (
                <div key={step.step} className="process-step-mobile relative">
                  <div
                    className={cn(
                      "glass absolute -left-16 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold",
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
                  <h3 className="font-display mb-1.5 text-base font-semibold text-text">{step.title}</h3>
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
