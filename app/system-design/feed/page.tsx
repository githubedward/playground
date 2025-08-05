import { Container } from "@/components/container";
import { Feed } from "./_components/feed";
import FeedContent from "./feed-content.mdx";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  return (
    <Container className="my-6 md:my-16 flex flex-col max-w-[600px] mx-auto">
      <FeedContent />
      <Feed />
    </Container>
  );
}
