import { cn } from "@/lib/utils";

interface GlowPulseProps {
  className?: string;
  color?: "primary" | "accent" | "mixed" | "lime";
  parallax?: number;
}

export function GlowPulse({
  className,
  color = "mixed",
  parallax,
}: GlowPulseProps) {
  return (
    <div
      data-parallax={parallax}
      className={cn(
        "glow-pulse pointer-events-none absolute rounded-full blur-2xl",
        color === "primary" && "glow-pulse-primary",
        color === "accent" && "glow-pulse-accent",
        color === "mixed" && "glow-pulse-mixed",
        color === "lime" && "glow-pulse-lime",
        className,
      )}
      aria-hidden
    />
  );
}
