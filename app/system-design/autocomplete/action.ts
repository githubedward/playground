"use server";

import { PlaceSuggestion } from "./_types";

type GooglePlacesResponse = {
  suggestions?: PlaceSuggestion[];
};

// Discriminated union types for fetchPlaces
export type FetchPlacesSuccess = {
  status: "ok";
  data: GooglePlacesResponse;
};

export type FetchPlacesError = {
  status: "error";
  error: unknown;
};

export type FetchPlacesResult = FetchPlacesSuccess | FetchPlacesError;

export const fetchPlaces = async (
  input: string,
): Promise<FetchPlacesResult> => {
  if (!process.env.GOOGLE_API_KEY) {
    return { status: "error", error: "GOOGLE_API_KEY is not set" };
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY || "",
          "X-Goog-FieldMask": "*",
        },
        body: JSON.stringify({
          input,
          locationBias: {
            circle: {
              center: {
                latitude: 62.0,
                longitude: -96.0,
              },
              radius: 50000.0,
            },
          },
        }),
      },
    );

    const data = await response.json();
    return { status: "ok", data };
  } catch (error) {
    console.error(error);
    return { status: "error", error };
  }
};
