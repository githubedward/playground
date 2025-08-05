"use client";

import { Text } from "@/components/typography";
import { useEffect, useRef } from "react";

interface FeedMetric {
  page: number;
  duration: number;
  postsCount: number;
}

interface FeedMetricsProps {
  metrics: FeedMetric[];
}

export function FeedMetrics({ metrics }: FeedMetricsProps) {
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
      className="p-4 bg-primary sticky top-0 z-10 max-h-40 overflow-y-auto"
    >
      <Text
        variant="lead"
        weight="semibold"
        className="mb-2 text-primary-foreground"
      >
        Request Metrics
      </Text>
      <div className="space-y-1">
        {metrics.map((metric, index) => (
          <Text key={index} variant="small" className="text-primary-foreground">
            Page {metric.page}: {metric.duration.toFixed(2)}ms (
            {metric.postsCount} posts)
          </Text>
        ))}
      </div>
    </div>
  );
}
