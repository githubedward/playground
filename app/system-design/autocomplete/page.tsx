import { Container } from "@/components/container";
import { BasicAutocomplete } from "./_components/basic-autocomplete";
import { CachedAutocomplete } from "./_components/cached-autocomplete";
import { DebouncedAutocomplete } from "./_components/debounced-autocomplete";

export default function AutocompletePage() {
  return (
    <Container className="my-6 md:my-16 flex flex-col md:flex-row gap-4">
      <BasicAutocomplete />
      <DebouncedAutocomplete />
      <CachedAutocomplete />
    </Container>
  );
}
