"use client";

import { useAutocomplete } from "../_controller/useAutocomplete";
import { AutocompleteInput } from "./autocomplete-input";

export function DebouncedAutocomplete() {
  const { input, results, setInput, cacheHit, apiHit } = useAutocomplete({
    hasDebounce: true,
    hasCache: false,
  });

  return (
    <AutocompleteInput
      title="Debounced autocomplete"
      input={input}
      results={results}
      setInput={setInput}
      cacheHit={cacheHit}
      apiHit={apiHit}
    />
  );
}
