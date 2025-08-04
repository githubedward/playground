import { Container } from "@/components/container";
import { Feed } from "./_components/feed";
import { FeedPostType } from "./_types";
import { getFeedPosts } from "./action";
import FeedContent from "./feed-content.mdx";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  const posts: FeedPostType[] = await getFeedPosts();

  if (!posts) {
    return <div>No posts found</div>;
  }

  return (
    <Container className="my-6 md:my-16 flex flex-col max-w-[600px] mx-auto">
      <FeedContent />
      <Feed posts={posts} />
    </Container>
  );
}
