"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, Wrench, Rocket, DraftingCompass } from "lucide-react";
import { motion, useInView } from "framer-motion";
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};


export default function Process() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section id="process" ref={ref} className="py-20 md:py-32 container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold font-headline">
                    Our Process
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    A streamlined journey from idea to impact.
                </p>
            </motion.div>

            <div className="relative">
                {/* Dotted line connector */}
                <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 h-full w-px border-l-2 border-dashed border-white/20"></div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 gap-x-16 gap-y-12"
                >
                    {processSteps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div 
                                key={step.title}
                                variants={itemVariants}
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
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
}
