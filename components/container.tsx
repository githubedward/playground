import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type ContainerProps = ComponentProps<"div">;

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("container mx-auto px-4", className)} {...props}>
      {children}
    </div>
  );
}
