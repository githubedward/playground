import { Container } from "@/components/container";
import { ScrollToTop } from "@/components/scroll-to-top";
import FeedContent from "./_components/feed-content.mdx";
import { FeedWithTabs } from "./_components/feed-with-tabs";

export const dynamic = "force-dynamic";

export default async function FeedPage() {
  return (
    <Container className="relative flex flex-col max-w-[600px] mx-auto">
      <FeedContent />
      <FeedWithTabs />
      <ScrollToTop />
    </Container>
  );
}
