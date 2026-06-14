import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Set to false for real-time data in development
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to fetch data with error handling
export async function fetchSanity<T>(query: string, params = {}): Promise<T> {
  try {
    const data = await client.fetch<T>(query, params);
    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}
