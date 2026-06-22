"use server";

import { createClient } from "@supabase/supabase-js";
import { PlaceSuggestion } from "./_types";

type GooglePlacesResponse = {
  suggestions?: PlaceSuggestion[];
};

export type FetchPlacesSuccess = {
  status: "ok";
  data: GooglePlacesResponse;
};

export type FetchPlacesError = {
  status: "error";
  error: unknown;
};

export type FetchPlacesResult = FetchPlacesSuccess | FetchPlacesError;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export const fetchPlaces = async (
  input: string,
): Promise<FetchPlacesResult> => {
  try {
    const { data, error } = await supabase
      .from("places")
      .select("place_id, name, secondary, types")
      .ilike("name", `%${input}%`)
      .limit(5);

    if (error) return { status: "error", error };

    const suggestions: PlaceSuggestion[] = data.map((row) => ({
      placePrediction: {
        placeId: row.place_id,
        place: `places/${row.place_id}`,
        text: { text: `${row.name}, ${row.secondary}`, matches: [] },
        structuredFormat: {
          mainText: { text: row.name, matches: [] },
          secondaryText: { text: row.secondary },
        },
        types: row.types,
      },
    }));

    return { status: "ok", data: { suggestions } };
  } catch (error) {
    console.error(error);
    return { status: "error", error };
  }
};
