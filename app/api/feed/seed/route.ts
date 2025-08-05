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
 * - Posts have random timestamps within the last week
 */
export async function POST() {
  console.log("Feed: Seeding database");

  try {
    // Clear existing data
    console.log("Feed: Clearing existing data");
    await supabase.from("posts").delete().gte("id", 0);
    await supabase.from("users").delete().gte("id", 0);

    const userCount = 50;
    const postCount = 1000;

    console.log(`Feed: Creating sample users (${userCount})`);
    // Generate and insert users (2)
    const users = generateUsers(userCount);
    const { data: createdUsers } = await supabase
      .from("users")
      .insert(users)
      .select();

    console.log(`Feed: Creating sample posts (${postCount})`);
    // Generate and insert posts (20 with 75% having images)
    const posts = generatePosts(postCount, createdUsers ?? []);
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
      created_at: new Date(
        Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
      ).toISOString(), // Random within last week
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
    "Learning Next.js has been an amazing journey. The component system is so intuitive.",
    "Coffee + code = perfect morning ☕ Nothing beats debugging with a fresh cup.",
    "React hooks make everything so much cleaner. No more class components for me!",
    "Sometimes the best debugging tool is a good night's sleep. Came back this morning and found the bug in 5 minutes. Amazing what rest can do.",
    "TypeScript is growing on me more each day. The type safety is incredible once you get used to it.",
    "Working on a side project tonight. Building something cool with Supabase and Next.js. The developer experience is fantastic!",
    "Code review day today. Found some interesting patterns in the codebase. Always learning something new from the team.",
    "Performance optimization is like solving puzzles. Every millisecond counts in user experience.",
  ];
  return tweets[Math.floor(Math.random() * tweets.length)];
};

const generateImageCaption = () => {
  const captions = [
    "Check out this amazing view! Perfect spot for some outdoor coding.",
    "New workspace setup 💻 Finally got the dual monitor setup working. Productivity is through the roof!",
    "Weekend project coming along nicely. This UI is starting to look exactly like the design. Can't wait to ship it.",
    "Thought this was worth sharing. Sometimes you find inspiration in the most unexpected places.",
    "Beautiful day for coding outside. Fresh air and clean code go hand in hand.",
    "Coffee shop vibes today ☕ Nothing like a change of scenery to boost creativity.",
    "Late night coding session. The best ideas always come after midnight for some reason.",
  ];
  return captions[Math.floor(Math.random() * captions.length)];
};
