import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn variant="fadeUp" className={cn("mb-4 sm:mb-5", className)}>
      <div
        className={cn(
          "flex flex-col gap-2",
          align === "center" && "items-center text-center",
        )}
      >
        {badge && (
          <span className="glass inline-flex w-fit rounded-sm px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-text-secondary sm:text-sm">
            {badge}
          </span>
        )}
        <h2 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-2xl text-sm text-text-secondary sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
