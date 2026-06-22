"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  HiCloud,
  HiCircleStack,
  HiShieldCheck,
  HiCommandLine,
} from "react-icons/hi2";
import { TbApi } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";
import { useIsDesktop, useIsMobile } from "@/hooks/useMediaQuery";

const NODES = [
  { id: "code", label: "Code", icon: "code", angle: -90 },
  { id: "ai", label: "AI", icon: "ai", angle: -30 },
  { id: "cloud", label: "Cloud", icon: "cloud", angle: 30 },
  { id: "database", label: "Database", icon: "database", angle: 90 },
  { id: "api", label: "API", icon: "api", angle: 150 },
  { id: "security", label: "Security", icon: "security", angle: 210 },
] as const;

const ORBIT_RADIUS = 42;

function NodeIcon({ type }: { type: (typeof NODES)[number]["icon"] }) {
  const className = "h-4 w-4";
  switch (type) {
    case "code":
      return (
        <span className="font-mono text-sm font-bold text-accent">
          {"</>"}
        </span>
      );
    case "ai":
      return <span className="text-sm font-bold text-[#8B5CF6]">AI</span>;
    case "cloud":
      return <HiCloud className={cn(className, "text-accent")} />;
    case "database":
      return <HiCircleStack className={cn(className, "text-primary")} />;
    case "api":
      return <TbApi className={cn(className, "text-accent")} />;
    case "security":
      return <HiShieldCheck className={cn(className, "text-[#8B5CF6]")} />;
    default:
      return <HiCommandLine className={className} />;
  }
}

export function HeroTechCore() {
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const mouseRef = useRef({ x: 0, y: 0 });
  const coreRef = useRef<HTMLDivElement>(null);
  const particleCount = isMobile ? 8 : 16;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || !coreRef.current) return;
      const rect = coreRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
      coreRef.current.style.transform = `perspective(1200px) rotateX(${mouseRef.current.y * -5}deg) rotateY(${mouseRef.current.x * 6}deg)`;
    },
    [isDesktop],
  );

  const handleMouseLeave = useCallback(() => {
    if (!coreRef.current) return;
    mouseRef.current = { x: 0, y: 0 };
    coreRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <div className="hero-tech-scene relative mx-auto flex h-[min(300px,62vw)] w-full items-center justify-center lg:mx-0 lg:h-[360px]">
      <div className="hero-tech-grid absolute inset-0 rounded-2xl" aria-hidden />
      <div className="hero-tech-glow-blue absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden />
      <div className="hero-tech-glow-purple absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden />

      <svg className="hero-digital-lines absolute inset-0 h-full w-full" aria-hidden>
        <line x1="0%" y1="30%" x2="100%" y2="70%" />
        <line x1="20%" y1="0%" x2="80%" y2="100%" />
        <line x1="100%" y1="20%" x2="0%" y2="80%" />
      </svg>

      <div className="hero-particles absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
        {Array.from({ length: particleCount }).map((_, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 8) % 90}%`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={coreRef}
        className="hero-tech-core relative h-full w-full transition-transform duration-300 ease-out"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="neonLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const cx = 200;
            const cy = 200;
            const nx = cx + Math.cos(rad) * 155;
            const ny = cy + Math.sin(rad) * 155;
            return (
              <line
                key={node.id}
                x1={cx}
                y1={cy}
                x2={nx}
                y2={ny}
                stroke="url(#neonLine)"
                strokeWidth="1.5"
                className="hero-neon-line"
              />
            );
          })}
        </svg>

        {isDesktop ? (
          <motion.div
            className="hero-cube-wrap absolute left-1/2 top-1/2 z-20"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <div className="hero-cube">
              <div className="hero-cube-face hero-cube-front">
                <Image
                  src={images.logo}
                  alt=""
                  width={48}
                  height={48}
                  priority
                  className="h-10 w-10 sm:h-11 sm:w-11"
                  aria-hidden
                />
                <span className="mt-1 text-[9px] font-bold tracking-wider text-white/90">
                  WEB DUSHANBE
                </span>
              </div>
              <div className="hero-cube-face hero-cube-back" />
              <div className="hero-cube-face hero-cube-right" />
              <div className="hero-cube-face hero-cube-left" />
              <div className="hero-cube-face hero-cube-top" />
              <div className="hero-cube-face hero-cube-bottom" />
            </div>
            <div className="hero-cube-pulse absolute inset-0 -z-10 rounded-2xl" aria-hidden />
          </motion.div>
        ) : (
          <div className="hero-cube-wrap absolute left-1/2 top-1/2 z-20">
            <div className="hero-cube">
              <div className="hero-cube-face hero-cube-front">
                <Image
                  src={images.logo}
                  alt=""
                  width={48}
                  height={48}
                  priority
                  className="h-10 w-10"
                  aria-hidden
                />
                <span className="mt-1 text-[9px] font-bold tracking-wider text-white/90">
                  WEB DUSHANBE
                </span>
              </div>
              <div className="hero-cube-face hero-cube-back" />
              <div className="hero-cube-face hero-cube-right" />
              <div className="hero-cube-face hero-cube-left" />
              <div className="hero-cube-face hero-cube-top" />
              <div className="hero-cube-face hero-cube-bottom" />
            </div>
          </div>
        )}

        {NODES.map((node, i) => (
          <motion.div
            key={node.id}
            className="hero-node glass absolute z-30 flex flex-col items-center gap-1 px-2.5 py-2 sm:px-3 sm:py-2.5"
            style={{
              left: `${50 + Math.cos((node.angle * Math.PI) / 180) * ORBIT_RADIUS}%`,
              top: `${50 + Math.sin((node.angle * Math.PI) / 180) * ORBIT_RADIUS}%`,
              transform: "translate(-50%, -50%)",
            }}
            {...(isDesktop
              ? {
                  animate: { y: [0, -8, 0] },
                  transition: {
                    duration: 4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                }
              : {})}
          >
            <NodeIcon type={node.icon} />
            <span className="text-[10px] font-medium text-text-secondary">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
