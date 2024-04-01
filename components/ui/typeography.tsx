import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const TypographyLarge = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-4xl font-semibold", className)} {...props}>
        {children}
      </div>
    );
  }
);

export const TypographySmall = React.forwardRef<HTMLElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <small ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props}>
        {children}
      </small>
    );
  }
);

export const TypographyBold = React.forwardRef<HTMLElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <b ref={ref} className={cn("font-bold text-lg text-iceberg-600", className)} {...props}>
        {children}
      </b>
    );
  }
);

export const TypographyP = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("scroll-m-20 text-lg font-normal", className)} {...props}>
        {children}
      </p>
    );
  }
);

export const TypographyH1 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn("scroll-m-20 text-4xl font-extrabold tracking-normal lg:text-5xl", className)}
        {...props}
      >
        {children}
      </h1>
    );
  }
);

export const TypographyH2 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

export const TypographyH3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3 ref={ref} className={cn("scroll-m-20 text-2xl font-semibold tracking-normal", className)} {...props}>
        {children}
      </h3>
    );
  }
);
