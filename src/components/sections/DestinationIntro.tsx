interface DestinationIntroProps {
  name: string;
  description: string;
  highlights: string[];
}

export default function DestinationIntro({
  name,
  description,
  highlights,
}: DestinationIntroProps) {
  if (!description && (!highlights || highlights.length === 0)) {
    return null;
  }

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container-ra">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="mb-4">
              <span className="inline-block w-12 h-0.5 bg-ra-gold" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-ra-navy mb-8">
              About <span className="text-ra-orange">{name}</span>
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {description}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-ra-navy mb-8">
              Highlights
            </h3>
            {highlights && highlights.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-5 rounded-lg bg-gray-50 border border-gray-100 hover:border-ra-gold/40 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-full bg-ra-gold/10 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-ra-gold"
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
                    </div>
                    <span className="text-gray-700 text-sm font-medium leading-snug group-hover:text-ra-navy transition-colors">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">No highlights available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
