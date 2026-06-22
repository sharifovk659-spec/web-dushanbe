import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Stats } from "@/components/sections/Stats";

const Projects = dynamic(
  () => import("@/components/sections/Projects").then((m) => m.Projects),
);
const Services = dynamic(
  () => import("@/components/sections/Services").then((m) => m.Services),
);
const Process = dynamic(
  () => import("@/components/sections/Process").then((m) => m.Process),
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
);
const CTA = dynamic(() => import("@/components/sections/CTA").then((m) => m.CTA));

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Stats />
        <Projects />
        <Services />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
