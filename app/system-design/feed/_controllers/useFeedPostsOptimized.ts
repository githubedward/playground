import { useInfiniteQuery } from "@tanstack/react-query";
import { useLayoutEffect, useRef, useState } from "react";
import { PerformanceMetric } from "../_types";
import { getFeedPosts } from "../action";

export const useFeedPostsOptimized = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<
    PerformanceMetric[]
  >([]);

  const renderStartTime = useRef<number | null>(null);
  const previousPostsLength = useRef(0);

  const { data, error, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["feed-posts"],
      queryFn: async ({ pageParam }) => {
        const response = await getFeedPosts(pageParam);

        renderStartTime.current = performance.now();
        setPerformanceMetrics((prev) => [
          ...prev,
          {
            page: pageParam,
            duration: response.duration,
            postsCount: response.posts.length,
            timestamp: Date.now(),
          },
        ]);
        return response;
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        // If the last page has posts, continue with next page
        return lastPage.posts.length > 0 ? allPages.length : undefined;
      },
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    });

  // Flatten all pages into a single posts array
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  // Measure render time after DOM updates
  useLayoutEffect(() => {
    // Only update render metrics if we have posts and the number of posts has increased
    if (renderStartTime.current && posts.length > previousPostsLength.current) {
      const renderDuration = performance.now() - renderStartTime.current;

      updateRenderMetrics(renderDuration);

      // Reset the render start time so we can measure the next render
      renderStartTime.current = null;
    }
    // Update the previous posts length to the current posts length so we can compare it next time
    previousPostsLength.current = posts.length;
  }, [posts.length]);

  const updateRenderMetrics = (renderDuration: number) => {
    setPerformanceMetrics((prev) => {
      if (prev.length === 0) return prev;

      // Update the most recent metric entry that doesn't have renderDuration yet
      const updated = [...prev];
      for (let i = updated.length - 1; i >= 0; i--) {
        if (!updated[i].renderDuration) {
          updated[i] = { ...updated[i], renderDuration };
          break;
        }
      }
      return updated;
    });
  };

  return {
    posts,
    loading: isFetching,
    fetchNextPage,
    hasMore: hasNextPage,
    error,
    status,
    performanceMetrics,
  };
};
