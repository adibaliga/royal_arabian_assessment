import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

interface HeroSectionProps {
  name: string;
  tagline: string;
  heroImage: SanityImageSource;
}

export default function HeroSection({
  name,
  tagline,
  heroImage,
}: HeroSectionProps) {
  const imageUrl = urlFor(heroImage).width(1920).height(1080).url();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-block w-16 h-0.5 bg-ra-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {name}
          </h1>
          {tagline && (
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              {tagline}
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70">
        <span className="text-xs uppercase tracking-widest font-medium">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
