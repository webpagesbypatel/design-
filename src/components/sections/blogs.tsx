"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const blogPosts = [
  {
    title: "The Future of AI in Web Development",
    description: "Explore how artificial intelligence is revolutionizing the way we build and interact with websites.",
    image: "https://placehold.co/600x400.png",
    author: "Jane Doe",
    date: "Oct 26, 2023",
    tag: "AI",
    aiHint: "robot technology"
  },
  {
    title: "Mastering Headless CMS for Modern Web Apps",
    description: "A deep dive into the benefits of using a headless CMS for creating flexible and scalable web applications.",
    image: "https://placehold.co/600x400.png",
    author: "John Smith",
    date: "Oct 22, 2023",
    tag: "Web Dev",
    aiHint: "code programming"
  },
  {
    title: "UI/UX Design Trends to Watch in 2024",
    description: "Stay ahead of the curve with these upcoming design trends that will shape user experiences.",
    image: "https://placehold.co/600x400.png",
    author: "Emily White",
    date: "Oct 18, 2023",
    tag: "Design",
    aiHint: "design interface"
  },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
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

export default function Blogs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="blogs" ref={ref} className="py-20 md:py-32 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-headline">
          From the Blog
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights, tips, and stories from the Kibou Systems team.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogPosts.map((post) => (
          <motion.div
            key={post.title}
            variants={itemVariants}
            className="group glass-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-kibou-violet/20"
          >
            <div className="relative w-full h-48">
              <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" data-ai-hint={post.aiHint}/>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm font-semibold text-kibou-violet bg-kibou-violet/10 py-1 px-3 rounded-full">{post.tag}</span>
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>By {post.author}</span>
                <span className="mx-2">&bull;</span>
                <span>{post.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
