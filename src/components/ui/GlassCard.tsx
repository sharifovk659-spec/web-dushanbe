import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        hover &&
          "transition-all duration-300 hover:border-white/15 hover:shadow-[0_4px_24px_rgba(79,70,229,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
