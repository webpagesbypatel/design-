import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

type CtaButtonProps = {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
} & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: false; href?: never })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: false; href: string })
  | ({ asChild: true; href?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

export function CtaButton({ children, className, asChild = false, href, ...props }: CtaButtonProps) {
  const Comp = asChild ? Slot : (href ? 'a' : 'button');

  const baseClassName = "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 font-bold text-foreground transition-all duration-300 ease-kibou focus:outline-none focus:ring-2 focus:ring-kibou-violet focus:ring-offset-2 focus:ring-offset-background";

  const content = (
    <>
      <span className="absolute inset-0 h-full w-full rounded-full border border-white/50" />
      <span className="absolute inset-0 h-full w-full -translate-x-full transform bg-gradient-to-r from-kibou-indigo to-kibou-violet transition-transform duration-500 ease-kibou group-hover:translate-x-0" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </>
  );

  if (asChild) {
    return (
        <Slot className={cn(baseClassName, className)} {...props}>
            {children}
        </Slot>
    )
  }

  if (href) {
    return (
      <a href={href} className={cn(baseClassName, className)} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={cn(baseClassName, className)} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
