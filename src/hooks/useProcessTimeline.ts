"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  applyDrawProgress,
  computeTimelineFrame,
  measureTimeline,
} from "@/lib/processTimeline";
import styles from "@/components/sections/Process.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProcessTimelineRefs = {
  section: RefObject<HTMLElement | null>;
  drawPath: RefObject<SVGPathElement | null>;
  probePath: RefObject<SVGPathElement | null>;
  stepCount: number;
};

export function useProcessTimeline({ section, drawPath, probePath, stepCount }: ProcessTimelineRefs) {
  useEffect(() => {
    const sectionEl = section.current;
    const path = drawPath.current;
    const probe = probePath.current;
    if (!sectionEl || !path || !probe) return;

    const timeline = sectionEl.querySelector<HTMLElement>(".process-timeline");
    if (!timeline) return;

    const nodes = timeline.querySelectorAll<HTMLElement>(".process-node");
    const steps = timeline.querySelectorAll<HTMLElement>(".process-step-desktop");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let metrics = measureTimeline(probe, stepCount);

    const applyFrame = (scrollProgress: number) => {
      const drawnLen = applyDrawProgress(path, metrics, scrollProgress);
      const frame = computeTimelineFrame(metrics, drawnLen, scrollProgress);

      frame.nodeActive.forEach((active, i) => {
        nodes[i]?.classList.toggle(styles.nodeActive, active);
      });
      frame.stepVisible.forEach((visible, i) => {
        steps[i]?.classList.toggle(styles.contentActive, visible);
      });

      const lastNode = nodes[nodes.length - 1];
      const lastStep = steps[steps.length - 1];
      if (lastNode && lastStep) {
        const rect = lastNode.getBoundingClientRect();
        const inView =
          rect.top < window.innerHeight * 0.88 && rect.bottom > window.innerHeight * 0.12;
        if (inView && scrollProgress >= 0.68) {
          lastNode.classList.add(styles.nodeActive);
          lastStep.classList.add(styles.contentActive);
        }
      }
    };

    const remeasure = (scrollProgress: number) => {
      metrics = measureTimeline(probe, stepCount);
      applyFrame(scrollProgress);
    };

    const showAll = () => {
      path.style.strokeDasharray = `${metrics.total}`;
      path.style.strokeDashoffset = "0";
      nodes.forEach((el) => el.classList.add(styles.nodeActive));
      steps.forEach((el) => el.classList.add(styles.contentActive));
    };

    if (reducedMotion) {
      showAll();
      return;
    }

    applyFrame(0);

    const scrollTrigger = ScrollTrigger.create({
      trigger: timeline,
      start: "top 88%",
      end: "bottom bottom",
      scrub: 0.55,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyFrame(self.progress),
      onRefresh: (self) => remeasure(self.progress),
      onLeave: () => applyFrame(1),
      onLeaveBack: () => applyFrame(0),
    });

    const onResize = () => remeasure(scrollTrigger.progress);
    window.addEventListener("resize", onResize);

    const refreshTimeline = () => {
      ScrollTrigger.refresh();
      remeasure(scrollTrigger.progress);
    };

    requestAnimationFrame(refreshTimeline);
    const refreshTimers = [150, 450, 900].map((ms) =>
      window.setTimeout(refreshTimeline, ms),
    );

    return () => {
      window.removeEventListener("resize", onResize);
      refreshTimers.forEach((id) => window.clearTimeout(id));
      scrollTrigger.kill();
    };
  }, [section, drawPath, probePath, stepCount]);
}
