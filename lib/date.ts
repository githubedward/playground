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
