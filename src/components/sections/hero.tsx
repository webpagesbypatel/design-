"use client";

import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ParticleCanvas } from '@/components/particle-canvas';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || !heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroRef.current;
      
      const xPos = (clientX - offsetWidth / 2) / (offsetWidth / 2);
      const yPos = (clientY - offsetHeight / 2) / (offsetHeight / 2);

      const tiltX = -(yPos * 8); // Invert for natural feel
      const tiltY = xPos * 8;

      imageRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1, 1, 1)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    heroRef.current?.addEventListener('mousemove', handleMouseMove);
    heroRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroRef.current?.removeEventListener('mousemove', handleMouseMove);
      heroRef.current?.removeEventListener('mouseleave', handleMouseLeave);
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
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          
          <div className="lg:col-span-3 text-center lg:text-left">
            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="overflow-hidden">
                <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-tight animate-slide-up" style={{ animationDelay: '500ms' }}>
                  We build beautiful digital experiences that drive growth.
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
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
          <div className="lg:col-span-2 hidden lg:flex justify-center items-center">
            <div
              ref={imageRef}
              className="relative w-[400px] h-[400px] animate-fade-in-scale"
              style={{ transition: 'transform 0.1s linear', animationDelay: '200ms' }}
            >
              <div className="w-full h-full animate-float">
                <Image
                  src="https://placehold.co/600x600.png"
                  alt="Abstract 3D rendering representing digital innovation"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                  data-ai-hint="glowing neural network"
                />
              </div>
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
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
