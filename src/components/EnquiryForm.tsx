"use client";

import { useState, FormEvent } from "react";

interface EnquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
}

export default function EnquiryForm({ isOpen, onClose, packageName }: EnquiryFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(packageName ? `I'm interested in the ${packageName} package.` : "");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          packageName: packageName || undefined,
          message: message.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage(packageName ? `I'm interested in the ${packageName} package.` : "");
    setStatus("idle");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ra-navy">
              {packageName ? `Enquire: ${packageName}` : "Enquire Now"}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-ra-navy mb-2">Thank You!</h3>
              <p className="text-gray-600">Your enquiry has been submitted. We&apos;ll be in touch soon.</p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 bg-ra-navy hover:bg-ra-navy/90 text-white font-semibold text-sm uppercase tracking-wider py-3 px-8 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ra-gold/50 focus:border-ra-gold outline-none transition-colors text-sm"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ra-gold/50 focus:border-ra-gold outline-none transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ra-gold/50 focus:border-ra-gold outline-none transition-colors text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ra-gold/50 focus:border-ra-gold outline-none transition-colors text-sm resize-none"
                  placeholder="Tell us about your travel plans..."
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-ra-orange hover:bg-ra-orange/90 disabled:bg-ra-orange/60 text-white font-semibold text-sm uppercase tracking-wider py-3 px-6 rounded-lg transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
