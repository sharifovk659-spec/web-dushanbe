import { projects } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Products } from "@/components/sections/Products";
import { GlowPulse } from "@/components/animations/GlowPulse";

export function Projects() {
  return (
    <section id="projects" className="section-spacing relative overflow-hidden">
      <div className="section-glow" aria-hidden />
      <GlowPulse
        parallax={0.4}
        color="lime"
        className="left-1/2 top-0 h-48 w-48 -translate-x-1/2"
      />

      <div className="section-container relative">
        <SectionHeading
          badge="Портфолио"
          title="Наши проекты"
          subtitle="Премиальные решения для бизнеса — от маркетплейсов до CRM и e-commerce."
        />

        <StaggerContainer className="grid auto-rows-fr gap-2.5 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.id} variant="fadeUp" className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Products />
      </div>
    </section>
  );
}
