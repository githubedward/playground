"use client";

import { Text } from "@/components/typography";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../../../hooks/useIntersectionObserver";
import { useFeedPosts } from "../_controllers/useFeedPosts";
import { FeedMetrics } from "./feed-metrics";
import { FeedPost } from "./feed-post";

export function NaiveFeed() {
  const {
    posts,
    loading,
    fetchPosts,
    hasMore,
    setPage,
    page,
    performanceMetrics,
  } = useFeedPosts();

  const [domCount, setDomCount] = useState(0);

  const feedContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Count actual DOM items after posts are rendered
  useEffect(() => {
    if (feedContainerRef.current) {
      // Count all FeedPost elements in the DOM
      const feedPostElements =
        feedContainerRef.current.querySelectorAll("[data-feed-post]");
      const domCount = feedPostElements.length;
      setDomCount(domCount);
    }
  }, [posts, domCount]);

  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, [setPage]);

  const lastPostRef = useIntersectionObserver({
    onIntersect: handleLoadMore,
    enabled: !loading && hasMore,
    dependencies: [posts.length],
  });

  const description = `Simple offset-based pagination, renders all posts in DOM, basic intersection observer, no virtualization`;

  return (
    <section ref={feedContainerRef} className="flex flex-col">
      <FeedMetrics metrics={performanceMetrics} description={description} />
      <div className="p-2 bg-warning text-xs sticky top-50 z-10">
        <Text className="text-warning-foreground">
          Total posts: {posts.length} | Rendered Items: {domCount}
        </Text>
      </div>

      {posts.map((post) => {
        const isLastPost = post.id === posts[posts.length - 1].id;

        return (
          <div
            data-feed-post
            key={post.id}
            ref={isLastPost ? lastPostRef : null}
          >
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
