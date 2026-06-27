"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { navLinks, siteConfig } from "@/data/content";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";
import styles from "./Header.module.css";

const languages = ["RU", "TJ", "EN"] as const;
type Language = (typeof languages)[number];

function HeaderLogo() {
  return (
    <Link href="#hero" className={styles.logoLink} aria-label={siteConfig.name}>
      <span className={styles.logoBox}>
        <Image
          src={images.logo}
          alt={siteConfig.name}
          width={44}
          height={44}
          priority
          className={styles.logoImg}
        />
      </span>
    </Link>
  );
}

/** Lime "worm" that crawls around the CTA border; its glow stays inside. */
function CtaWorm({ paused }: { paused: boolean }) {
  return (
    <svg className={styles.ctaWormSvg} aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="ctaWormGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        className={cn(styles.ctaWormGlowRect, paused && styles.ctaWormPaused)}
        x="1"
        y="1"
        width="98"
        height="98"
        rx="6"
        ry="6"
        pathLength={100}
        filter="url(#ctaWormGlow)"
      />
      <rect
        className={cn(styles.ctaWormRect, paused && styles.ctaWormPaused)}
        x="1"
        y="1"
        width="98"
        height="98"
        rx="6"
        ry="6"
        pathLength={100}
      />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("RU");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={cn(styles.bar, scrolled && styles.barScrolled)}>
        <HeaderLogo />

        <div className={styles.ctaWrap}>
          <Link href="#contacts" className={styles.cta}>
            <span className={styles.ctaInner}>
              Обсудить проект
              <HiArrowRight className={styles.ctaArrow} aria-hidden />
            </span>
            <CtaWorm paused={Boolean(reducedMotion)} />
          </Link>
        </div>

        <button
          type="button"
          className={cn(styles.menuBtn, menuOpen && styles.menuOpen)}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
        >
          <span className={styles.menuLines}>
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className={styles.drawer}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-label="Навигация"
            >
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.25, ease: "easeOut" }}
                  >
                    <a
                      href={link.href}
                      className="block rounded-sm px-3 py-2.5 text-sm text-white/65 transition-colors duration-[250ms] ease-out hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 flex gap-2 border-t border-white/8 pt-4">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "flex-1 rounded-sm py-2 text-xs font-medium transition-all duration-[250ms] ease-out",
                      language === lang
                        ? "border border-[#c9f24d]/40 bg-[#c9f24d]/10 text-[#c9f24d]"
                        : "border border-white/10 text-white/50 hover:text-white/80",
                    )}
                    aria-pressed={language === lang}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <Link
                href="#contacts"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white transition-all duration-[250ms] ease-out hover:border-[#c9f24d]/35 hover:text-[#c9f24d]"
                onClick={() => setMenuOpen(false)}
              >
                Обсудить проект
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
