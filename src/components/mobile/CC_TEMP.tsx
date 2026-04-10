import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "~/stores";

interface ControlCardProps {
  children: React.ReactNode;
  className?: string;
}

const ControlCard = ({ children, className = "" }: ControlCardProps) => (
  <div
    className={`bg-black/30 backdrop-blur-md rounded-3xl p-5 border border-white/10 ${className}`}
  >
    {children}
  </div>
);

interface ThickPillProps {
  icon: string;
  value: number;
  onChange: (v: number) => void;
}

const ThickPill = ({ icon, value, onChange }: ThickPillProps) => {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <div className="relative w-full h-[160px] bg-white/10 rounded-[28px] overflow-hidden group cursor-pointer shadow-inner">
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 to-white/90"
        style={{ height: `${value}%` }}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize z-20 -rotate-90 origin-center scale-[2.5]"
      />
      <div
        className={`absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none transition-all duration-300 ${isDragging ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
      >
        <span
          className={`${icon} ${value > 50 ? "text-black/50" : "text-white/50"} text-[22px] drop-shadow-sm`}
        />
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 blur-[2px]"
        animate={{ y: `-${value}%` }}
      />
    </div>
  );
};

export default function ControlCenterTemp({ onClose }: { onClose: () => void }) {
  const { dark, volume, brightness, setVolume, setBrightness, toggleDark } = useStore(
    (s) => ({
      dark: s.dark,
      volume: s.volume,
      brightness: s.brightness,
      setVolume: s.setVolume,
      setBrightness: s.setBrightness,
      toggleDark: s.toggleDark
    })
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-xl"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[201] w-full max-w-[420px] mx-auto px-4"
      >
        <div className="bg-black/50 backdrop-blur-[50px] rounded-[32px] p-6 shadow-2xl border border-white/10">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex gap-5">
              <ThickPill
                icon="i-mdi:brightness-6"
                value={brightness as number}
                onChange={setBrightness}
              />
              <ThickPill
                icon="i-mdi:volume-high"
                value={volume as number}
                onChange={setVolume}
              />
            </div>
          </div>
          <div className="mt-5">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={toggleDark}
              className="w-full h-[72px] bg-white/10 rounded-[22px] px-4 flex items-center gap-3 border border-white/5"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? "bg-indigo-500" : "bg-white/10"}`}
              >
                <span
                  className={`${dark ? "i-mdi:moon-waning-crescent" : "i-mdi:white-balance-sunny"} text-white text-xl`}
                />
              </div>
              <span className="text-[14px] font-bold text-white/90">Dark Mode</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
