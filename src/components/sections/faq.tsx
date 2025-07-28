"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    question: "What kind of technologies do you specialize in?",
    answer:
      "We specialize in a range of modern technologies including React, Next.js, Node.js, and serverless architectures. For our AI and Automation solutions, we leverage Python, TensorFlow, and cutting-edge cloud AI platforms to deliver intelligent, scalable systems.",
  },
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary based on complexity and scope. A standard website might take 4-6 weeks, while a complex web application or AI integration could take 3-6 months. We work closely with you to establish a detailed timeline during the discovery phase.",
  },
  {
    question: "What is your process for working with clients?",
    answer:
      "Our process is collaborative and transparent. We follow a four-step journey: Discover & Define, Design & Prototype, Develop & Test, and Deploy & Grow. This ensures we are aligned with your vision at every stage and deliver a product that exceeds expectations.",
  },
  {
    question: "Do you offer support and maintenance after launch?",
    answer:
      "Yes, we offer ongoing support and maintenance packages to ensure your digital presence remains secure, up-to-date, and performant. We believe in building long-term partnerships to help you grow and adapt as your needs evolve.",
  },
];

export default function Faq() {
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
    <section id="faq" ref={ref} className="py-20 md:py-32 container mx-auto px-4">
      <div
        className={cn(
          "text-center mb-16 transition-all duration-700 ease-kibou",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <h2 className="text-4xl md:text-5xl font-bold font-headline">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions? We have answers.
        </p>
      </div>
      <div
        className={cn(
          "max-w-3xl mx-auto transition-all duration-700 ease-kibou delay-200",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card rounded-lg mb-4 px-6 border-none"
            >
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-foreground">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
