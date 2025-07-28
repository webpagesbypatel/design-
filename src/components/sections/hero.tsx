
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CtaButton } from "@/components/ui/cta-button";
import { ParticleCanvas } from "@/components/particle-canvas";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const parallax = (factor: number) => {
    if (typeof window !== 'undefined') {
        const x = (mousePosition.x - window.innerWidth / 2) * factor;
        const y = (mousePosition.y - window.innerHeight / 2) * factor;
        return { x, y };
    }
    return {x: 0, y: 0}
  };

  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" ref={sectionRef} className="relative h-[100svh] flex items-center justify-center text-center overflow-hidden aurora-background">
      <ParticleCanvas />
      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        <motion.div
          animate={{ x: parallax(0.02).x, y: parallax(0.02).y }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-8"
        >
          <motion.h1
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-headline tracking-tighter text-gradient leading-tight"
          >
            Digital Experiences
            <br />
            that Drive Growth.
          </motion.h1>
        </motion.div>
        
        <motion.div
          animate={{ x: parallax(0.01).x, y: parallax(0.01).y }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-12"
        >
          <motion.p
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl text-lg md:text-xl text-muted-foreground"
          >
            We help ambitious businesses like yours grow with a beautiful digital presence, cutting-edge tech, and flawless development.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          <CtaButton href="#contact">Get Free Consultation</CtaButton>
        </motion.div>
      </div>
    </section>
  );
}
