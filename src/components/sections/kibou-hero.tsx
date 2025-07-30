
"use client";

import React from 'react';
import Image from 'next/image';
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { ParticleCanvas } from '@/components/particle-canvas';

// Header Component
const navLinks = ["Services", "Blogs", "Contact"];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    React.useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-kibou",
          hasScrolled ? "py-2" : "py-4"
        )}
      >
        <div className={cn(
            "container mx-auto flex items-center justify-between px-4 py-3 rounded-full transition-all duration-300 ease-kibou",
            hasScrolled ? "max-w-6xl glass-card shadow-lg mt-2" : "max-w-full"
        )}>
          <a href="#home" className="text-2xl font-bold font-headline tracking-tighter">
            Kibou Systems
            <span className="text-kibou-violet">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="group relative text-sm font-medium text-foreground hover:text-foreground/80 transition-colors duration-300"
              >
                {link}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-gradient-to-r from-kibou-indigo to-kibou-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <CtaButton href="https://outlook.office.com/book/KibouSystems1@kibousystems.com/?ismsaljsauthenabled">Get Free Consultation</CtaButton>
          </div>
          <button onClick={toggleMenu} className="md:hidden text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
       {/* Mobile Menu */}
       <div className={cn(
        "fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg transition-transform duration-500 ease-kibou md:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-end p-6">
            <button onClick={toggleMenu} className="text-foreground">
                <X className="h-7 w-7"/>
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full -mt-16 gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={toggleMenu}
                className="text-2xl font-bold text-foreground hover:text-gradient transition-colors duration-300"
              >
                {link}
              </a>
            ))}
            <CtaButton asChild className="mt-8 text-xl px-10 py-4">
                <a href="https://outlook.office.com/book/KibouSystems1@kibousystems.com/?ismsaljsauthenabled" onClick={toggleMenu}>Get Free Consultation</a>
            </CtaButton>
        </nav>
      </div>
    </>
    )
}

// Main Hero Component
export default function KibouHero() {
  return (
    <section id="home" className="relative w-full h-screen bg-black text-white overflow-hidden">
      <Image 
        src="https://images.stockcake.com/public/1/5/3/15325383-e3b7-4a06-b726-edae65aa8fa2_large/colorful-digital-awe-stockcake.jpg"
        alt="Abstract colorful digital art"
        fill
        className="object-cover absolute z-0 opacity-50"
        data-ai-hint="abstract digital"
        priority
      />
      <ParticleCanvas />
      <Header />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight max-w-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            AI Support That Works As Hard As You Do
          </h1>
          <p className="mt-6 text-xl tracking-widest font-bold text-foreground">
            Build &nbsp;&middot;&nbsp; Innovate &nbsp;&middot;&nbsp; Sustain
          </p>
        <div className="mt-8">
          <CtaButton href="https://outlook.office.com/book/KibouSystems1@kibousystems.com/?ismsaljsauthenabled">
            Get Free Consultation
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
