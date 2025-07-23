"use client";

import { useAutocomplete } from "../_controller/useAutocomplete";
import { AutocompleteInput } from "./autocomplete-input";

export function CachedAutocomplete() {
  const { input, results, setInput, cacheHit, apiHit } = useAutocomplete({
    hasDebounce: true,
    hasCache: true,
  });

  return (
    <AutocompleteInput
      title="Cached autocomplete"
      input={input}
      results={results}
      setInput={setInput}
      cacheHit={cacheHit}
      apiHit={apiHit}
    />
  );
}
