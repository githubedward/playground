export type FeedPostType = {
  id: string;
  content: string;
  image_url: string;
  image_alt: string;
  created_at: string;
  users: {
    username: string;
    avatar_url: string;
  };
};

export type PerformanceMetric = {
  page: number;
  duration: number;
  postsCount: number;
  timestamp: number;
  renderDuration?: number;
};
