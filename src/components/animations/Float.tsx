"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
}

export function Float({
  children,
  className,
  distance = 14,
  duration = 5,
  delay = 0,
}: FloatProps) {
  return (
    <motion.div
      className={cn(className)}
      animate={{ y: [0, -distance, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
