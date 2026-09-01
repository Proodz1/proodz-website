"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/variants";
import FreeDiagnosticForm from "../forms/FreeDiagnosticForm";

export default function ContactForm() {
  return (
    <section id="contact" style={{ padding: "80px 24px" }}>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{ maxWidth: 760, margin: "0 auto" }}
      >
        <FreeDiagnosticForm />
      </motion.div>
    </section>
  );
}
