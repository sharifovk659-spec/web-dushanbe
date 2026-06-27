"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  HiArrowRight,
  HiCheck,
  HiClock,
  HiEnvelope,
  HiMapPin,
  HiPhone,
} from "react-icons/hi2";
import { FaInstagram, FaTelegram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { siteConfig } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowPulse } from "@/components/animations/GlowPulse";
import { EASE_PREMIUM } from "@/lib/motion";
import styles from "./Contact.module.css";

const socials = [
  { Icon: FaTelegram, href: "https://t.me/webdushanbe", label: "Telegram" },
  { Icon: FaInstagram, href: "https://instagram.com/webdushanbe", label: "Instagram" },
  { Icon: FaLinkedin, href: "https://linkedin.com/company/webdushanbe", label: "LinkedIn" },
  { Icon: FaFacebook, href: "https://facebook.com/webdushanbe", label: "Facebook" },
];

const serviceOptions = [
  "Веб-разработка",
  "Мобильное приложение",
  "CRM система",
  "UI/UX дизайн",
  "Другое",
];

const budgetOptions = [
  "$500 – $1 000",
  "$1 000 – $5 000",
  "$5 000 – $10 000+",
];

const infoVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: EASE_PREMIUM },
  }),
};

const formVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.12, ease: EASE_PREMIUM },
  },
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  service: serviceOptions[0],
  budget: budgetOptions[0],
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    const subject = encodeURIComponent(`Заявка с сайта — ${form.name}`);
    const body = encodeURIComponent(
      [
        `Имя: ${form.name}`,
        `Телефон: ${form.phone}`,
        `Email: ${form.email}`,
        `Услуга: ${form.service}`,
        `Бюджет: ${form.budget}`,
        "",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    await new Promise((resolve) => window.setTimeout(resolve, 600));

    setSubmitting(false);
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section id="contacts" className={`section-spacing ${styles.section}`}>
      <div className="section-glow" aria-hidden />
      <GlowPulse parallax={0.22} color="lime" className="-left-20 top-1/4 h-56 w-56" />
      <GlowPulse parallax={0.18} color="lime" className="-right-16 bottom-0 h-64 w-64" />

      <div className={`section-container ${styles.inner}`}>
        <SectionHeading
          badge="Контакты"
          title="Свяжитесь с нами"
          subtitle="Расскажите о проекте — мы ответим в течение рабочего дня и предложим оптимальное решение."
          align="center"
        />

        <div className={styles.layout}>
          <div className={styles.infoGrid}>
            <motion.a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className={`${styles.infoCard} ${styles.infoLink}`}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={infoVariants}
            >
              <div className={styles.infoIcon}>
                <HiPhone className="h-5 w-5" aria-hidden />
              </div>
              <p className={styles.infoLabel}>Телефон</p>
              <p className={styles.infoValue}>{siteConfig.phone}</p>
            </motion.a>

            <motion.a
              href={`mailto:${siteConfig.email}`}
              className={`${styles.infoCard} ${styles.infoLink}`}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={infoVariants}
            >
              <div className={styles.infoIcon}>
                <HiEnvelope className="h-5 w-5" aria-hidden />
              </div>
              <p className={styles.infoLabel}>Email</p>
              <p className={styles.infoValue}>{siteConfig.email}</p>
            </motion.a>

            <motion.div
              className={styles.infoCard}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={infoVariants}
            >
              <div className={styles.infoIcon}>
                <HiMapPin className="h-5 w-5" aria-hidden />
              </div>
              <p className={styles.infoLabel}>Адрес</p>
              <p className={styles.infoValue}>{siteConfig.address}</p>
            </motion.div>

            <motion.div
              className={styles.hoursCard}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={infoVariants}
            >
              <div className={styles.infoIcon}>
                <HiClock className="h-5 w-5" aria-hidden />
              </div>
              <p className={styles.infoLabel}>Режим работы</p>
              <p className={styles.infoValue}>Пн–Пт: 9:00 – 18:00</p>
              <div className={styles.socialRow}>
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={styles.socialBtn}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.formPanel}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={formVariants}
          >
            {submitted ? (
              <motion.div
                className={styles.successPanel}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
              >
                <div className={styles.successIcon}>
                  <HiCheck className="h-8 w-8" aria-hidden />
                </div>
                <h3 className={styles.successTitle}>Заявка отправлена</h3>
                <p className={styles.successText}>
                  Спасибо! Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
                </p>
                <button
                  type="button"
                  className={`${styles.submitBtn} mt-6 !w-auto !px-8`}
                  onClick={() => setSubmitted(false)}
                >
                  Отправить ещё
                </button>
              </motion.div>
            ) : (
              <div className={styles.formInner}>
                <h3 className={styles.formTitle}>Оставить заявку</h3>
                <p className={styles.formSubtitle}>
                  Заполните форму — менеджер свяжется с вами для бесплатной консультации.
                </p>

                <form className={styles.formGrid} onSubmit={handleSubmit} noValidate>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-name">
                      Имя
                    </label>
                    <input
                      id="contact-name"
                      className={styles.input}
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-phone">
                      Телефон
                    </label>
                    <input
                      id="contact-phone"
                      className={styles.input}
                      type="tel"
                      name="phone"
                      placeholder="+992 90 000 00 00"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      required
                      autoComplete="tel"
                    />
                  </div>

                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      className={styles.input}
                      type="email"
                      name="email"
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-service">
                      Услуга
                    </label>
                    <select
                      id="contact-service"
                      className={styles.select}
                      name="service"
                      value={form.service}
                      onChange={(e) => updateField("service", e.target.value)}
                    >
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-budget">
                      Бюджет
                    </label>
                    <select
                      id="contact-budget"
                      className={styles.select}
                      name="budget"
                      value={form.budget}
                      onChange={(e) => updateField("budget", e.target.value)}
                    >
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="contact-message">
                      Сообщение
                    </label>
                    <textarea
                      id="contact-message"
                      className={styles.textarea}
                      name="message"
                      placeholder="Расскажите кратко о вашем проекте..."
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.fieldFull}>
                    <button type="submit" className={styles.submitBtn} disabled={submitting}>
                      {submitting ? "Отправка..." : "Отправить заявку"}
                      {!submitting && <HiArrowRight className="h-4 w-4" aria-hidden />}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
