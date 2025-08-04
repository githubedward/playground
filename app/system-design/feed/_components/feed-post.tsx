import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatISOToTimeAgo } from "@/lib/date";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FeedPostType } from "../_types";

type FeedPostProps = {
  post: FeedPostType;
  isLastPost: boolean;
};

export function FeedPost({ post, isLastPost }: FeedPostProps) {
  const contentClass = cn("", post.image_url ? "mb-3" : undefined);

  return (
    <article
      className={cn(
        "border border-accent-foreground/5 p-4",
        !isLastPost && "border-b-0",
      )}
    >
      <header className="flex items-center gap-2 mb-3">
        <Avatar>
          <AvatarImage
            src={post.users.avatar_url}
            alt={post.users.username}
            width={80}
            height={80}
          />
          <AvatarFallback>{post.users.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{post.users.username}</span>
          <span className="text-xs text-gray-500">
            {formatISOToTimeAgo(post.created_at)}
          </span>
        </div>
      </header>
      <div className="ml-10">
        <div className={contentClass}>{post.content}</div>
        {post.image_url && (
          <Image
            src={post.image_url}
            alt={post.image_alt}
            width={500}
            height={500}
            className="rounded-sm"
          />
        )}
      </div>
    </article>
  );
}
