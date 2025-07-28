"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "Working with Kibou Systems was a game-changer. Their attention to detail and creative solutions are unparalleled.",
    author: "Jane Doe",
    company: "CEO, Tech Innovators",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "The final product exceeded all our expectations. The team is professional, responsive, and incredibly talented.",
    author: "John Smith",
    company: "Founder, Creative Solutions",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "A truly seamless experience from start to finish. We've seen a significant increase in user engagement since launch.",
    author: "Emily White",
    company: "Marketing Director, Future Corp",
    avatar: "https://placehold.co/100x100.png"
  },
];

export default function Testimonials() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="testimonials" ref={ref} className="py-20 md:py-32 bg-black/20">
      <div className="container mx-auto px-4">
        <div 
          className={cn("text-center mb-16 transition-all duration-700 ease-kibou", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}
          style={{ transitionDelay: "100ms"}}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-headline">
            What Our Clients Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We're proud to have partnered with amazing companies.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className={cn("w-full max-w-4xl mx-auto transition-all duration-700 ease-kibou", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}
          style={{ transitionDelay: "300ms"}}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                    <div className="glass-card rounded-xl p-8 text-center">
                        <Image
                            src={testimonial.avatar}
                            alt={testimonial.author}
                            width={80}
                            height={80}
                            className="rounded-full mx-auto mb-6 border-2 border-kibou-violet"
                            data-ai-hint="person avatar"
                        />
                        <p className="text-lg italic text-foreground">"{testimonial.quote}"</p>
                        <p className="mt-6 font-bold font-headline text-lg text-gradient">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
