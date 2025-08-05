import { useLayoutEffect, useRef, useState } from "react";
import { FeedPostType } from "../_types";
import { getFeedPosts } from "../action";

interface RequestMetric {
  page: number;
  duration: number;
  postsCount: number;
  timestamp: number;
  renderDuration?: number;
}

export const useFeedPosts = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [requestMetrics, setRequestMetrics] = useState<RequestMetric[]>([]);
  const renderStartTime = useRef<number | null>(null);
  const previousPostsLength = useRef(0);

  const fetchPosts = async () => {
    if (loading) return;

    setLoading(true);
    const response = await getFeedPosts(page);

    if (response.posts.length === 0) {
      setHasMore(false);
    } else {
      // Start render timing before updating posts
      renderStartTime.current = performance.now();
      setPosts((prevPosts) => [...prevPosts, ...response.posts]);
    }

    setRequestMetrics((prev) => [
      ...prev,
      {
        page,
        duration: response.duration,
        postsCount: response.posts.length,
        timestamp: Date.now(),
      },
    ]);

    setLoading(false);
  };

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
    setRequestMetrics((prev) => {
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
    loading,
    hasMore,
    fetchPosts,
    page,
    setPage,
    setHasMore,
    requestMetrics,
  };
};
