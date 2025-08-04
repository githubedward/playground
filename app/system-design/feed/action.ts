"use server";

import { createClient } from "@supabase/supabase-js";
import { FeedPostType } from "./_types";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function getFeedPosts(): Promise<FeedPostType[]> {
  try {
    const { data } = await supabase
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
      .range(0, 19);

    return data as unknown as FeedPostType[];
  } catch (error) {
    console.error("Feed: Error fetching posts", error);
    return [];
  }
}
