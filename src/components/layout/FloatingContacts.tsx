"use client";

import { FaWhatsapp } from "react-icons/fa";
import { HiPhone, HiChatBubbleLeftRight } from "react-icons/hi2";
import { useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/content";
import { cn } from "@/lib/utils";
import styles from "./FloatingContacts.module.css";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

const contacts = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${phoneDigits}`,
    Icon: FaWhatsapp,
  },
  {
    label: "Позвонить",
    href: `tel:+${phoneDigits}`,
    Icon: HiPhone,
  },
  {
    label: "Telegram",
    href: "https://t.me/webdushanbe",
    Icon: HiChatBubbleLeftRight,
  },
] as const;

function ContactWorm({ id, paused }: { id: string; paused: boolean }) {
  const filterId = `contact-worm-glow-${id}`;

  return (
    <svg className={styles.wormSvg} aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        className={cn(styles.wormGlow, paused && styles.wormPaused)}
        x="1"
        y="1"
        width="98"
        height="98"
        rx="5"
        ry="5"
        pathLength={100}
        filter={`url(#${filterId})`}
      />
      <rect
        className={cn(styles.worm, paused && styles.wormPaused)}
        x="1"
        y="1"
        width="98"
        height="98"
        rx="5"
        ry="5"
        pathLength={100}
      />
    </svg>
  );
}

export function FloatingContacts() {
  const reducedMotion = useReducedMotion();

  return (
    <nav className={styles.dock} aria-label="Быстрые контакты">
      {contacts.map(({ label, href, Icon }, index) => (
        <a
          key={label}
          href={href}
          className={styles.item}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          title={label}
        >
          <span className={styles.btn}>
            <ContactWorm id={String(index)} paused={Boolean(reducedMotion)} />
            <Icon className={styles.icon} aria-hidden />
          </span>
        </a>
      ))}
    </nav>
  );
}
