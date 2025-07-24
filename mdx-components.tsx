import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { CodeBlock } from "@/components/ui/code-block";
import { InlineCode } from "@/components/ui/inline-code";
import { List } from "@/components/ui/list";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Typography components
    h1: ({ ...props }) => (
      <Heading
        size="h2"
        as="h1"
        variant="default"
        weight="bold"
        className={cn("mb-4")}
        {...props}
      />
    ),
    h2: ({ ...props }) => (
      <Heading
        size="h3"
        as="h2"
        variant="default"
        className={cn("mb-4")}
        {...props}
      />
    ),
    h3: ({ ...props }) => (
      <Heading
        size="h4"
        as="h3"
        variant="default"
        className={cn("mb-4")}
        {...props}
      />
    ),
    h4: ({ ...props }) => (
      <Heading
        size="h5"
        as="h4"
        variant="default"
        className={cn("mb-4")}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <Text className={cn("mb-4", className)} {...props} />
    ),
    strong: ({ className, ...props }) => (
      <Text
        as="span"
        weight="bold"
        className={cn("leading-7 mb-4", className)}
        {...props}
      />
    ),
    em: ({ className, ...props }) => (
      <Text as="span" className={cn("italic mb-4", className)} {...props} />
    ),

    // Code components
    code: ({ className, children, ...props }) => {
      const isInline = typeof children === "string" && !children.includes("\n");

      if (isInline) {
        return (
          <InlineCode className={cn("mb-4", className)} {...props}>
            {children}
          </InlineCode>
        );
      }

      return (
        <CodeBlock className={cn("mb-4", className)} {...props}>
          {children}
        </CodeBlock>
      );
    },

    pre: ({ className, ...props }) => (
      <div className={cn("mb-4", className)} {...props} />
    ),

    // List components
    ul: ({ className, ...props }) => (
      <List variant="unordered" className={cn("mb-4", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <List variant="ordered" className={cn("mb-4", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("mb-1", className)} {...props} />
    ),

    // Table components
    table: ({ className, ...props }) => (
      <Table className={cn("my-6", className)} {...props} />
    ),
    thead: ({ className, ...props }) => (
      <TableHeader className={className} {...props} />
    ),
    tbody: ({ className, ...props }) => (
      <TableBody className={className} {...props} />
    ),
    tfoot: ({ className, ...props }) => (
      <TableFooter className={className} {...props} />
    ),
    tr: ({ className, ...props }) => (
      <TableRow className={className} {...props} />
    ),
    th: ({ className, ...props }) => (
      <TableHead className={className} {...props} />
    ),
    td: ({ className, ...props }) => (
      <TableCell className={className} {...props} />
    ),
    caption: ({ className, ...props }) => (
      <TableCaption className={className} {...props} />
    ),

    hr: ({ className, ...props }) => (
      <Separator className={cn("my-8", className)} {...props} />
    ),
    // blockquote
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-l-4 border-primary/20 pl-4 py-2 my-4 bg-muted/30 rounded-r-md",
          className,
        )}
        {...props}
      />
    ),

    // Link
    a: ({ className, ...props }) => (
      <Link
        href={props.href}
        className={cn(
          "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors",
          className,
        )}
        {...props}
      />
    ),

    // Image
    img: ({ className, alt, ...props }) => (
      <img
        className={cn("rounded-md border my-4", className)}
        alt={alt}
        {...props}
      />
    ),

    ...components,
  };
}
