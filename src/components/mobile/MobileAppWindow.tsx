import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "~/stores";
import ControlCenter from "./ControlCenter";

export default function MobileAppWindow({
  app,
  closeApp
}: {
  app: any;
  closeApp: () => void;
}) {
  const [time, setTime] = useState("");
  const [ccOpen, setCcOpen] = useState(false);
  const { dark, wifi, bluetooth, volume } = useStore((s) => ({
    dark: s.dark,
    wifi: s.wifi,
    bluetooth: s.bluetooth,
    volume: s.volume
  }));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="fixed inset-0 z-[150] bg-white dark:bg-black flex flex-col"
    >
      {/* Menu Bar */}
      <div className="h-[28px] shrink-0 flex items-center justify-between px-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <button onClick={closeApp} className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-50" />
          </div>
          <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
            {app.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCcOpen(true)}
            className="flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 px-2 py-0.5 rounded transition-colors"
          >
            <div className="flex items-center gap-1.5 opacity-80 text-gray-600 dark:text-gray-300">
              {bluetooth && <span className="i-mdi:bluetooth text-[12px]" />}
              {wifi && <span className="i-mdi:wifi text-[12px]" />}
              <span
                className={`text-[12px] ${volume === 0 ? "i-mdi:volume-off" : "i-mdi:volume-high"}`}
              />
            </div>
            <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 tabular-nums">
              {time}
            </span>
          </button>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-hidden relative">{app.content}</div>

      <AnimatePresence>
        {ccOpen && <ControlCenter onClose={() => setCcOpen(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
