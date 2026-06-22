"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { navLinks } from "@/data/content";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const languages = ["RU", "TJ", "EN"] as const;
type Language = (typeof languages)[number];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("RU");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(5, 8, 22, 0.8)" : "rgba(5, 8, 22, 0)",
        borderBottomColor: scrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)",
        paddingTop: scrolled ? 10 : 16,
        paddingBottom: scrolled ? 10 : 16,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[backdrop-filter] duration-400",
        scrolled ? "backdrop-blur-md shadow-md shadow-black/15" : "backdrop-blur-none",
      )}
    >
      <div className="section-container flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors duration-300 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div
            className="flex items-center rounded-xl border border-white/8 bg-white/5 p-1"
            role="group"
            aria-label="Выбор языка"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 sm:text-sm",
                  language === lang
                    ? "bg-primary text-white shadow-[0_0_12px_rgba(79,70,229,0.3)]"
                    : "text-text-secondary hover:text-text",
                )}
                aria-pressed={language === lang}
              >
                {lang}
              </button>
            ))}
          </div>
          <Button href="#contacts" icon="arrow">
            Обсудить проект
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/5 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <HiXMark className="h-5 w-5" />
          ) : (
            <HiBars3 className="h-5 w-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/8 bg-[rgba(5,8,22,0.95)] backdrop-blur-md lg:hidden"
          >
            <nav className="section-container flex flex-col gap-1 py-6" aria-label="Мобильная навигация">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl px-4 py-3 text-base text-text-secondary transition-colors hover:bg-white/5 hover:text-text"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="mt-4 flex gap-2 border-t border-white/8 pt-4">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      "flex-1 rounded-xl py-2.5 text-sm font-medium transition-all duration-300",
                      language === lang
                        ? "bg-primary text-white"
                        : "border border-white/8 text-text-secondary",
                    )}
                    aria-pressed={language === lang}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <Button href="#contacts" icon="arrow" className="w-full">
                  Обсудить проект
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
