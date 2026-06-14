import type { GoodToKnowItem } from "@/types";

interface GoodToKnowSectionProps {
  items: GoodToKnowItem[];
}

export default function GoodToKnowSection({
  items,
}: GoodToKnowSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-white">
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
