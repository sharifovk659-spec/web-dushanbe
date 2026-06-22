"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  EASE_PREMIUM,
  REVEAL_DURATION,
  STAGGER_GAP,
  mobileRevealOffset,
  revealOffsets,
  type RevealVariant,
} from "@/lib/motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

function buildHidden(variant: RevealVariant, isMobile: boolean) {
  const o = isMobile ? mobileRevealOffset : revealOffsets[variant];
  return {
    opacity: 0,
    x: o.x,
    y: o.y,
    scale: o.scale,
    filter: o.blur > 0 ? `blur(${o.blur}px)` : "none",
  };
}

const visible = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  variant?: RevealVariant;
  eager?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  variant,
  eager = false,
}: FadeInProps) {
  const isMobile = useIsMobile();
  const resolvedVariant: RevealVariant =
    variant ??
    (isMobile
      ? "fadeUp"
      : direction === "left"
        ? "fadeLeft"
        : direction === "right"
          ? "fadeRight"
          : direction === "none"
            ? "scale"
            : "fadeUp");

  const transition = {
    duration: REVEAL_DURATION,
    delay,
    ease: EASE_PREMIUM,
  };

  return (
    <motion.div
      className={cn(className)}
      initial={buildHidden(resolvedVariant, isMobile)}
      {...(eager
        ? { animate: visible, transition }
        : {
            whileInView: visible,
            viewport: { once: true, margin: "-40px" },
            transition,
          })}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp(props: Omit<FadeInProps, "variant" | "direction">) {
  return <FadeIn {...props} variant="fadeUp" />;
}

export function FadeLeft(props: Omit<FadeInProps, "variant" | "direction">) {
  return <FadeIn {...props} variant="fadeLeft" />;
}

export function FadeRight(props: Omit<FadeInProps, "variant" | "direction">) {
  return <FadeIn {...props} variant="fadeRight" />;
}

export function ScaleIn(props: Omit<FadeInProps, "variant" | "direction">) {
  return <FadeIn {...props} variant="scale" />;
}

export function StaggerContainer({
  children,
  className,
  stagger = STAGGER_GAP,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "fadeUp",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: buildHidden(isMobile ? "fadeUp" : variant, isMobile),
        visible: {
          ...visible,
          transition: { duration: REVEAL_DURATION, ease: EASE_PREMIUM },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
