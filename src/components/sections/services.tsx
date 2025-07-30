"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart, Bot, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Bot,
    title: "AI Agents",
    description: "Intelligent AI agents designed to automate tasks and enhance user interactions, tailored to your business needs.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description: "Bespoke software solutions, from web applications to enterprise systems, built for performance and scale.",
  },
  {
    icon: BarChart,
    title: "AI + Analytics",
    description: "Unlock powerful insights from your data with AI-driven analytics to make smarter business decisions.",
  },
];

const ServiceCard = ({ icon: Icon, title, description, className }: { icon: React.ElementType, title: string, description: string, className?: string }) => (
    <div className={cn("group relative overflow-hidden rounded-xl p-8 glass-card transition-all duration-500 ease-kibou hover:shadow-2xl hover:shadow-kibou-violet/20 hover:-translate-y-2", className)}>
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-kibou">
            <div className="absolute -inset-2 animate-gradient-flow gradient-background opacity-50 blur-xl" />
            <div className="absolute inset-0 gradient-border opacity-0 group-hover:opacity-100" />
        </div>
        <div className="relative z-10">
            <div className="mb-6 inline-block rounded-lg p-3 gradient-background">
                <Icon className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-2 text-2xl font-bold font-headline">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
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
    <section id="services" ref={ref} className="py-20 md:py-32 container mx-auto px-4 aurora-background">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-headline">
          Our Services
        </h2>
        <h3 className="mt-4 text-xl md:text-2xl text-gradient">
          Where Human Insight Meets Machine Precision
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
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
