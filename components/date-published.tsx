"use client";

import { Text } from "@/components/typography";
import { formatISOToReadableDate } from "@/lib/date";
import { getNavigationRoutes } from "@/lib/routes-data";

export function DatePublished({ path }: { path: string }) {
  const routes = getNavigationRoutes();
  const currentRoute = routes.find((route) => route.path === path);

  if (!currentRoute) {
    return null;
  }

  return (
    <Text variant="small" className="text-muted-foreground italic mb-4">
      Published on {formatISOToReadableDate(currentRoute.datePublished)}
    </Text>
  );
}
