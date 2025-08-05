"use server";

import { createClient } from "@supabase/supabase-js";
import { FeedPostType } from "./_types";

export interface FeedResponse {
  posts: FeedPostType[];
  duration: number;
}

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const LIMIT = 20;

export async function getFeedPosts(page: number): Promise<FeedResponse> {
  const start = page * LIMIT;
  const end = start + LIMIT - 1; // Supabase range is inclusive, so subtract 1

  console.log(`Fetching posts: page ${page}, range ${start}-${end}`);

  const startTime = performance.now();

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

    const duration = performance.now() - startTime;

    if (error) {
      console.error("Supabase error:", error);
      return { posts: [], duration };
    }

    const posts = data as unknown as FeedPostType[];
    console.log(`Fetched ${posts.length} posts in ${duration.toFixed(2)}ms`);

    return { posts, duration };
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(
      `Feed: Error fetching posts after ${duration.toFixed(2)}ms`,
      error,
    );
    return { posts: [], duration };
  }
}
