"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/content";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { Counter } from "@/components/animations/Counter";
import { cn } from "@/lib/utils";
import { HiBriefcase, HiUsers, HiClock, HiStar } from "react-icons/hi2";

const iconMap = {
  primary: HiBriefcase,
  lime: HiUsers,
  accent: HiClock,
};

const colorMap = {
  primary: "text-primary bg-primary/15 shadow-[0_0_16px_rgba(201,242,77,0.2)]",
  lime: "text-lime bg-lime/15 shadow-[0_0_16px_rgba(201,242,77,0.2)]",
  accent: "text-accent bg-accent/15 shadow-[0_0_16px_rgba(201,242,77,0.2)]",
};

export function Stats() {
  return (
    <section className="relative pb-4 sm:pb-5">
      <div className="section-container">
        <StaggerContainer className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = i === 3 ? HiStar : iconMap[stat.color];
            return (
              <StaggerItem key={stat.label} variant="scale">
                <motion.div
                  className={cn(
                    "glass group rounded-sm p-4 sm:p-5",
                    "transition-shadow duration-300",
                    "hover:shadow-[0_8px_32px_rgba(201,242,77,0.14)]",
                  )}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                >
                  <div
                    className={cn(
                      "mb-4 flex h-11 w-11 items-center justify-center rounded-sm transition-transform duration-[250ms] ease-out group-hover:scale-[1.08]",
                      colorMap[stat.color],
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold tabular-nums text-text sm:text-3xl lg:text-4xl">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
