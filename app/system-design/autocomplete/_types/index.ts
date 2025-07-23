type TextMatch = {
  endOffset: number;
  startOffset: number;
  text: string;
};

export type PlacePrediction = {
  place: string;
  placeId: string;
  structuredFormat: {
    mainText: {
      matches: TextMatch[];
      text: string;
    };
    secondaryText: {
      text: string;
    };
  };
  text: {
    matches: TextMatch[];
    text: string;
  };
  types: string[];
};

export type PlaceSuggestion = {
  placePrediction: PlacePrediction;
};
