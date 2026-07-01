import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Stats } from "@/components/sections/Stats";

const Projects = dynamic(
  () => import("@/components/sections/Projects").then((m) => m.Projects),
);
const About = dynamic(
  () => import("@/components/sections/About").then((m) => m.About),
);
const ServicesSection = dynamic(
  () =>
    import("@/components/sections/ServicesSection").then(
      (m) => m.ServicesSection,
    ),
);
const Process = dynamic(
  () => import("@/components/sections/Process").then((m) => m.Process),
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
);
const CTA = dynamic(() => import("@/components/sections/CTA").then((m) => m.CTA));
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Stats />
        <About />
        <Projects />
        <ServicesSection />
        <CTA />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
