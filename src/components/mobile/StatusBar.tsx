import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatusBarProps {
  ccOpen: boolean;
  setCcOpen: (v: boolean) => void;
}

export const StatusBar = ({ ccOpen, setCcOpen }: StatusBarProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[40px] flex justify-between items-center px-6 bg-transparent text-white select-none z-[102] pt-4">
      <div className="flex items-center">
        <span className="text-[15px] font-bold tracking-tight">{time}</span>
      </div>
      <div className="flex items-center gap-2 pt-0.5">
        <div className="flex items-center gap-0.5 mr-1">
          <div className="w-[3px] h-[5px] bg-white rounded-[0.5px]"></div>
          <div className="w-[3px] h-[7px] bg-white rounded-[0.5px]"></div>
          <div className="w-[3px] h-[9px] bg-white rounded-[0.5px]"></div>
          <div className="w-[3px] h-[11px] bg-white/40 rounded-[0.5px]"></div>
        </div>
        <span className="text-[12px] font-bold tracking-tighter mr-1.5">5G</span>

        <motion.button
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => setCcOpen(!ccOpen)}
          className="flex items-center justify-center p-1 rounded-full active:bg-white/10 transition-colors"
        >
          <span className="i-mdi:tune-vertical text-lg" />
        </motion.button>

        <div className="flex items-center gap-1 ml-0.5">
          <span className="text-[12px] font-bold">87</span>
          <div className="relative w-[24px] h-[12px] border border-white/40 rounded-[3px] p-[1px] flex items-center">
            <div className="h-full bg-white rounded-[1.5px] w-[82%]"></div>
            <div className="absolute -right-[2.5px] top-1/2 -translate-y-1/2 w-[1.5px] h-[4.5px] bg-white/40 rounded-r-[1px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
