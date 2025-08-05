"use client";

import { useEffect } from "react";
import { useFeedPosts } from "../_controllers/useFeedPosts";
import { FeedPost } from "./feed-post";

export function Feed() {
  const { posts, loading, fetchPosts } = useFeedPosts();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex flex-col">
      {posts.map((post) => {
        const isLastPost = post.id === posts[posts.length - 1].id;

        return <FeedPost post={post} key={post.id} isLastPost={isLastPost} />;
      })}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="h-10 w-10 border-4 border-muted-foreground border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
    </section>
  );
}
