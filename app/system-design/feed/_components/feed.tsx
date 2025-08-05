"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFeedPosts } from "../_controllers/useFeedPosts";
import { FeedPost } from "./feed-post";

export function Feed() {
  const { posts, loading, fetchPosts, hasMore, setPage, page } = useFeedPosts();
  const lastPostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [loading, hasMore, setPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "0px",
    });

    const currentRef = lastPostRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection, posts.length]);

  return (
    <section className="flex flex-col">
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
