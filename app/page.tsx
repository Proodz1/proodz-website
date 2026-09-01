"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/animations/ScrollProgress";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Partners from "@/components/sections/Partners";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import CTABand from "@/components/sections/CTABand";
import ContactForm from "@/components/sections/ContactForm";
import Chatbot from "@/components/sections/Chatbot";

export default function Home() {
  return (
    <main style={{ background: "#FFFFFF", color: "#0A0A0A", minHeight: "100vh" }}>
      <ScrollProgress />
      <Navbar />

      <Hero />
      <WhyUs />
      <Partners />
      <Services />
      <Process />
      <CTABand />
      <ContactForm />

      <Footer />
      <Chatbot />
    </main>
  );
}
