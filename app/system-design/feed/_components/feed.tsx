import { FeedPostType } from "../_types";
import { FeedPost } from "./feed-post";

export function Feed({ posts }: { posts: FeedPostType[] }) {
  return (
    <section className="flex flex-col">
      {posts.map((post) => {
        const isLastPost = post.id === posts[posts.length - 1].id;

        return <FeedPost post={post} key={post.id} isLastPost={isLastPost} />;
      })}
    </section>
  );
}
