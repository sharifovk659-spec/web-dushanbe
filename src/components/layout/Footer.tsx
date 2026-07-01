import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiPhone, HiEnvelope, HiMapPin } from "react-icons/hi2";
import { siteConfig, footerLinks } from "@/data/content";
import { images } from "@/lib/images";
import { FadeIn } from "@/components/ui/FadeIn";
import styles from "./Footer.module.css";

const socials = [
  { Icon: FaInstagram, href: "https://instagram.com/webdushanbe", label: "Instagram" },
  { Icon: FaTelegram, href: "https://t.me/webdushanbe", label: "Telegram" },
  { Icon: FaLinkedin, href: "https://linkedin.com/company/webdushanbe", label: "LinkedIn" },
  { Icon: FaFacebook, href: "https://facebook.com/webdushanbe", label: "Facebook" },
];

export function Footer() {
  return (
    <footer id="blog" className={styles.footer}>
      <div className={styles.bg} aria-hidden>
        <div className={styles.topLine} />
        <div className={`${styles.glow} ${styles.glowLeft}`} />
        <div className={`${styles.glow} ${styles.glowRight}`} />
        <div className={styles.noise} />
      </div>

      <div className={`section-container ${styles.inner}`}>
        <FadeIn variant="fadeUp">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="#hero" className={styles.footerLogoLink}>
              <Image
                src={images.footerLogo}
                alt={siteConfig.name}
                width={140}
                height={140}
                className={styles.footerLogo}
                loading="lazy"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
              {siteConfig.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-sm text-text-secondary transition-all duration-[250ms] ease-out hover:border-[rgba(201,242,77,0.35)] hover:text-lime"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <h4 className="font-display mb-3 text-sm font-semibold text-text">Услуги</h4>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.services.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors hover:text-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display mb-3 text-sm font-semibold text-text">Компания</h4>
                <ul className="flex flex-col gap-2.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors hover:text-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-display mb-3 text-sm font-semibold text-text">Контакты</h4>
                <ul className="flex flex-col gap-2.5">
                  <li>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
                    >
                      <HiPhone className="h-4 w-4 shrink-0 text-lime" />
                      <span>
                        <span className="sr-only">Телефон: </span>
                        {siteConfig.phone}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
                    >
                      <HiEnvelope className="h-4 w-4 shrink-0 text-lime" />
                      <span>
                        <span className="sr-only">Email: </span>
                        {siteConfig.email}
                      </span>
                    </a>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-text-secondary">
                    <HiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                    <span>
                      <span className="sr-only">Адрес: </span>
                      {siteConfig.address}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/8 pt-4 text-center text-xs text-text-secondary sm:text-sm">
          © 2026 {siteConfig.name}
        </div>
        </FadeIn>
      </div>
    </footer>
  );
}
