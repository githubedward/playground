import { Container } from "@/components/container";
import AutocompleteContent from "./_components/autocomplete-content.mdx";

export default function AutocompletePage() {
  return (
    <Container className="my-6 md:my-16 flex flex-col">
      <AutocompleteContent />
    </Container>
  );
}
