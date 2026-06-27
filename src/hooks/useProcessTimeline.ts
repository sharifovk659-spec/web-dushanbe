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
      start: "top 78%",
      end: "bottom 22%",
      scrub: 0.75,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyFrame(self.progress),
      onRefresh: (self) => remeasure(self.progress),
    });

    const onResize = () => remeasure(scrollTrigger.progress);
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      remeasure(scrollTrigger.progress);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      scrollTrigger.kill();
    };
  }, [section, drawPath, probePath, stepCount]);
}
