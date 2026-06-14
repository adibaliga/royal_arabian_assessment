import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export function getClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local",
    );
  }
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

export function urlFor(source: SanityImageSource) {
  return createImageUrlBuilder(getClient()).image(source);
}

export async function fetchSanity<T>(
  query: string,
  params = {},
): Promise<T> {
  try {
    const data = await getClient().fetch<T>(query, params);
    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}
