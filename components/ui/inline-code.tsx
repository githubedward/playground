import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inlineCodeVariants = cva(
  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-normal",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InlineCodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof inlineCodeVariants> {
  as?: "code" | "span";
}

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, variant, as, children, ...props }, ref) => {
    const Comp = as || "code";

    return (
      <Comp
        ref={ref as React.Ref<HTMLElement>}
        className={cn(inlineCodeVariants({ variant, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

InlineCode.displayName = "InlineCode";

export { InlineCode, inlineCodeVariants };
