import { Text } from "@/components/typography";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PlaceSuggestion } from "../_types";

type AutocompleteInputProps = {
  input: string;
  results: PlaceSuggestion[];
  setInput: (input: string) => void;
  cacheHit: number;
  apiHit: number;
  title?: string;
};

export function AutocompleteInput({
  input,
  results,
  setInput,
  cacheHit,
  apiHit,
  title = "Autocomplete",
}: AutocompleteInputProps) {
  return (
    <Card className="flex flex-col gap-4 w-full p-4 fade-in animate-in duration-1000">
      <div>
        <div>
          <Text variant="lead" className="text-center mb-4" weight="semibold">
            {title}
          </Text>
          <Text>
            Cache hit: <span>{cacheHit}</span>
          </Text>
          <Text>
            API hit: <span>{apiHit}</span>
          </Text>
        </div>
      </div>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Find a place"
          value={input}
          onValueChange={setInput}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.map((result) => {
            const { placePrediction } = result;
            return (
              <CommandItem
                key={placePrediction.placeId}
                onSelect={() => {
                  setInput("");
                  alert("Thank you for trying this autocomplete!");
                }}
              >
                <span className="cursor-pointer line-clamp-1">
                  {placePrediction.text.text}
                </span>
              </CommandItem>
            );
          })}
        </CommandList>
      </Command>
    </Card>
  );
}
