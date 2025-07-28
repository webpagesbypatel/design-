"use client";

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/ui/cta-button";
import { Menu, X } from 'lucide-react';

const navLinks = ["Work", "Services", "Blog", "Contact"];

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-kibou",
          hasScrolled ? "py-4 glass-card shadow-lg" : "py-6"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <a href="#home" className="text-2xl font-bold font-headline tracking-tighter">
            Kibou Systems
            <span className="text-kibou-violet">.</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
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
            <CtaButton href="#contact">Get Free Consultation</CtaButton>
          </div>
          <button onClick={toggleMenu} className="md:hidden text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-50 bg-background/95 backdrop-blur-lg transition-transform duration-500 ease-kibou md:hidden",
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
                <a href="#contact" onClick={toggleMenu}>Get Free Consultation</a>
            </CtaButton>
        </nav>
      </div>
    </>
  );
}
