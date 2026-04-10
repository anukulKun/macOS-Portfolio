import React from "react";
import { motion } from "framer-motion";

export default function MobileIcon({
  app,
  onClick,
  isDock = false
}: {
  app: any;
  onClick: (id: string) => void;
  isDock?: boolean;
}) {
  const Icon = app.icon;
  const badge = app.badge;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (app.id === "github") {
      window.open("https://github.com/anukulKun/macOS-Portfolio", "_blank");
    } else {
      onClick(app.id);
    }
  };

  const sizeClass = isDock ? "w-full h-full" : "w-[56px] h-[56px]";

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center gap-1.5 focus:outline-none group select-none relative ${
        isDock ? "pt-0 w-full h-full" : ""
      }`}
    >
      <motion.div
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`flex items-center justify-center overflow-hidden transition-all duration-200 ${sizeClass} ${
          isDock
            ? "rounded-none bg-transparent shadow-none"
            : "rounded-[14px] bg-transparent shadow-none"
        }`}
      >
        {Icon ? (
          <span className="w-full h-full flex items-center justify-center p-0">
            <Icon className="w-full h-full" />
          </span>
        ) : (
          <img
            src={app.img}
            alt={app.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover rounded-[14px] pointer-events-none"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "img/icons/safari.png";
            }}
          />
        )}
      </motion.div>

      {badge && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#ff3b30] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-white/20 shadow-md z-10">
          {badge}
        </span>
      )}

      {!isDock && (
        <span className="text-[11px] font-medium text-white text-center drop-shadow-md tracking-tight w-full truncate px-1 mt-0.5">
          {app.title}
        </span>
      )}
    </button>
  );
}
