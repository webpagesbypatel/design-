"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { CtaButton } from "@/components/ui/cta-button";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="glass-card rounded-2xl p-8 md:p-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
          Ready to transform your digital presence?
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
          Let's discuss how we can help you achieve your business goals with a tailored digital strategy.
        </p>
        <CtaButton href="https://outlook.office.com/book/KibouSystems1@kibousystems.com/?ismsaljsauthenabled">
          Get in touch <ArrowRight className="inline-block" />
        </CtaButton>
      </motion.div>
    </section>
  );
}
