import Link from "next/link";

const QUICK_LINKS = [
  { href: "/cn", label: "Destinations" },
  { href: "/cn#packages", label: "Packages" },
  { href: "/cn", label: "China" },
  { href: "/cn#about", label: "About Us" },
  { href: "/cn#contact", label: "Contact" },
];

const CONTACT_INFO = [
  { label: "Phone", value: "+1 (555) 123-4567" },
  { label: "Email", value: "info@royalarabian.com" },
  { label: "Address", value: "123 Luxury Row, Dubai, UAE" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-ra-navy text-white">
      <div className="container-ra py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Link href="/cn" className="inline-block">
              <span className="text-2xl font-bold tracking-wide">
                <span className="text-ra-gold">Royal</span> Arabian
              </span>
            </Link>
            <p className="mt-4 text-gray-300 leading-relaxed text-sm">
              Your Fellow Traveller. We craft extraordinary travel experiences
              that blend luxury, culture, and adventure into unforgettable
              journeys across the most captivating destinations on Earth.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ra-gold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-ra-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ra-gold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {CONTACT_INFO.map((item) => (
                <li key={item.label}>
                  <span className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-200">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ra-gold/30">
        <div className="container-ra py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Royal Arabian. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-gray-400 hover:text-ra-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-400 hover:text-ra-gold transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
