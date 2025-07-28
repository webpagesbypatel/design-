"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Code2, LayoutTemplate, Zap, Bot, Smartphone, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Bot,
    title: "AI/ML Solutions",
    description: "Cutting-edge AI and machine learning solutions that drive innovation and efficiency.",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Streamline your processes with our automation solutions, saving time and reducing errors.",
  },
  {
    icon: LayoutTemplate,
    title: "Web Design",
    description: "Beautiful, conversion-focused websites that engage your audience and drive business growth.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom web applications and sites built with the latest technologies for optimal performance.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Innovative mobile applications that enhance user experience and drive engagement.",
  },
  {
    icon: Settings,
    title: "Custom Software Development",
    description: "Tailored software solutions that meet your unique business needs and challenges.",
  },
];

const ServiceCard = ({ icon: Icon, title, description, className }: { icon: React.ElementType, title: string, description: string, className?: string }) => (
    <div className={cn("group relative overflow-hidden rounded-xl p-8 glass-card transition-all duration-500 ease-kibou hover:shadow-2xl hover:shadow-kibou-violet/20 hover:-translate-y-2", className)}>
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-kibou">
            <div className="absolute -inset-2 animate-gradient-flow gradient-background opacity-30 blur-xl" />
            <div className="absolute inset-0 gradient-border opacity-0 group-hover:opacity-100" />
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
    <section id="services" ref={ref} className="py-20 md:py-32 container mx-auto px-4 aurora-background">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold font-headline">
          Our Services
        </h2>
        <h3 className="mt-4 text-xl md:text-2xl text-gradient">
          Transforming your digital presence with our expertise
        </h3>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We offer a comprehensive suite of services designed to help your business stand out and succeed in the digital world.
        </p>
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
