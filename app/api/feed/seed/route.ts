import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Seeds the database with sample users and posts
 * - Clears existing posts and users
 * - Creates sample users
 * - Creates sample posts (75% with images, 25% text-only)
 * - Posts are timestamped 1 minute apart for chronological feed
 */
export async function POST() {
  console.log("Feed: Seeding database");

  try {
    // Clear existing data
    console.log("Feed: Clearing existing data");
    await supabase.from("posts").delete().gte("id", 0);
    await supabase.from("users").delete().gte("id", 0);

    console.log("Feed: Creating sample users");
    // Generate and insert users (100)
    const users = generateUsers(2);
    const { data: createdUsers } = await supabase
      .from("users")
      .insert(users)
      .select();

    console.log("Feed: Creating sample posts");
    // Generate and insert posts (1000 with 75% having images)
    const posts = generatePosts(10, createdUsers ?? []);
    const { data: createdPosts } = await supabase
      .from("posts")
      .insert(posts)
      .select();

    console.log("Feed: Database seeded successfully");
    return Response.json({
      message: "Database seeded successfully",
      users: createdUsers?.length ?? 0,
      posts: createdPosts?.length ?? 0,
    });
  } catch (error) {
    console.error("Feed: Error seeding database", error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

// Helper functions
const generateUsers = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    username: `user_${i + 1}`,
    avatar_url: `https://picsum.photos/80/80?random=user${i + 1}`,
  }));
};

const generatePosts = (count: number, users: { id: string }[]) => {
  return Array.from({ length: count }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    const postType = getPostType(i);

    return {
      user_id: user.id,
      content: postType.content,
      image_url: postType.image_url,
      image_alt: postType.image_alt,
      created_at: new Date(Date.now() - i * 60000).toISOString(), // 1 minute apart
    };
  });
};

const getPostType = (postId: number) => {
  const rand = postId % 4; // 0,1,2,3

  if (rand === 0) {
    // 25% text-only
    return {
      content: generateTweetText(),
      image_url: null,
      image_alt: null,
    };
  } else {
    // 75% text + image (rand = 1,2,3)
    return {
      content: generateImageCaption(),
      image_url: `https://picsum.photos/400/${200 + (postId % 200)}?random=${postId}`,
      image_alt: "Post image",
    };
  }
};

const generateTweetText = () => {
  const tweets = [
    "Just shipped a new feature! 🚀",
    "Learning Next.js has been an amazing journey",
    "Coffee + code = perfect morning ☕",
    "React hooks make everything so much cleaner",
    "Sometimes the best debugging tool is a good night's sleep",
    "TypeScript is growing on me more each day",
  ];
  return tweets[Math.floor(Math.random() * tweets.length)];
};

const generateImageCaption = () => {
  const captions = [
    "Check out this amazing view!",
    "New workspace setup 💻",
    "Weekend project coming along nicely",
    "Thought this was worth sharing",
    "Beautiful day for coding outside",
  ];
  return captions[Math.floor(Math.random() * captions.length)];
};
