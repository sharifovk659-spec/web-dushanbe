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
        "glass rounded-sm",
        hover &&
          "transition-all duration-[250ms] ease-out hover:-translate-y-[5px] hover:border-[rgba(201,242,77,0.35)] hover:shadow-[0_8px_32px_rgba(201,242,77,0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
