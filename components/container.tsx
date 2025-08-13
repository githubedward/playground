import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type ContainerProps = ComponentProps<"div">;

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "container my-6 md:my-16 mx-auto px-4 max-w-6xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
