"use client";

import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiChartBar,
  HiCircleStack,
  HiCodeBracket,
  HiDevicePhoneMobile,
  HiDocumentText,
  HiLink,
  HiPaintBrush,
  HiRectangleGroup,
  HiShoppingCart,
  HiSquares2X2,
} from "react-icons/hi2";
import { TbApi } from "react-icons/tb";
import { services } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE_PREMIUM } from "@/lib/motion";
import styles from "./ServicesSection.module.css";

const SERVICE_ICONS = {
  code: HiCodeBracket,
  mobile: HiDevicePhoneMobile,
  crm: HiCircleStack,
  design: HiPaintBrush,
} as const;

const TAG_ICONS = {
  layout: HiRectangleGroup,
  api: TbApi,
  cart: HiShoppingCart,
  mobile: HiDevicePhoneMobile,
  flutter: HiSquares2X2,
  store: HiShoppingCart,
  automation: HiLink,
  chart: HiChartBar,
  link: HiLink,
  design: HiPaintBrush,
  prototype: HiDocumentText,
  system: HiSquares2X2,
} as const;

const STAGGER = 0.1;

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_PREMIUM },
  },
};

type Service = (typeof services)[number];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = SERVICE_ICONS[service.icon as keyof typeof SERVICE_ICONS];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className={styles.card}>
      <div className={styles.cardInner}>
        <span className={styles.number} aria-hidden>
          {number}
        </span>

        <div className={styles.iconBox}>
          <Icon className="h-7 w-7" aria-hidden />
        </div>

        <h3 className={styles.title}>
          <span className={styles.titleDefault}>{service.title}</span>
          <span className={styles.titleHover} aria-hidden>
            {service.title}
          </span>
        </h3>

        <p className={styles.description}>{service.description}</p>

        <div className={styles.divider} aria-hidden />

        <div className={styles.footer}>
          <ul className={styles.tags}>
            {service.tags.map((tag) => {
              const TagIcon = TAG_ICONS[tag.icon as keyof typeof TAG_ICONS];
              return (
                <li key={tag.label}>
                  <span className={styles.tag}>
                    <span className={styles.tagIconBox}>
                      <TagIcon className={styles.tagIcon} aria-hidden />
                    </span>
                    <span className={styles.tagLabel}>{tag.label}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <span className={styles.arrow} aria-hidden>
            <HiArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className={`${styles.section} section-spacing`}>
      <div className={`section-container ${styles.inner}`}>
        <SectionHeading
          badge="Услуги"
          title="Наши услуги"
          subtitle="Полный цикл разработки — от идеи до запуска и продвижения."
        />

        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className={styles.gridItem}
            >
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
