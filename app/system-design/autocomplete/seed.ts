"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type PlaceRow = {
  place_id: string;
  name: string;
  secondary: string;
  types: string[];
};

const PLACES: PlaceRow[] = [
  // Ontario
  {
    place_id: "toronto-ontario",
    name: "Toronto",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "ottawa-ontario",
    name: "Ottawa",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "mississauga-ontario",
    name: "Mississauga",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "brampton-ontario",
    name: "Brampton",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "hamilton-ontario",
    name: "Hamilton",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "london-ontario",
    name: "London",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "markham-ontario",
    name: "Markham",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "vaughan-ontario",
    name: "Vaughan",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "kitchener-ontario",
    name: "Kitchener",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "windsor-ontario",
    name: "Windsor",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "richmond-hill-ontario",
    name: "Richmond Hill",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "oakville-ontario",
    name: "Oakville",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "burlington-ontario",
    name: "Burlington",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "oshawa-ontario",
    name: "Oshawa",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "barrie-ontario",
    name: "Barrie",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "st-catharines-ontario",
    name: "St. Catharines",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "cambridge-ontario",
    name: "Cambridge",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "kingston-ontario",
    name: "Kingston",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "whitby-ontario",
    name: "Whitby",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "guelph-ontario",
    name: "Guelph",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "ajax-ontario",
    name: "Ajax",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "thunder-bay-ontario",
    name: "Thunder Bay",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "waterloo-ontario",
    name: "Waterloo",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "chatham-ontario",
    name: "Chatham",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "brantford-ontario",
    name: "Brantford",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "sudbury-ontario",
    name: "Sudbury",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "pickering-ontario",
    name: "Pickering",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "niagara-falls-ontario",
    name: "Niagara Falls",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "peterborough-ontario",
    name: "Peterborough",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  {
    place_id: "sault-ste-marie-ontario",
    name: "Sault Ste. Marie",
    secondary: "Ontario, Canada",
    types: ["city"],
  },
  // British Columbia
  {
    place_id: "vancouver-bc",
    name: "Vancouver",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "surrey-bc",
    name: "Surrey",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "burnaby-bc",
    name: "Burnaby",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "richmond-bc",
    name: "Richmond",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "kelowna-bc",
    name: "Kelowna",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "abbotsford-bc",
    name: "Abbotsford",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "coquitlam-bc",
    name: "Coquitlam",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "langley-bc",
    name: "Langley",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "saanich-bc",
    name: "Saanich",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "delta-bc",
    name: "Delta",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "kamloops-bc",
    name: "Kamloops",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "nanaimo-bc",
    name: "Nanaimo",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "victoria-bc",
    name: "Victoria",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "chilliwack-bc",
    name: "Chilliwack",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "maple-ridge-bc",
    name: "Maple Ridge",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "new-westminster-bc",
    name: "New Westminster",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "north-vancouver-bc",
    name: "North Vancouver",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "west-vancouver-bc",
    name: "West Vancouver",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  {
    place_id: "prince-george-bc",
    name: "Prince George",
    secondary: "British Columbia, Canada",
    types: ["city"],
  },
  // Quebec
  {
    place_id: "montreal-quebec",
    name: "Montreal",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "quebec-city-quebec",
    name: "Quebec City",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "laval-quebec",
    name: "Laval",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "gatineau-quebec",
    name: "Gatineau",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "longueuil-quebec",
    name: "Longueuil",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "sherbrooke-quebec",
    name: "Sherbrooke",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "saguenay-quebec",
    name: "Saguenay",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "levis-quebec",
    name: "Lévis",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "trois-rivieres-quebec",
    name: "Trois-Rivières",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "terrebonne-quebec",
    name: "Terrebonne",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "saint-jean-sur-richelieu-quebec",
    name: "Saint-Jean-sur-Richelieu",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "repentigny-quebec",
    name: "Repentigny",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "brossard-quebec",
    name: "Brossard",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "drummondville-quebec",
    name: "Drummondville",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "saint-jerome-quebec",
    name: "Saint-Jérôme",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "alma-quebec",
    name: "Alma",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  {
    place_id: "granby-quebec",
    name: "Granby",
    secondary: "Quebec, Canada",
    types: ["city"],
  },
  // Alberta
  {
    place_id: "calgary-alberta",
    name: "Calgary",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "edmonton-alberta",
    name: "Edmonton",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "red-deer-alberta",
    name: "Red Deer",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "lethbridge-alberta",
    name: "Lethbridge",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "st-albert-alberta",
    name: "St. Albert",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "medicine-hat-alberta",
    name: "Medicine Hat",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "grande-prairie-alberta",
    name: "Grande Prairie",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "airdrie-alberta",
    name: "Airdrie",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "spruce-grove-alberta",
    name: "Spruce Grove",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "leduc-alberta",
    name: "Leduc",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "fort-mcmurray-alberta",
    name: "Fort McMurray",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "camrose-alberta",
    name: "Camrose",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  {
    place_id: "banff-alberta",
    name: "Banff",
    secondary: "Alberta, Canada",
    types: ["city"],
  },
  // Saskatchewan
  {
    place_id: "saskatoon-saskatchewan",
    name: "Saskatoon",
    secondary: "Saskatchewan, Canada",
    types: ["city"],
  },
  {
    place_id: "regina-saskatchewan",
    name: "Regina",
    secondary: "Saskatchewan, Canada",
    types: ["city"],
  },
  {
    place_id: "prince-albert-saskatchewan",
    name: "Prince Albert",
    secondary: "Saskatchewan, Canada",
    types: ["city"],
  },
  {
    place_id: "moose-jaw-saskatchewan",
    name: "Moose Jaw",
    secondary: "Saskatchewan, Canada",
    types: ["city"],
  },
  {
    place_id: "swift-current-saskatchewan",
    name: "Swift Current",
    secondary: "Saskatchewan, Canada",
    types: ["city"],
  },
  {
    place_id: "yorkton-saskatchewan",
    name: "Yorkton",
    secondary: "Saskatchewan, Canada",
    types: ["city"],
  },
  // Manitoba
  {
    place_id: "winnipeg-manitoba",
    name: "Winnipeg",
    secondary: "Manitoba, Canada",
    types: ["city"],
  },
  {
    place_id: "brandon-manitoba",
    name: "Brandon",
    secondary: "Manitoba, Canada",
    types: ["city"],
  },
  {
    place_id: "steinbach-manitoba",
    name: "Steinbach",
    secondary: "Manitoba, Canada",
    types: ["city"],
  },
  {
    place_id: "portage-la-prairie-manitoba",
    name: "Portage la Prairie",
    secondary: "Manitoba, Canada",
    types: ["city"],
  },
  {
    place_id: "thompson-manitoba",
    name: "Thompson",
    secondary: "Manitoba, Canada",
    types: ["city"],
  },
  // Nova Scotia
  {
    place_id: "halifax-nova-scotia",
    name: "Halifax",
    secondary: "Nova Scotia, Canada",
    types: ["city"],
  },
  {
    place_id: "cape-breton-nova-scotia",
    name: "Cape Breton",
    secondary: "Nova Scotia, Canada",
    types: ["city"],
  },
  {
    place_id: "truro-nova-scotia",
    name: "Truro",
    secondary: "Nova Scotia, Canada",
    types: ["city"],
  },
  {
    place_id: "amherst-nova-scotia",
    name: "Amherst",
    secondary: "Nova Scotia, Canada",
    types: ["city"],
  },
  {
    place_id: "new-glasgow-nova-scotia",
    name: "New Glasgow",
    secondary: "Nova Scotia, Canada",
    types: ["city"],
  },
  {
    place_id: "antigonish-nova-scotia",
    name: "Antigonish",
    secondary: "Nova Scotia, Canada",
    types: ["city"],
  },
  {
    place_id: "yarmouth-nova-scotia",
    name: "Yarmouth",
    secondary: "Nova Scotia, Canada",
    types: ["city"],
  },
  // New Brunswick
  {
    place_id: "moncton-new-brunswick",
    name: "Moncton",
    secondary: "New Brunswick, Canada",
    types: ["city"],
  },
  {
    place_id: "saint-john-new-brunswick",
    name: "Saint John",
    secondary: "New Brunswick, Canada",
    types: ["city"],
  },
  {
    place_id: "fredericton-new-brunswick",
    name: "Fredericton",
    secondary: "New Brunswick, Canada",
    types: ["city"],
  },
  {
    place_id: "miramichi-new-brunswick",
    name: "Miramichi",
    secondary: "New Brunswick, Canada",
    types: ["city"],
  },
  {
    place_id: "bathurst-new-brunswick",
    name: "Bathurst",
    secondary: "New Brunswick, Canada",
    types: ["city"],
  },
  {
    place_id: "edmundston-new-brunswick",
    name: "Edmundston",
    secondary: "New Brunswick, Canada",
    types: ["city"],
  },
  // Newfoundland and Labrador
  {
    place_id: "st-johns-nl",
    name: "St. John's",
    secondary: "Newfoundland and Labrador, Canada",
    types: ["city"],
  },
  {
    place_id: "mount-pearl-nl",
    name: "Mount Pearl",
    secondary: "Newfoundland and Labrador, Canada",
    types: ["city"],
  },
  {
    place_id: "corner-brook-nl",
    name: "Corner Brook",
    secondary: "Newfoundland and Labrador, Canada",
    types: ["city"],
  },
  {
    place_id: "grand-falls-windsor-nl",
    name: "Grand Falls-Windsor",
    secondary: "Newfoundland and Labrador, Canada",
    types: ["city"],
  },
  {
    place_id: "gander-nl",
    name: "Gander",
    secondary: "Newfoundland and Labrador, Canada",
    types: ["city"],
  },
  // Prince Edward Island
  {
    place_id: "charlottetown-pei",
    name: "Charlottetown",
    secondary: "Prince Edward Island, Canada",
    types: ["city"],
  },
  {
    place_id: "summerside-pei",
    name: "Summerside",
    secondary: "Prince Edward Island, Canada",
    types: ["city"],
  },
  // Territories
  {
    place_id: "whitehorse-yukon",
    name: "Whitehorse",
    secondary: "Yukon, Canada",
    types: ["city"],
  },
  {
    place_id: "yellowknife-nwt",
    name: "Yellowknife",
    secondary: "Northwest Territories, Canada",
    types: ["city"],
  },
  {
    place_id: "iqaluit-nunavut",
    name: "Iqaluit",
    secondary: "Nunavut, Canada",
    types: ["city"],
  },
];

export const seedPlaces = async () => {
  try {
    await supabase.from("places").delete().gte("id", 0);

    const { data, error } = await supabase
      .from("places")
      .insert(PLACES)
      .select();

    if (error) {
      return { error: error.message };
    }

    return { message: "Places seeded successfully", count: data.length };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
