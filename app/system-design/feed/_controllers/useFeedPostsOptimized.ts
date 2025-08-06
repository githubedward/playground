import { useInfiniteQuery } from "@tanstack/react-query";
import { PerformanceMetric } from "../_types";
import { getFeedPosts } from "../action";

export const useFeedPostsOptimized = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["feed-posts"],
      queryFn: ({ pageParam }) => getFeedPosts(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        // If the last page has posts, continue with next page
        return lastPage.posts.length > 0 ? allPages.length : undefined;
      },
    });

  // Flatten all pages into a single posts array
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  // Extract performance metrics from all pages
  const performanceMetrics: PerformanceMetric[] =
    data?.pages.map((page, index) => ({
      page: index,
      duration: page.duration,
      postsCount: page.posts.length,
      timestamp: Date.now(),
    })) ?? [];

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
