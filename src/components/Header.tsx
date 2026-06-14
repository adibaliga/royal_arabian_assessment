"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useEnquiry } from "./EnquiryProvider";

const NAV_LINKS = [
  { href: "/cn", label: "Destinations" },
  { href: "/cn#packages", label: "Packages" },
  { href: "/cn#about", label: "About" },
  { href: "/cn#contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-ra">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={`text-xl md:text-2xl font-bold tracking-wide transition-colors ${
              isScrolled ? "text-ra-navy" : "text-white"
            }`}
          >
            <span className="text-ra-gold">Royal</span>{" "}
            <span className={isScrolled ? "text-ra-navy" : "text-white"}>
              Arabian
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-ra-gold ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="bg-ra-orange hover:bg-ra-orange/90 text-white text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors"
            >
              Enquire Now
            </button>
          </nav>

          <button
            type="button"
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute left-0 top-0 block w-full h-0.5 rounded transition-all duration-300 ${
                  isScrolled ? "bg-ra-navy" : "bg-white"
                } ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block w-full h-0.5 -translate-y-1/2 rounded transition-all duration-300 ${
                  isScrolled ? "bg-ra-navy" : "bg-white"
                } ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 bottom-0 block w-full h-0.5 rounded transition-all duration-300 ${
                  isScrolled ? "bg-ra-navy" : "bg-white"
                } ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-ra-navy z-40">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-lg font-medium uppercase tracking-wider hover:text-ra-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => { setIsMenuOpen(false); openEnquiry(); }}
              className="bg-ra-orange hover:bg-ra-orange/90 text-white text-base font-semibold uppercase tracking-wider px-8 py-3 rounded transition-colors"
            >
              Enquire Now
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
