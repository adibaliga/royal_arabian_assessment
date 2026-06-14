import type { Metadata } from "next";
import { chinaPageData } from "@/lib/queries";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/sections/HeroSection";
import DestinationIntro from "@/components/sections/DestinationIntro";
import PackagesSection from "@/components/sections/PackagesSection";
import GoodToKnowSection from "@/components/sections/GoodToKnowSection";

export async function generateMetadata(): Promise<Metadata> {
  const { destination } = await chinaPageData("cn");

  if (!destination) {
    return {
      title: "Destination Not Found | Royal Arabian",
      description: "The requested destination could not be found.",
    };
  }

  return {
    title: destination.metaTitle
      ? `${destination.metaTitle} | Royal Arabian`
      : `${destination.name} | Royal Arabian`,
    description:
      destination.metaDescription || destination.tagline || destination.description?.slice(0, 160),
  };
}

export default async function ChinaDestinationPage() {
  const { destination, packages } = await chinaPageData("cn");

  if (!destination) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-ra-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-ra-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-ra-navy mb-3">
            Destination Not Found
          </h1>
          <p className="text-gray-500 mb-8">
            We couldn&apos;t find the destination you&apos;re looking for.
            Please check back later or explore our other destinations.
          </p>
          <a
            href="/"
            className="inline-block bg-ra-orange hover:bg-ra-orange/90 text-white font-semibold text-sm uppercase tracking-wider py-3 px-6 rounded-lg transition-colors"
          >
            Return Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <HeroSection
        name={destination.name}
        tagline={destination.tagline}
        heroImage={destination.heroImage}
      />
      <AnimatedSection delay={100}>
        <DestinationIntro
          name={destination.name}
          description={destination.description}
          highlights={destination.highlights}
        />
      </AnimatedSection>
      <AnimatedSection delay={200}>
        <PackagesSection packages={packages} />
      </AnimatedSection>
      <AnimatedSection delay={300}>
        <GoodToKnowSection items={destination.goodToKnow} />
      </AnimatedSection>
    </main>
  );
}
