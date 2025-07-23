"use client";

import { useAutocomplete } from "../_controller/useAutocomplete";
import { AutocompleteInput } from "./autocomplete-input";

export function BasicAutocomplete() {
  const { input, results, setInput, cacheHit, apiHit } = useAutocomplete({
    hasDebounce: false,
    hasCache: false,
  });

  return (
    <AutocompleteInput
      title="Basic autocomplete"
      input={input}
      results={results}
      setInput={setInput}
      cacheHit={cacheHit}
      apiHit={apiHit}
    />
  );
}
