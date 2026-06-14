import type { SanityImageSource } from "@sanity/image-url";

// Destination schema type
export interface Destination {
  _id: string;
  _type: "destination";
  name: string;
  slug: {
    current: string;
  };
  tagline: string;
  heroImage: SanityImageSource;
  description: string;
  highlights: string[];
  goodToKnow: GoodToKnowItem[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface GoodToKnowItem {
  _key: string;
  title: string;
  content: string;
}

// Package schema type
export interface Package {
  _id: string;
  _type: "package";
  name: string;
  slug: {
    current: string;
  };
  destination: {
    _ref: string;
  };
  duration: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  heroImage: SanityImageSource;
  included: string[];
  itinerary: ItineraryDay[];
  featured: boolean;
}

export interface ItineraryDay {
  _key: string;
  day: number;
  title: string;
  description: string;
}

// Expanded package with destination details (for queries with references)
export interface PackageWithDestination extends Omit<Package, "destination"> {
  destination: Destination;
}
