"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { ParticleCanvas } from '@/components/particle-canvas';
import { CtaButton } from '@/components/ui/cta-button';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // For initial fade-in animation
    const timeout = setTimeout(() => {
        setInView(true);
    }, 100);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroRef.current;
      const xPos = (clientX / offsetWidth - 0.5) * 2;
      const yPos = (clientY / offsetHeight - 0.5) * 2;

      const headline = heroRef.current.querySelector('h1');
      const paragraph = heroRef.current.querySelector('p');

      if (headline) {
        headline.style.transform = `translateX(${xPos * -15}px) translateY(${yPos * -10}px)`;
      }
      if (paragraph) {
        paragraph.style.transform = `translateX(${xPos * 8}px) translateY(${yPos * 5}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        clearTimeout(timeout)
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      <ParticleCanvas />
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h1 
                className={cn(
                    "font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-gradient leading-tight transition-all duration-1000 ease-kibou",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{transitionProperty: 'transform, opacity, transform'}}
            >
                Digital Experiences that Drive Growth.
            </h1>
            <p 
                className={cn(
                    "mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground transition-all duration-1000 ease-kibou",
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{transitionDelay: '200ms', transitionProperty: 'transform, opacity, transform'}}
            >
                We are a digital product studio that partners with ambitious businesses to design, build, and scale beautiful, high-performance web applications.
            </p>
            <div 
                className={cn(
                    "mt-10 transition-opacity duration-1000 ease-kibou",
                     inView ? "opacity-100" : "opacity-0"
                )}
                style={{transitionDelay: '400ms'}}
            >
              <CtaButton href="#contact">Get Free Consultation</CtaButton>
            </div>
        </div>
      </div>
    </section>
  );
}
