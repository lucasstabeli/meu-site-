import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ParaQuem from "@/components/ParaQuem";
import Frase from "@/components/Frase";
import Services from "@/components/Services";
import SeuNegocio from "@/components/seu-negocio/SeuNegocio";
import RascunhoAoAr from "@/components/RascunhoAoAr";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Ordem da página: design/spec-redesign.md, seção 1.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ParaQuem />
        <Frase />
        <Services />
        <SeuNegocio />
        <RascunhoAoAr />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
