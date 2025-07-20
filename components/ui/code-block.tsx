import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function CodeBlock({ children, title, className }: CodeBlockProps) {
  return (
    <div className={cn("rounded-md border bg-muted/50", className)}>
      {title && (
        <div className="border-b bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="text-sm font-mono">{children}</code>
      </pre>
    </div>
  );
}
