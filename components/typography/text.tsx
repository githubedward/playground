import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const textVariants = cva("font-sans text-foreground", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      lead: "text-foreground text-xl leading-7",
      small: "text-sm leading-6",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, weight, as, children, ...props }, ref) => {
    const Comp = as || "p";

    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant, weight, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
