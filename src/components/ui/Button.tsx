import Link from "next/link";
import { cn } from "@/lib/utils";
import { HiArrowRight, HiPlay } from "react-icons/hi2";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  icon?: "arrow" | "play" | "none";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href = "#contacts",
  variant = "primary",
  icon = "none",
  className,
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold transition-all duration-[250ms] ease-out sm:text-base sm:px-7 sm:py-3.5";

  const variants = {
    primary: cn("btn-gradient", className),
    outline: cn("btn-outline-lime rounded-sm", className),
  };

  const content = (
    <>
      {children}
      {icon === "arrow" && <HiArrowRight className="h-4 w-4" />}
      {icon === "play" && <HiPlay className="h-4 w-4" />}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(base, variants[variant])}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant])}>
      {content}
    </Link>
  );
}
