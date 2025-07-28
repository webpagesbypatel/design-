"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Code2, LayoutTemplate, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: LayoutTemplate,
    title: "UI/UX Design",
    description: "Crafting intuitive and visually stunning user interfaces that provide a seamless user experience.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Building robust, scalable, and high-performance websites and applications using modern technologies.",
  },
  {
    icon: Zap,
    title: "SEO & Performance",
    description: "Optimizing your digital presence to rank higher on search engines and deliver lightning-fast load times.",
  },
];

const ServiceCard = ({ icon: Icon, title, description, className }: { icon: React.ElementType, title: string, description: string, className?: string }) => (
    <div className={cn("group relative overflow-hidden rounded-xl p-8 glass-card transition-all duration-500 ease-kibou hover:shadow-2xl hover:shadow-kibou-violet/10 hover:-translate-y-2", className)}>
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-kibou">
            <div className="absolute inset-[-200%] animate-gradient-flow gradient-background" />
        </div>
        <div className="relative z-10">
            <div className="mb-6 inline-block rounded-lg p-3 gradient-background">
                <Icon className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-2 text-2xl font-bold font-headline">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            <ArrowRight className="absolute bottom-8 right-8 h-6 w-6 text-muted-foreground/50 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-kibou" />
        </div>
    </div>
  );

export default function Services() {
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
    <section id="services" ref={ref} className="py-20 md:py-32 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-headline">
          Our Services
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          From concept to launch, we provide a complete suite of services to bring your vision to life.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`transition-all duration-500 ease-kibou ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </section>
  );
}
