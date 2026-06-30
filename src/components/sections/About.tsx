"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiCheckBadge } from "react-icons/hi2";
import { founder } from "@/data/content";
import { FadeIn } from "@/components/ui/FadeIn";
import { EASE_PREMIUM } from "@/lib/motion";
import styles from "./About.module.css";

function LaurelWreath({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 48"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M14 4C10 10 6 16 6 24C6 32 10 38 14 44"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 14C6 18 5 22 5 26M10 10C8 14 7 18 7 22M12 8C10 12 9 16 9 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M20 14C22 18 23 22 23 26M18 10C20 14 21 18 21 22M16 8C18 12 19 16 19 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AchievementItem({
  highlight,
  text,
  index,
}: {
  highlight: string;
  text: string;
  index: number;
}) {
  return (
    <motion.li
      className={styles.achievement}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: EASE_PREMIUM }}
    >
      <LaurelWreath className={styles.wreathLeft} />
      <p className={styles.achievementText}>
        <span className={styles.achievementHighlight}>{highlight}</span> {text}
      </p>
      <LaurelWreath className={styles.wreathRight} />
    </motion.li>
  );
}

export function About() {
  return (
    <section id="about" className={`${styles.section} section-spacing`}>
      <div className="section-container">
        <div className={styles.layout}>
          <FadeIn variant="fadeUp" className={styles.visualCol}>
            <div className={styles.photoFrame}>
              <div className={styles.photoInner}>
                <Image
                  src={founder.image}
                  alt={founder.name}
                  width={480}
                  height={640}
                  className={styles.photo}
                  priority={false}
                />

                <a
                  href={founder.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.instagramBadge}
                >
                  <span className={styles.instagramLabel}>{founder.instagram.label}</span>
                  <span className={styles.instagramHandle}>
                    <HiCheckBadge className={styles.verifiedIcon} aria-hidden />
                    {founder.instagram.handle}
                  </span>
                </a>
              </div>

              <div className={styles.quoteCard}>
                <div className={styles.quoteAvatar}>
                  <Image
                    src={founder.image}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.quoteAvatarImg}
                    aria-hidden
                  />
                </div>
                <p className={styles.quoteText}>{founder.quote}</p>
              </div>
            </div>
          </FadeIn>

          <div className={styles.contentCol}>
            <FadeIn variant="fadeUp">
              <p className={styles.eyebrow}>{founder.eyebrow}</p>
              <h2 className={styles.name}>{founder.name}</h2>
            </FadeIn>

            <ul className={styles.achievements}>
              {founder.achievements.map((item, index) => (
                <AchievementItem
                  key={`${item.highlight}-${index}`}
                  highlight={item.highlight}
                  text={item.text}
                  index={index}
                />
              ))}
            </ul>

            <FadeIn variant="fadeUp">
              <Link href="#contacts" className={styles.cta}>
                <span className={styles.ctaIcon} aria-hidden>
                  <HiCheckBadge className="h-5 w-5" />
                </span>
                {founder.cta}
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
