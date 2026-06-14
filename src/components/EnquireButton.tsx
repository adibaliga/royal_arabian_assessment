"use client";

import { useEnquiry } from "./EnquiryProvider";

interface EnquireButtonProps {
  packageName?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function EnquireButton({ packageName, className, children }: EnquireButtonProps) {
  const { openEnquiry } = useEnquiry();

  return (
    <button
      type="button"
      onClick={() => openEnquiry(packageName)}
      className={className}
    >
      {children || "Enquire Now"}
    </button>
  );
}
