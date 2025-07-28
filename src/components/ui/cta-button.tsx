import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CtaButtonProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
};

export function CtaButton({ children, className, asChild = false }: CtaButtonProps) {
  const Comp = asChild ? "a" : "button";

  return (
    <Comp
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 font-bold text-foreground transition-all duration-300 ease-kibou focus:outline-none focus:ring-2 focus:ring-kibou-violet focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
    >
      <span className="absolute inset-0 h-full w-full rounded-full border border-white/50" />
      <span className="absolute inset-0 h-full w-full -translate-x-full transform bg-gradient-to-r from-kibou-indigo to-kibou-violet transition-transform duration-500 ease-kibou group-hover:translate-x-0" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </Comp>
  );
}
