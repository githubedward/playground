"use client";

import { Text } from "@/components/typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef } from "react";

interface FeedMetric {
  page: number;
  duration: number;
  postsCount: number;
  renderDuration?: number;
}

interface FeedMetricsProps {
  metrics: FeedMetric[];
  description?: string;
}

export function FeedMetrics({ metrics, description }: FeedMetricsProps) {
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (metricsRef.current && metrics.length > 0) {
      metricsRef.current.scrollTop = metricsRef.current.scrollHeight;
    }
  }, [metrics.length]);

  if (metrics.length === 0) {
    return null;
  }

  return (
    <div
      ref={metricsRef}
      className="p-4 bg-primary sticky top-0 z-10 max-h-50 overflow-y-auto"
    >
      <Text
        variant="lead"
        weight="semibold"
        className="mb-2 text-primary-foreground"
      >
        Performance Metrics
      </Text>
      {description && (
        <Text className="mb-2 text-primary-foreground">{description}</Text>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary-foreground">Page</TableHead>
            <TableHead className="text-primary-foreground">DB (ms)</TableHead>
            <TableHead className="text-primary-foreground">
              Render (ms)
            </TableHead>
            <TableHead className="text-primary-foreground">
              Total (ms)
            </TableHead>
            <TableHead className="text-primary-foreground">Posts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric, index) => (
            <TableRow key={index}>
              <TableCell className="text-primary-foreground">
                {metric.page}
              </TableCell>
              <TableCell className="text-primary-foreground">
                {metric.duration.toFixed(2)}
              </TableCell>
              <TableCell className="text-primary-foreground">
                {metric.renderDuration ? metric.renderDuration.toFixed(2) : "-"}
              </TableCell>
              <TableCell className="text-primary-foreground">
                {metric.renderDuration
                  ? (metric.duration + metric.renderDuration).toFixed(2)
                  : metric.duration.toFixed(2)}
              </TableCell>
              <TableCell className="text-primary-foreground">
                {metric.postsCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
