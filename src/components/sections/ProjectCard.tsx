"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
import type { PortfolioItem } from "@/data/content";
import { useIsDesktop } from "@/hooks/useMediaQuery";

type ProjectCardProps = {
  project: PortfolioItem;
  ctaLabel?: string;
};

export function ProjectCard({ project, ctaLabel = "Смотреть проект" }: ProjectCardProps) {
  const isDesktop = useIsDesktop();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: y * -6, rotateY: x * 6 });
    },
    [isDesktop],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
  }, []);

  return (
    <div className="h-full" style={{ perspective: isDesktop ? 1200 : undefined }}>
      <motion.div
        ref={cardRef}
        className="group relative h-full"
        style={{ transformStyle: isDesktop ? "preserve-3d" : undefined }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={
          isDesktop
            ? {
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
                scale: hovered ? 1.015 : 1,
              }
            : { scale: 1 }
        }
        transition={{
          rotateX: { type: "spring", stiffness: 300, damping: 24 },
          rotateY: { type: "spring", stiffness: 300, damping: 24 },
          scale: { type: "spring", stiffness: 300, damping: 22 },
        }}
      >
        <div
          className={`glass flex h-full min-h-[420px] flex-col overflow-hidden rounded-sm transition-all duration-[250ms] ease-out sm:min-h-[440px] ${
            hovered
              ? "-translate-y-[5px] border-[rgba(201,242,77,0.35)] shadow-[0_10px_36px_rgba(201,242,77,0.12)]"
              : "shadow-[0_2px_14px_rgba(0,0,0,0.2)]"
          }`}
        >
          <div className="flex items-center justify-between gap-2 p-4 pb-2">
            <h3 className="font-display text-base font-semibold text-text">{project.title}</h3>
            <span className="shrink-0 rounded-sm border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-text-secondary">
              {project.category}
            </span>
          </div>

          <div className="relative mx-3 overflow-hidden rounded-sm border border-white/10 sm:mx-4">
            <Image
              src={project.image}
              alt={`Скриншот проекта ${project.title}`}
              width={600}
              height={360}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="h-[150px] w-full object-cover object-top transition-transform duration-400 group-hover:scale-[1.02] sm:h-[170px]"
            />
          </div>

          <ul className="flex flex-1 flex-col gap-1.5 p-4 pt-3">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <HiCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t border-white/8 p-4">
            <Link
              href={project.url}
              className="btn-gradient inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-semibold text-[#050505]"
            >
              {ctaLabel}
              <HiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
