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
        <div ref={ref} className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-muted-foreground font-semibold tracking-widest uppercase mb-8">
                    Trusted By
                </h3>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
                    {clients.map((client, index) => (
                        <div
                            key={client}
                            className={cn(
                                "transition-all duration-700 ease-kibou",
                                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            )}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <p className="text-2xl font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                {client}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
