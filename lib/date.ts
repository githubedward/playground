/**
 * Format ISO timestamp to readable date
 * Treats the date as a local date without timezone conversion
 */
export function formatISOToReadableDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    // Extract the date parts without timezone conversion
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    // Create a new date object with local timezone
    const localDate = new Date(year, month, day);

    return localDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    // Fallback to original string if parsing fails
    return dateString;
  }
}

/**
 * Format ISO timestamp to "time ago" format (e.g., "2 hours ago", "3 days ago")
 */
export function formatISOToTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      // For posts older than a week, show the actual date
      return formatISOToReadableDate(dateString);
    }
  } catch {
    // Fallback to original string if parsing fails
    return dateString;
  }
}
