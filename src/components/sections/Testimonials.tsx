"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HiStar } from "react-icons/hi2";
import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 из 5 звёзд">
      <span className="sr-only">★★★★★</span>
      {Array.from({ length: 5 }).map((_, i) => (
        <HiStar key={i} className="h-4 w-4 fill-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="section-spacing relative">
      <div className="glow-blob -left-32 bottom-0 h-56 w-56 bg-primary/12" />

      <div className="section-container relative">
        <SectionHeading
          badge="Отзывы"
          title="Отзывы клиентов"
          subtitle="Что говорят о нас те, с кем мы работали."
          align="center"
        />

        <FadeIn variant="fadeUp">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            loop
            speed={700}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 20 },
              1280: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="testimonials-swiper !pb-10"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <GlassCard hover className="flex h-full flex-col p-4 sm:p-5">
                  <div
                    className={cn(
                      "mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
                      item.gradient,
                    )}
                    aria-hidden
                  >
                    {item.initials}
                  </div>

                  <p className="text-sm font-semibold text-text sm:text-base">
                    {item.name}
                  </p>
                  <p className="mb-4 text-xs text-text-secondary sm:text-sm">
                    {item.company}
                  </p>

                  <p className="mb-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <Stars />
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>
      </div>
    </section>
  );
}
