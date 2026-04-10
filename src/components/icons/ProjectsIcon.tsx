import React from "react";

interface ProjectsIconProps {
  className?: string;
}

const ProjectsIcon = ({ className }: ProjectsIconProps) => (
  <svg
    viewBox="0 0 32 32"
    width="100%"
    height="100%"
    className={className ?? "w-full h-full"}
  >
    <defs>
      <linearGradient id="pf-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#5b9ef4" }} />
        <stop offset="100%" style={{ stopColor: "#2d6fd9" }} />
      </linearGradient>
    </defs>
    {/* Slight scale to match the perceived optical size of neighboring PNG icons */}
    <g transform="translate(16 16) scale(1.12) translate(-16 -16)">
      <path d="M3 7 L9 7 L11 9 L29 9 L29 27 L3 27 Z" fill="#3b7dd8" />
      <path
        d="M2 13 L30 13 L30 26 Q30 28 28 28 L4 28 Q2 28 2 26 Z"
        fill="url(#pf-body)"
      />
    </g>
  </svg>
);

export default ProjectsIcon;
