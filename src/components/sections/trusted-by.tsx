"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const clients = ["RankPilot", "Equilibrium solutions", "Kaushal Network"];

export default function TrustedBy() {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

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
        <div 
          ref={ref} 
          className={cn(
            "py-16 bg-background/50 transition-opacity duration-1000 ease-out",
            inView ? 'opacity-100' : 'opacity-0'
          )}
          style={{transitionDelay: '1200ms'}}
        >
            <div className="container mx-auto px-4">
                <h3 className="text-center text-muted-foreground font-semibold tracking-widest uppercase mb-8">
                    Trusted by innovative companies
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                    {clients.map((client) => (
                        <div
                            key={client}
                        >
                            <p className="text-2xl font-semibold text-muted-foreground grayscale transition-all duration-300 hover:grayscale-0 hover:text-foreground cursor-pointer">
                                {client}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
