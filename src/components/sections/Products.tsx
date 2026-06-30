import { products } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { GlowPulse } from "@/components/animations/GlowPulse";

export function Products() {
  return (
    <section id="products" className="section-spacing relative overflow-hidden">
      <div className="section-glow" aria-hidden />
      <GlowPulse
        parallax={0.35}
        color="lime"
        className="right-0 top-1/2 h-48 w-48 -translate-y-1/2"
      />

      <div className="section-container relative">
        <SectionHeading
          badge="Продукт"
          title="Наш продукт"
          subtitle="Готовые цифровые решения — CRM, e-commerce и мобильные приложения под ключ."
        />

        <StaggerContainer className="grid auto-rows-fr gap-2.5 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.id} variant="fadeUp" className="h-full">
              <ProjectCard project={product} ctaLabel="Подробнее" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
