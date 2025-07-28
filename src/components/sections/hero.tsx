"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!imageRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 20; 
    const y = ((clientY - top) / height - 0.5) * 20;
    
    imageRef.current.style.transform = `perspective(1000px) rotateY(${-x}deg) rotateX(${y}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
        heroElement.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
        if (heroElement) {
            heroElement.removeEventListener('mouseleave', handleMouseLeave);
        }
    };
}, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden aurora-background"
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-10 gap-8 items-center">
          
          {/* Left Column (Text) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="overflow-hidden">
                <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-tight animate-slide-up" style={{ animationDelay: '500ms' }}>
                  We build beautiful digital experiences that drive growth.
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              We help ambitious businesses like yours grow with boost digital presence with cutting-edge tech with beautiful design and development.
            </p>
            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '900ms' }}>
              <a 
                href="#contact" 
                className="inline-block rounded-full bg-[#2F81F7] text-white font-bold text-lg px-8 py-4 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:shadow-[0_0_25px_#2F81F7] hover:-translate-y-1"
              >
                Get Free Consultation
              </a>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="lg:col-span-3 flex justify-center items-center">
            <div 
              ref={imageRef}
              className="relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-100 ease-linear animate-fade-in-scale" 
              style={{ transformStyle: 'preserve-3d', animationDelay: '200ms' }}
            >
              <Image
                src="https://placehold.co/400x400.png"
                alt="Abstract 3D glowing sculpture"
                data-ai-hint="glowing glass sculpture dark"
                fill
                style={{ objectFit: 'contain' }}
                className="animate-float"
                priority
              />
            </div>
          </div>

        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 1s ease-out forwards;
            opacity: 0;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
