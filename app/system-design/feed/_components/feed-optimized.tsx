"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { useFeedPostsOptimized } from "../_controllers/useFeedPostsOptimized";
import { FeedMetrics } from "./feed-metrics";
import { FeedPost } from "./feed-post";

export function OptimizedFeed() {
  const { posts, loading, fetchNextPage, hasMore, performanceMetrics } =
    useFeedPostsOptimized();

  const parentRef = useRef<HTMLDivElement>(null);

  // TanStack Virtual configuration with dynamic measurement
  const rowVirtualizer = useVirtualizer({
    count: hasMore ? posts.length + 1 : posts.length, // +1 for loading row
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      // Smart estimation based on post content
      const post = posts[index];
      if (!post) return 100; // Loading row

      // Base height for post structure (avatar, header, padding, borders)
      let estimate = 120;

      // Add height for text content (rough estimate: 20px per 60 characters)
      estimate += Math.ceil(post.content.length / 60) * 24;

      // Add significant height for images
      if (post.image_url) {
        estimate += 400; // Typical image height
      }

      return Math.max(estimate, 150); // Minimum height
    },
    overscan: 2,
    // Enable dynamic measurement
    measureElement: (element) => {
      if (!element) return 300;
      // Measure the actual rendered height
      const rect = element.getBoundingClientRect();
      return rect.height;
    },
  });

  // Infinite scroll logic - TanStack Virtual + useInfiniteQuery pattern
  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= posts.length - 10 && hasMore && !loading) {
      fetchNextPage();
    }
  }, [
    hasMore,
    loading,
    posts.length,
    virtualItems,
    rowVirtualizer,
    fetchNextPage,
  ]);

  const description = `TanStack Virtual: Virtualized list, renders only ~10 visible posts, auto-fetches next page when 15 posts before end, constant DOM size`;

  return (
    <section className="flex flex-col h-full">
      <FeedMetrics metrics={performanceMetrics} description={description} />

      {/* Debug info */}
      <div className="p-2 bg-yellow-100 text-xs">
        Posts: {posts.length} | Loading: {loading.toString()} | Virtual Items:{" "}
        {rowVirtualizer.getVirtualItems().length}
      </div>

      {/* Virtualized Container */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{
          contain: "strict",
          height: "100vh", // Fixed height: full viewport minus space for metrics
          minHeight: "400px",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const isLoaderRow = virtualItem.index > posts.length - 1;
            const post = posts[virtualItem.index];

            return (
              <div
                key={virtualItem.index}
                data-index={virtualItem.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
                ref={(el) => rowVirtualizer.measureElement(el)}
              >
                <div>
                  {isLoaderRow ? (
                    loading ? (
                      <div className="flex justify-center py-4">
                        <div className="h-10 w-10 border-4 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <div className="flex justify-center py-8 text-muted-foreground">
                        <p>You&apos;ve reached the end</p>
                      </div>
                    )
                  ) : (
                    <FeedPost
                      post={post}
                      isLastPost={virtualItem.index === posts.length - 1}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
