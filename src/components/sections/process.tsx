"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, Wrench, Rocket, DraftingCompass } from "lucide-react";
import { cn } from "@/lib/utils";

const processSteps = [
    {
        icon: Lightbulb,
        title: "1. Discover & Define",
        description: "We start by understanding your vision, goals, and target audience to lay a solid foundation."
    },
    {
        icon: DraftingCompass,
        title: "2. Design & Prototype",
        description: "Our team creates stunning, user-centric designs and interactive prototypes for your approval."
    },
    {
        icon: Wrench,
        title: "3. Develop & Test",
        description: "We bring designs to life with clean, efficient code and rigorously test for a flawless experience."
    },
    {
        icon: Rocket,
        title: "4. Deploy & Grow",
        description: "We launch your project and provide ongoing support to ensure continued growth and success."
    }
]

export default function Process() {
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
        <section id="process" ref={ref} className="py-20 md:py-32 container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold font-headline">
                    Our Process
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A streamlined journey from idea to impact.
                </p>
            </div>

            <div className="relative">
                {/* Dotted line connector */}
                <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 h-full w-px border-l-2 border-dashed border-white/20"></div>

                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                    {processSteps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div 
                                key={step.title}
                                className={cn("transition-all duration-700 ease-kibou", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className={cn(
                                    "relative glass-card rounded-lg p-6",
                                    "md:flex items-start gap-6",
                                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                                )}>
                                    <div className="flex-shrink-0 mb-4 md:mb-0">
                                        <div className="w-16 h-16 rounded-full gradient-background flex items-center justify-center">
                                            <step.icon className="w-8 h-8 text-black" />
                                        </div>
                                    </div>
                                    <div className={cn("text-left", !isEven && "md:text-right")}>
                                        <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                    
                                    {/* Arrow pointing to the timeline */}
                                    <div className={cn(
                                        "hidden md:block absolute top-10 w-4 h-4 glass-card rotate-45",
                                        isEven ? "-right-2" : "-left-2"
                                    )}></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
