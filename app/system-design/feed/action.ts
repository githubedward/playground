"use server";

import { createClient } from "@supabase/supabase-js";
import { FeedPostType } from "./_types";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const LIMIT = 20;

export async function getFeedPosts(page: number): Promise<FeedPostType[]> {
  const start = page * LIMIT;
  const end = start + LIMIT - 1; // Supabase range is inclusive, so subtract 1

  console.log(`Fetching posts: page ${page}, range ${start}-${end}`);

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        content,
        image_url,
        image_alt,
        created_at,
        users!inner(username, avatar_url)
      `,
      )
      .order("created_at", { ascending: false })
      .range(start, end);

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    return data as unknown as FeedPostType[];
  } catch (error) {
    console.error("Feed: Error fetching posts", error);
    return [];
  }
}
