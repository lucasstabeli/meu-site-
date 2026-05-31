import Navbar          from "@/components/Navbar";
import Hero            from "@/components/Hero";
import Marquee         from "@/components/Marquee";
import Services        from "@/components/Services";
import Stats           from "@/components/Stats";
import Showcase        from "@/components/Showcase";
import LiveDemo        from "@/components/LiveDemo";
import EffectsShowcase from "@/components/EffectsShowcase";
import Process         from "@/components/Process";
import Contact         from "@/components/Contact";
import Footer          from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Stats />
        <Showcase />
        <LiveDemo />
        <EffectsShowcase />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
