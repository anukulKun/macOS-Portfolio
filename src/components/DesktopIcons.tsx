import React from "react";
import TimelineIcon from "~/components/icons/TimelineIcon";

interface DesktopIconProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
}

const DesktopIcon = ({ id, title, icon, onClick }: DesktopIconProps) => {
  return (
    <button className="desktop-icon" onClick={() => onClick(id)} aria-label={title}>
      <div className="desktop-icon-image">{icon}</div>
      <span className="desktop-icon-label">{title}</span>
    </button>
  );
};

interface DesktopIconsProps {
  openApp: (id: string) => void;
}

const AboutIcon = () => (
  <img
    src="logo/121.jpg"
    alt="About Me"
    className="w-full h-full rounded-lg object-cover"
    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
  />
);

const ResumeIcon = () => (
  <svg viewBox="0 0 64 64" width="64" height="64">
    <defs>
      <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#4a4a4a" }} />
        <stop offset="100%" style={{ stopColor: "#2a2a2a" }} />
      </linearGradient>
      <linearGradient id="resumePaper" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#fff" }} />
        <stop offset="100%" style={{ stopColor: "#f5f5f5" }} />
      </linearGradient>
    </defs>
    <filter id="resumeShadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
      <feOffset dx="0" dy="2.5" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <g filter="url(#resumeShadow)">
      <rect x="10" y="8" width="44" height="50" rx="2" fill="url(#leatherGrad)" />
      <rect
        x="12"
        y="10"
        width="40"
        height="46"
        rx="1"
        fill="none"
        stroke="#555"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <rect x="14" y="12" width="36" height="42" fill="url(#resumePaper)" />
      <circle cx="20" cy="18" r="3" fill="#ddd" />
      <rect x="25" y="16" width="18" height="2" fill="#333" rx="0.5" />
      <rect x="25" y="19" width="12" height="1.5" fill="#999" rx="0.5" />
      <line x1="18" y1="24" x2="46" y2="24" stroke="#eee" strokeWidth="1" />
      <g fill="#bbb">
        <rect x="18" y="28" width="28" height="1.5" rx="0.5" />
        <rect x="18" y="32" width="24" height="1.5" rx="0.5" />
        <rect x="18" y="36" width="26" height="1.5" rx="0.5" />
        <rect x="18" y="42" width="28" height="1.5" rx="0.5" />
        <rect x="18" y="46" width="22" height="1.5" rx="0.5" />
      </g>
      <rect x="24" y="6" width="16" height="4" rx="1" fill="#ccc" />
      <rect x="26" y="7" width="12" height="2" rx="0.5" fill="#999" />
    </g>
  </svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
    <defs>
      <linearGradient id="projBody" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#3b82f6" }} />
        <stop offset="100%" style={{ stopColor: "#1e40af" }} />
      </linearGradient>
      <linearGradient id="projBack" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#2563eb" }} />
        <stop offset="100%" style={{ stopColor: "#1e3a8a" }} />
      </linearGradient>
      <pattern id="gridPat" width="8" height="8" patternUnits="userSpaceOnUse">
        <path
          d="M 8 0 L 0 0 0 8"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
        />
      </pattern>
      <filter id="projShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="0" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#projShadow)">
      <path d="M6 14 L18 14 L22 18 L58 18 L58 56 L6 56 Z" fill="url(#projBack)" />
      <path d="M6 14 L18 14 L22 18 L58 18 L58 56 L6 56 Z" fill="url(#gridPat)" />
    </g>
    <g transform="translate(10, 16)">
      <path
        d="M4 4 L40 4 L40 30 L4 30 Z"
        fill="#f8fafc"
        transform="rotate(-5)"
        stroke="#cbd5e1"
        strokeWidth="0.5"
      />
      <g transform="rotate(-5)">
        <rect x="8" y="8" width="12" height="2" fill="#3b82f6" rx="0.5" />
        <rect x="8" y="12" width="20" height="2" fill="#94a3b8" rx="0.5" />
        <rect x="8" y="16" width="16" height="2" fill="#94a3b8" rx="0.5" />
        <rect x="8" y="20" width="8" height="2" fill="#ef4444" rx="0.5" />
      </g>
    </g>
    <g filter="url(#projShadow)">
      <path
        d="M4 26 L60 26 L60 54 Q60 58 56 58 L8 58 Q4 58 4 54 Z"
        fill="url(#projBody)"
      />
      <path d="M4 26 L60 26" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <g transform="translate(32, 42)" opacity="0.25">
        <path
          d="M-8 -6 L-14 0 L-8 6"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 -6 L14 0 L8 6"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M-3 8 L3 -8" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);

const TerminalIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="screenGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2d2d2d" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      <filter id="iconShadow2" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="2"
          floodColor="#000"
          floodOpacity="0.3"
        />
      </filter>
    </defs>
    <g filter="url(#iconShadow2)">
      <rect x="6" y="6" width="52" height="52" rx="11" ry="11" fill="#080808" />
      <rect
        x="9"
        y="9"
        width="46"
        height="46"
        rx="7"
        ry="7"
        fill="url(#screenGradient2)"
      />
      <text
        x="14"
        y="25"
        fill="#ffffff"
        fontFamily="Monaco, Consolas, monospace"
        fontWeight="900"
        fontSize="12px"
      >
        <tspan>&gt;_</tspan>
      </text>
    </g>
  </svg>
);

const IRCChatIcon = () => (
  <svg viewBox="0 0 64 64" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="chatBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#5ca0fd" }} />
        <stop offset="50%" style={{ stopColor: "#1e6ecf" }} />
        <stop offset="100%" style={{ stopColor: "#0d47a1" }} />
      </linearGradient>
      <linearGradient id="chatGloss" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "rgba(255,255,255,0.8)" }} />
        <stop offset="45%" style={{ stopColor: "rgba(255,255,255,0.15)" }} />
        <stop offset="50%" style={{ stopColor: "rgba(255,255,255,0)" }} />
        <stop offset="100%" style={{ stopColor: "rgba(255,255,255,0)" }} />
      </linearGradient>
      <linearGradient id="borderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#aedaff" }} />
        <stop offset="100%" style={{ stopColor: "#00346b" }} />
      </linearGradient>
      <filter id="chatShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
        <feOffset dx="0" dy="3" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#chatShadow)">
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="12"
        fill="url(#chatBg)"
        stroke="url(#borderGrad)"
        strokeWidth="1.5"
      />
      <path
        d="M 20 9.5 L 44 9.5 A 10.5 10.5 0 0 1 54.5 20 V 23 C 54.5 29 9.5 29 9.5 23 V 20 A 10.5 10.5 0 0 1 20 9.5 Z"
        fill="url(#chatGloss)"
      />
      <g
        transform="translate(14, 14) scale(1.5)"
        style={{ filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.3))" }}
      >
        <circle cx="12" cy="12" r="10" stroke="#f0f0f0" strokeWidth="2" fill="none" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="#f0f0f0" strokeWidth="2" />
        <path
          d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          stroke="#f0f0f0"
          strokeWidth="2"
          fill="none"
        />
      </g>
    </g>
  </svg>
);

const desktopIcons = [
  { id: "about-me", title: "About Me", icon: <AboutIcon /> },
  { id: "resume", title: "Resume", icon: <ResumeIcon /> },
  { id: "timeline", title: "Timeline", icon: <TimelineIcon /> },
  { id: "projects", title: "Projects", icon: <ProjectsIcon /> },
  { id: "terminal", title: "Terminal", icon: <TerminalIcon /> },
  { id: "irc-chat", title: "IRC Chat", icon: <IRCChatIcon /> }
];

export default function DesktopIcons({ openApp }: DesktopIconsProps) {
  return (
    <div className="desktop-icons">
      {desktopIcons.map((item) => (
        <DesktopIcon
          key={item.id}
          id={item.id}
          title={item.title}
          icon={item.icon}
          onClick={openApp}
        />
      ))}
    </div>
  );
}
