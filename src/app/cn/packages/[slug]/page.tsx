import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { packageBySlug } from "@/lib/queries";
import AnimatedSection from "@/components/AnimatedSection";
import EnquireButton from "@/components/EnquireButton";
import type { PackageWithDestination, ItineraryDay, GoodToKnowItem } from "@/types";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "package" && defined(slug.current)]{ "slug": slug.current }`,
  );
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pkg = await packageBySlug(params.slug);

  if (!pkg) {
    return {
      title: "Package Not Found | Royal Arabian",
      description: "The requested package could not be found.",
    };
  }

  const title = `${pkg.name} | Royal Arabian`;
  const description =
    pkg.shortDescription ||
    `Explore ${pkg.name} in ${pkg.destination.name} with Royal Arabian.`;

  return { title, description };
}

export default async function PackageDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const pkg = await packageBySlug(params.slug);

  if (!pkg) {
    return <PackageNotFound />;
  }

  return (
    <main>
      <PackageHero pkg={pkg} />
      <AnimatedSection delay={100}>
        <PackageOverview pkg={pkg} />
      </AnimatedSection>
      <AnimatedSection delay={200}>
        <PackageItinerary itinerary={pkg.itinerary} />
      </AnimatedSection>
      <AnimatedSection delay={300}>
        <PackageGoodToKnow items={pkg.destination.goodToKnow} />
      </AnimatedSection>
    </main>
  );
}

function PackageNotFound() {
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
          Package Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          We couldn&apos;t find the package you&apos;re looking for. Please
          check back later or explore our other packages.
        </p>
        <Link
          href="/cn"
          className="inline-block bg-ra-orange hover:bg-ra-orange/90 text-white font-semibold text-sm uppercase tracking-wider py-3 px-6 rounded-lg transition-colors"
        >
          View China Packages
        </Link>
      </div>
    </main>
  );
}

function PackageHero({ pkg }: { pkg: PackageWithDestination }) {
  const heroImageUrl = urlFor(pkg.heroImage).width(1920).height(1080).url();

  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImageUrl}
          alt={pkg.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

      <div className="relative z-10 flex flex-col justify-end h-full pb-12 md:pb-16">
        <div className="container-ra w-full">
          <div className="mb-4">
            <Link
              href={`/${pkg.destination.slug.current}`}
              className="inline-flex items-center gap-1.5 text-sm text-gray-300 hover:text-ra-gold transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {pkg.destination.name}
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
            {pkg.name}
          </h1>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20">
            <svg
              className="w-4 h-4 text-ra-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
              <circle cx="12" cy="12" r="10" />
            </svg>
            {pkg.duration}
          </div>
        </div>
      </div>
    </section>
  );
}

function PackageOverview({ pkg }: { pkg: PackageWithDestination }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-ra">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="mb-4">
              <span className="inline-block w-12 h-0.5 bg-ra-gold" />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl md:text-5xl font-bold text-ra-orange">
                AED {pkg.price.toLocaleString()}
              </span>
              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                <span className="text-xl text-gray-400 line-through">
                  AED {pkg.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
              {pkg.shortDescription}
            </p>

            <EnquireButton
              packageName={pkg.name}
              className="inline-block bg-ra-orange hover:bg-ra-orange/90 text-white font-semibold text-sm uppercase tracking-wider py-3.5 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
            />
          </div>

          {pkg.included && pkg.included.length > 0 && (
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-ra-navy mb-6 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-ra-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {pkg.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 text-ra-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PackageItinerary({
  itinerary,
}: {
  itinerary: ItineraryDay[];
}) {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-ra">
        <div className="text-center mb-14">
          <div className="mb-4">
            <span className="inline-block w-12 h-0.5 bg-ra-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ra-navy mb-4">
            Itinerary
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Your day-by-day journey
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {itinerary.map((day, index) => (
            <div key={day._key} className="relative flex gap-6 pb-10 last:pb-0">
              {index < itinerary.length - 1 && (
                <div className="absolute left-[17px] top-10 bottom-0 w-0.5 bg-gray-200" />
              )}

              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-ra-navy flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">
                    {String(day.day).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-ra-navy mb-2">
                  {day.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {day.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageGoodToKnow({
  items,
}: {
  items: GoodToKnowItem[];
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-ra">
        <div className="text-center mb-14">
          <div className="mb-4">
            <span className="inline-block w-12 h-0.5 bg-ra-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ra-navy mb-4">
            Good to Know
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Essential information for your journey
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item) => (
            <details
              key={item._key}
              className="group rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 open:border-ra-gold/40 open:shadow-md"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-base md:text-lg font-semibold text-ra-navy pr-4">
                  {item.title}
                </span>
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-ra-gold transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </summary>
              <div className="px-6 pb-5 pt-1">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.content}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
