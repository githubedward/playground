import routesData from "../data/routes.json";

export interface RouteInfo {
  path: string;
  title: string;
  description?: string;
  readingTime: string;
  datePublished: string;
  category: string;
}

export interface RoutesData {
  routes: RouteInfo[];
  lastUpdated: string;
  totalRoutes: number;
}

/**
 * Get all routes from the generated JSON data
 */
export function getRoutesData(): RoutesData {
  return routesData as RoutesData;
}

/**
 * Get routes for navigation (filtered and sorted)
 */
export function getNavigationRoutes(): RouteInfo[] {
  const { routes } = getRoutesData();

  // Return routes sorted by category, then by path
  return routes.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.path.localeCompare(b.path);
  });
}

/**
 * Get routes by category
 */
export function getRoutesByCategory(category: string): RouteInfo[] {
  const { routes } = getRoutesData();
  return routes.filter((route) => route.category === category);
}

/**
 * Get all available categories
 */
export function getCategories(): string[] {
  const { routes } = getRoutesData();
  const categories = [...new Set(routes.map((route) => route.category))];
  return categories.sort();
}
