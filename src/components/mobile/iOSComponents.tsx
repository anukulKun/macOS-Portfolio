import React from "react";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────────
   iOS Settings Design System — Atomic Primitives
   ──────────────────────────────────────────────── */

/* ── SettingRow ── */
interface SettingRowProps {
  icon?: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  arrow?: boolean;
}

export const SettingRow = ({
  icon,
  label,
  value,
  onClick,
  href,
  target,
  arrow = true
}: SettingRowProps) => {
  const Tag = href ? "a" : "button";
  const props = href
    ? { href, target: target || "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      as={Tag as any}
      {...props}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick={onClick}
      className="flex items-center w-full text-left px-4 py-3 min-h-[48px] active:opacity-60 transition-opacity duration-100"
    >
      {icon && (
        <span className="w-8 flex items-center justify-center mr-3 text-xl">{icon}</span>
      )}
      <span className="flex-1 text-[15px] text-[#333] dark:text-[#f5f5f7] truncate">
        {label}
      </span>
      {value && <span className="text-[15px] text-[#8e8e93] mr-1.5">{value}</span>}
      {arrow && (
        <svg
          className="w-4 h-4 text-[#c7c7cc] ml-1 flex-shrink-0"
          fill="none"
          viewBox="0 0 12 20"
        >
          <path
            d="M2 2l8 8-8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </motion.div>
  );
};

/* ── SectionGroup ── */
interface SectionGroupProps {
  title?: string;
  children: React.ReactNode;
}

export const SectionGroup = ({ title, children }: SectionGroupProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 350, damping: 28 }}
    className="mb-6"
  >
    {title && (
      <div className="uppercase text-xs font-semibold text-[#8e8e93] tracking-wider px-4 mb-1.5">
        {title}
      </div>
    )}
    <div className="bg-white dark:bg-[#121214] rounded-xl overflow-hidden shadow-sm border border-gray-200/40 dark:border-gray-800/50">
      {children}
    </div>
  </motion.div>
);

/* ── ProfileCard ── */
interface ProfileCardProps {
  avatar: string;
  name: string;
  subtitle: string;
}

export const ProfileCard = ({ avatar, name, subtitle }: ProfileCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 400, damping: 26 }}
    className="bg-white dark:bg-[#1c1c1e] rounded-xl p-4 mb-6 flex items-center gap-4 shadow-sm border border-gray-100/60 dark:border-white/[0.06]"
  >
    <img
      src={avatar}
      alt={name}
      className="w-[56px] h-[56px] rounded-full object-cover shadow-md flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <div className="text-[20px] font-semibold text-[#333] dark:text-[#f5f5f7] tracking-tight leading-tight">
        {name}
      </div>
      <div className="text-[13px] text-[#8e8e93] leading-snug mt-0.5 truncate">
        {subtitle}
      </div>
    </div>
  </motion.div>
);

/* ── iOSTopBar ── */
interface iOSTopBarProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
  rightIcon?: React.ReactNode;
}

export const iOSTopBar = ({
  title,
  onBack,
  backLabel = "Back",
  rightIcon
}: iOSTopBarProps) => (
  <div className="sticky top-0 z-50 h-[56px] flex items-center justify-between px-2 border-b border-gray-200/60 dark:border-white/[0.08] bg-[#f2f2f7]/80 dark:bg-[#000]/80 backdrop-blur-xl">
    <button
      onClick={onBack}
      className="flex items-center gap-0.5 text-[#007aff] active:opacity-50 transition-opacity min-w-[52px]"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 12 20">
        <path
          d="M10 2L2 10l8 8"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[16px]">{backLabel}</span>
    </button>
    <div className="absolute left-1/2 -translate-x-1/2">
      <span className="text-[16px] font-semibold text-[#333] dark:text-[#f5f5f7]">
        {title}
      </span>
    </div>
    {rightIcon && <div className="min-w-[52px] flex justify-end">{rightIcon}</div>}
  </div>
);
