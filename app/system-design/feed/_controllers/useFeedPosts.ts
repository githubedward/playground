import { useState } from "react";
import { FeedPostType } from "../_types";
import { getFeedPosts } from "../action";

/**
 *
 * @returns {
 *  posts: FeedPostType[],
 *  loading: boolean,
 *  hasMore: boolean,
 *  fetchPosts: () => Promise<void>,
 *  page: number,
 *  setPage: (page: number) => void,
 *  setHasMore: (hasMore: boolean) => void
 * }
 */

export const useFeedPosts = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    if (loading) return;

    setLoading(true);
    const newPosts = await getFeedPosts(page);

    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }

    setLoading(false);
  };

  return { posts, loading, hasMore, fetchPosts, page, setPage, setHasMore };
};
