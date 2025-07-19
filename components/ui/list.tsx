import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const listVariants = cva("font-sans text-foreground ml-4", {
  variants: {
    variant: {
      ordered: "list-decimal list-inside",
      unordered: "list-disc list-inside",
    },
    spacing: {
      default: "space-y-2",
      tight: "space-y-1",
      loose: "space-y-3",
    },
  },
  defaultVariants: {
    variant: "unordered",
    spacing: "default",
  },
});

export interface ListProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof listVariants> {
  as?: "ul" | "ol";
}

const List = React.forwardRef<HTMLElement, ListProps>(
  ({ className, variant, spacing, as, children, ...props }, ref) => {
    const Comp = as || (variant === "ordered" ? "ol" : "ul");

    return (
      <Comp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(listVariants({ variant, spacing, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

List.displayName = "List";

export { List, listVariants };
