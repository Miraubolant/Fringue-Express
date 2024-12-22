/**
 * Normalizes image URLs to ensure they are valid and optimized
 */
export const normalizeImageUrl = (url: string): string | null => {
  if (!url) return null;
  
  // Clean the URL
  const cleanUrl = url.trim();
  if (!cleanUrl) return null;

  try {
    // Validate URL
    new URL(cleanUrl);

    // Check if it's a Shopify URL
    if (cleanUrl.includes('cdn.shopify.com')) {
      // Remove any existing query parameters
      const baseUrl = cleanUrl.split('?')[0];
      // Add quality and format parameters for optimization
      return `${baseUrl}?width=800&quality=80&format=jpg`;
    }

    return cleanUrl;
  } catch {
    // Invalid URL
    return null;
  }
};