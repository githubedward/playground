import { Container } from "@/components/container";
import AutocompleteContent from "./_components/autocomplete-content.mdx";
import { seedPlaces } from "./seed";

export default async function AutocompletePage() {
  await seedPlaces();

  return (
    <Container className="flex flex-col">
      <AutocompleteContent />
    </Container>
  );
}
