import React from "react";

interface TimelineIconProps {
  className?: string;
}

export default function TimelineIcon({ className }: TimelineIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="5"
        y="5"
        width="54"
        height="54"
        rx="12"
        fill="#ffffff"
        stroke="#d0d7de"
        strokeWidth="1.5"
      />
      <rect x="12" y="10" width="40" height="8" rx="4" fill="#0a66c2" />
      <circle cx="20" cy="29" r="3.2" fill="#0a66c2" />
      <circle cx="20" cy="40" r="3.2" fill="#0a66c2" />
      <circle cx="20" cy="51" r="3.2" fill="#0a66c2" />
      <rect x="29" y="27" width="21" height="3" rx="1.5" fill="#4b5563" />
      <rect x="29" y="31.5" width="16" height="2.6" rx="1.3" fill="#9ca3af" />
      <rect x="29" y="38" width="21" height="3" rx="1.5" fill="#4b5563" />
      <rect x="29" y="42.5" width="18" height="2.6" rx="1.3" fill="#9ca3af" />
      <rect x="29" y="49" width="21" height="3" rx="1.5" fill="#4b5563" />
      <rect x="29" y="53.5" width="14" height="2.6" rx="1.3" fill="#9ca3af" />
    </svg>
  );
}
