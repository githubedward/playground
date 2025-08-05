import { useState } from "react";
import { FeedPostType } from "../_types";
import { getFeedPosts } from "../action";

export const useFeedPosts = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const newPosts = await getFeedPosts(page);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLoading(false);
  };

  return { posts, loading, hasMore, fetchPosts, page, setPage, setHasMore };
};
