import { products } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function Products() {
  return (
    <div id="products" className="mt-8 sm:mt-10">
      <SectionHeading
        badge="Продукт"
        title="Наш продукт"
        subtitle="Готовые цифровые решения — CRM, e-commerce и мобильные приложения под ключ."
      />

      <StaggerContainer className="grid auto-rows-fr gap-2.5 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <StaggerItem key={product.id} variant="fadeUp" className="h-full">
            <ProjectCard project={product} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
