"use client";

import { Profiler, useCallback, useEffect } from "react";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver";
import { useFeedPosts } from "../_controllers/useFeedPosts";
import { FeedMetrics } from "./feed-metrics";
import { FeedPost } from "./feed-post";

const PROFILER_ID = "optimized-feed-posts";

export function OptimizedFeed() {
  const {
    posts,
    loading,
    fetchPosts,
    hasMore,
    setPage,
    page,
    requestMetrics,
    updateRenderMetrics,
  } = useFeedPosts();

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
      rootMargin: "10000px",
    },
  });

  const handleRenderMetrics = useCallback(
    (
      id: string,
      phase: "mount" | "update" | "nested-update",
      actualDuration: number,
    ) => {
      if (phase === "update" && id === PROFILER_ID) {
        updateRenderMetrics(actualDuration);
      }
    },
    [updateRenderMetrics],
  );

  return (
    <section className="flex flex-col">
      <FeedMetrics metrics={requestMetrics} />
      <Profiler id={PROFILER_ID} onRender={handleRenderMetrics}>
        {posts.map((post) => {
          const isLastPost = post.id === posts[posts.length - 1].id;

          return (
            <div key={post.id} ref={isLastPost ? lastPostRef : null}>
              <FeedPost post={post} isLastPost={isLastPost} />
            </div>
          );
        })}
      </Profiler>
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
