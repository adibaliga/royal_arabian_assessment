import { fetchSanity } from "./sanity";
import type { Destination, Package, PackageWithDestination } from "@/types";

export function destinationBySlug(slug: string): Promise<Destination | null> {
  return fetchSanity<Destination | null>(
    `*[_type == "destination" && slug.current == $slug][0]`,
    { slug },
  );
}

export function featuredPackagesByDestination(
  destinationId: string,
): Promise<Package[]> {
  return fetchSanity<Package[]>(
    `*[_type == "package" && destination._ref == $destinationId && featured == true] | order(name asc)`,
    { destinationId },
  );
}

export function chinaPageData(
  slug: string,
): Promise<{ destination: Destination | null; packages: Package[] }> {
  return fetchSanity<{
    destination: Destination | null;
    packages: Package[];
  }>(
    `{
      "destination": *[_type == "destination" && slug.current == $slug][0],
      "packages": *[_type == "package" && featured == true && destination->slug.current == $slug] | order(name asc)
    }`,
    { slug },
  );
}

export function packageBySlug(
  slug: string,
): Promise<PackageWithDestination | null> {
  return fetchSanity<PackageWithDestination | null>(
    `*[_type == "package" && slug.current == $slug][0] {
      ...,
      destination->
    }`,
    { slug },
  );
}
