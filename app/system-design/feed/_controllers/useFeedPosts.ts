import { useCallback, useState } from "react";
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

  const fetchPosts = async () => {
    if (loading) return;

    setLoading(true);
    const response = await getFeedPosts(page);

    if (response.posts.length === 0) {
      setHasMore(false);
    } else {
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

  const handleRenderMetrics = useCallback(
    (
      id: string,
      phase: "mount" | "update" | "nested-update",
      actualDuration: number,
    ) => {
      if (phase === "update" && id === "feed-posts") {
        updateRenderMetrics(actualDuration);
      }
    },
    [updateRenderMetrics],
  );

  return {
    posts,
    loading,
    hasMore,
    fetchPosts,
    page,
    setPage,
    setHasMore,
    requestMetrics,
    updateRenderMetrics,
    handleRenderMetrics,
  };
};
