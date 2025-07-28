"use client";

import React from 'react';
import Image from 'next/image';
import { CtaButton } from '@/components/ui/cta-button';
import { ParticleCanvas } from '@/components/particle-canvas';

export default function Hero() {
  const [transform, setTransform] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 40;
    const y = ((clientY - top) / height - 0.5) * 40;
    setTransform({ x, y });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center" onMouseMove={handleMouseMove}>
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Abstract background of a swirling nebula of data"
          data-ai-hint="glowing neural network deep space"
          fill
          style={{objectFit: "cover"}}
          className="opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>
      <ParticleCanvas />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <div
          style={{ transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }}
          className="transition-transform duration-300 ease-kibou"
        >
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-tight">
            We build beautiful digital
            <br />
            experiences that drive growth.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            We help ambitious businesses like yours grow with boost digital presence with cutting-edge tech with beautiful design and development.
          </p>
        </div>
        <div
          className="mt-10"
          style={{ transform: `translate3d(${transform.x * 0.5}px, ${transform.y * 0.5}px, 0)` }}
        >
            <CtaButton asChild className="py-4 px-10 text-lg">
                <a href="#contact">Get Free Consultation</a>
            </CtaButton>
        </div>
      </div>
    </section>
  );
}
