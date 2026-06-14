import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import EnquireButton from "@/components/EnquireButton";
import type { Package } from "@/types";

interface PackagesSectionProps {
  packages: Package[];
}

function PackageCard({ pkg }: { pkg: Package }) {
  const imageUrl = pkg.heroImage
    ? urlFor(pkg.heroImage).width(600).height(400).url()
    : "";

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link href={`/cn/packages/${pkg.slug.current}`} className="relative block h-52 sm:h-60 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={pkg.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-ra-navy/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
          {pkg.duration}
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <Link
          href={`/cn/packages/${pkg.slug.current}`}
          className="text-lg font-bold text-ra-navy mb-2 group-hover:text-ra-orange transition-colors hover:text-ra-orange"
        >
          {pkg.name}
        </Link>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-ra-orange">
            AED {pkg.price.toLocaleString()}
          </span>
          {pkg.originalPrice && pkg.originalPrice > pkg.price && (
            <span className="text-sm text-gray-400 line-through">
              AED {pkg.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
          {pkg.shortDescription}
        </p>

        <EnquireButton
          packageName={pkg.name}
          className="w-full text-center bg-ra-orange hover:bg-ra-orange/90 text-white font-semibold text-sm uppercase tracking-wider py-3 px-6 rounded-lg transition-colors"
        />
      </div>
    </div>
  );
}

export default function PackagesSection({
  packages,
}: PackagesSectionProps) {
  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-20 md:py-28 bg-gray-50">
      <div className="container-ra">
        <div className="text-center mb-14">
          <div className="mb-4">
            <span className="inline-block w-12 h-0.5 bg-ra-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-ra-navy mb-4">
            Our Packages
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
            Curated travel experiences designed for the discerning explorer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
