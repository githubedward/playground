"use client";

import { useCallback, useEffect } from "react";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver";
import { useFeedPosts } from "../_controllers/useFeedPosts";
import { FeedMetrics } from "./feed-metrics";
import { FeedPost } from "./feed-post";

export function OptimizedFeed() {
  const { posts, loading, fetchPosts, hasMore, setPage, page, requestMetrics } =
    useFeedPosts();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, [setPage]);

  const lastPostRef = useIntersectionObserver({
    onIntersect: handleLoadMore,
    enabled: !loading && hasMore,
    dependencies: [posts.length],
    options: {
      rootMargin: "7500px",
    },
  });

  return (
    <section className="flex flex-col">
      <FeedMetrics metrics={requestMetrics} />
      {posts.map((post) => {
        const isLastPost = post.id === posts[posts.length - 1].id;

        return (
          <div key={post.id} ref={isLastPost ? lastPostRef : null}>
            <FeedPost post={post} isLastPost={isLastPost} />
          </div>
        );
      })}
      {loading && posts.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="h-10 w-10 border-4 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <div className="flex justify-center py-8 text-muted-foreground">
          <p>You&apos;ve reached the end</p>
        </div>
      )}
    </section>
  );
}
