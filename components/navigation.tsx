"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Heading, Text } from "./typography";

interface RouteInfo {
  path: string;
  title: string;
  description?: string;
  readingTime: string;
  datePublished: string;
  category: string;
}

interface NavigationProps {
  routes: RouteInfo[];
  className?: string;
}

export function Navigation({ routes, className }: NavigationProps) {
  if (routes.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-muted-foreground">No routes found</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {routes.map((route) => {
        return (
          <Link key={route.path} href={route.path} className="w-full ">
            <Card className="transition-all duration-300 hover:shadow-md hover:opacity-75">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <Heading
                      size="h4"
                      as="h3"
                      variant="primary"
                      weight="medium"
                    >
                      {route.title}
                    </Heading>
                    {route.description && (
                      <Text className="line-clamp-1">{route.description}</Text>
                    )}
                    <Text variant="small">
                      <span>{route.readingTime}</span>
                      <span> • </span>
                      <span>{route.datePublished}</span>
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
