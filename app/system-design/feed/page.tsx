import { Container } from "@/components/container";
import FeedContent from "./feed-content.mdx";

export default function FeedPage() {
  return (
    <Container className="my-6 md:my-16 flex flex-col">
      <FeedContent />
    </Container>
  );
}
