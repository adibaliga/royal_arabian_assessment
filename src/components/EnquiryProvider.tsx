"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import EnquiryForm from "./EnquiryForm";

interface EnquiryContextValue {
  openEnquiry: (packageName?: string) => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}

export default function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [packageName, setPackageName] = useState<string | undefined>();

  const openEnquiry = (name?: string) => {
    setPackageName(name);
    setIsOpen(true);
  };

  return (
    <EnquiryContext.Provider value={{ openEnquiry }}>
      {children}
      <EnquiryForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        packageName={packageName}
      />
    </EnquiryContext.Provider>
  );
}
