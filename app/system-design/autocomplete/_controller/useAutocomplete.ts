"use client";

import { useDebounce } from "@/lib/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { PlaceSuggestion } from "../_types";
import { fetchPlaces } from "../action";

type UseAutocompleteProps = {
  hasDebounce: boolean;
  hasCache: boolean;
};

// Helper to normalize query for cache key
function normalizeCacheKey(query: string) {
  return query.trim().toLowerCase().replace(/\s+/g, "-");
}

export const useAutocomplete = (options: UseAutocompleteProps) => {
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [cacheHit, setCacheHit] = useState<number>(0);
  const [apiHit, setApiHit] = useState<number>(0);
  const debouncedInput = useDebounce(input, 300);
  const effectiveInput = options.hasDebounce ? debouncedInput : input;

  // In-memory cache using ref
  const cacheRef = useRef<{ [key: string]: PlaceSuggestion[] }>({});

  useEffect(() => {
    const normalizedKey = normalizeCacheKey(effectiveInput);
    const fetchData = async () => {
      if (options.hasCache) {
        const cached = cacheRef.current[normalizedKey];
        if (cached) {
          setCacheHit((prev) => ++prev);
          setResults(cached);
          return;
        }
      }

      const result = await fetchPlaces(effectiveInput);
      setApiHit((prev) => ++prev);
      if (result.status === "ok" && result.data?.suggestions) {
        setResults(result.data.suggestions);
        if (options.hasCache) {
          cacheRef.current[normalizedKey] = result.data.suggestions;
        }
      }
    };

    if (effectiveInput.length > 2) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [effectiveInput, options.hasCache]);

  return { input, results, setInput, cacheHit, apiHit };
};
