import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const headingVariants = cva(
  "font-sans font-semibold tracking-tight text-foreground",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-3xl md:text-4xl lg:text-5xl",
        h3: "text-2xl md:text-3xl lg:text-4xl",
        h4: "text-xl md:text-2xl lg:text-3xl",
        h5: "text-lg md:text-xl lg:text-2xl",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
    },
    defaultVariants: {
      size: "h1",
      variant: "default",
      weight: "semibold",
    },
  },
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, variant, weight, as, children, ...props }, ref) => {
    const Comp = as || (size?.startsWith("h") ? size : "h1");

    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ size, variant, weight, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
