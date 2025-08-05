import { useState } from "react";
import { FeedPostType } from "../_types";
import { getFeedPosts } from "../action";

interface RequestMetric {
  page: number;
  duration: number;
  postsCount: number;
  timestamp: number;
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
