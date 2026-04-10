import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "~/stores";
import { music } from "~/configs";
import { audioManager } from "~/lib/audioManager";

interface ControlCardProps {
  children: React.ReactNode;
  className?: string;
}

const ControlCard = ({ children, className = "" }: ControlCardProps) => (
  <div
    className={`bg-black/30 backdrop-blur-md rounded-3xl p-4 border border-white/10 ${className}`}
  >
    {children}
  </div>
);

interface RoundToggleProps {
  icon: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}

const RoundToggle = ({
  icon,
  active,
  onClick,
  color = "bg-[#007AFF]"
}: RoundToggleProps) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
      active
        ? "bg-white/20 border-2 border-white/40"
        : "bg-white/10 border border-white/10"
    }`}
  >
    <span className={`${icon} text-[24px] text-white relative z-10`} />
  </motion.button>
);

interface ThickPillSliderProps {
  icon: string;
  value: number;
  onChange: (v: number) => void;
}

const ThickPillSlider = ({ icon, value, onChange }: ThickPillSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

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

export default function ControlCenter({ onClose }: { onClose: () => void }) {
  const {
    wifi,
    bluetooth,
    airdrop,
    dark,
    volume,
    brightness,
    fullscreen,
    toggleWIFI,
    toggleBluetooth,
    toggleAirdrop,
    toggleDark,
    setVolume,
    setBrightness,
    toggleFullScreen,
    media,
    setPlaying,
    setProgress,
    setDuration
  } = useStore((s) => ({
    wifi: s.wifi,
    bluetooth: s.bluetooth,
    airdrop: s.airdrop,
    dark: s.dark,
    volume: s.volume,
    brightness: s.brightness,
    fullscreen: s.fullscreen,
    toggleWIFI: s.toggleWIFI,
    toggleBluetooth: s.toggleBluetooth,
    toggleAirdrop: s.toggleAirdrop,
    toggleDark: s.toggleDark,
    setVolume: s.setVolume,
    setBrightness: s.setBrightness,
    toggleFullScreen: s.toggleFullScreen,
    media: s.media,
    setPlaying: s.setPlaying,
    setProgress: s.setProgress,
    setDuration: s.setDuration
  }));

  const [airplane, setAirplane] = useState(false);

  useEffect(() => {
    audioManager.load(music.audio);
    const update = () => {
      setProgress(audioManager.getCurrentTime());
      setDuration(audioManager.getDuration());
    };
    audioManager.audio.addEventListener("timeupdate", update);
    return () => audioManager.audio.removeEventListener("timeupdate", update);
  }, []);

  useEffect(() => {
    if (media.playing) {
      audioManager.play();
    } else {
      audioManager.pause();
    }
  }, [media.playing]);

  useEffect(() => {
    audioManager.setVolume(volume);
  }, [volume]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/25"
        onClick={onClose}
      />

      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -30, opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="fixed inset-0 z-[201] flex items-center justify-center px-4"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="w-full max-w-[400px] sm:min-w-[320px] bg-black/40 backdrop-blur-[40px] rounded-3xl p-4 sm:p-5 shadow-xl border border-white/10 flex flex-col gap-4 sm:gap-5 overflow-hidden mx-auto"
          style={{ backgroundImage: "none", pointerEvents: "auto" }}
        >
          <div className="grid grid-cols-2 gap-5">
            <ControlCard className="aspect-square grid grid-cols-2 gap-4 place-items-center !p-5">
              <RoundToggle
                icon="i-mdi:airplane"
                active={airplane}
                onClick={() => setAirplane(!airplane)}
                color="bg-[#FF9500]"
              />
              <RoundToggle
                icon="i-mdi:wifi"
                active={wifi}
                onClick={toggleWIFI}
                color="bg-[#007AFF]"
              />
              <RoundToggle
                icon="i-mdi:bluetooth"
                active={bluetooth}
                onClick={toggleBluetooth}
                color="bg-[#007AFF]"
              />
              <RoundToggle
                icon="i-mdi:access-point"
                active={airdrop}
                onClick={toggleAirdrop}
                color="bg-[#34C759]"
              />
            </ControlCard>

            <div className="flex gap-4">
              <ThickPillSlider
                icon="i-mdi:brightness-6"
                value={brightness as number}
                onChange={setBrightness}
              />
              <ThickPillSlider
                icon="i-mdi:volume-high"
                value={volume as number}
                onChange={setVolume}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: "i-mdi:flashlight", id: "torch" },
              { icon: "i-mdi:timer-outline", id: "timer" },
              { icon: "i-mdi:calculator", id: "calc" },
              { icon: "i-mdi:camera-outline", id: "cam" }
            ].map((u) => (
              <motion.button
                key={u.id}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square rounded-[22px] bg-white/10 flex items-center justify-center border border-white/5 transition-colors"
              >
                <span className={`${u.icon} text-white text-2xl opacity-90`} />
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={toggleDark}
              className="h-[72px] bg-white/10 rounded-[22px] px-4 flex items-center gap-3 border border-white/5 cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? "bg-indigo-500" : "bg-white/10"}`}
              >
                <span
                  className={`${dark ? "i-mdi:moon-waning-crescent" : "i-mdi:white-balance-sunny"} text-white text-xl`}
                />
              </div>
              <span className="text-[14px] font-bold text-white/90">Dark Mode</span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleFullScreen(!fullscreen)}
              className="h-[72px] bg-white/10 rounded-[22px] px-4 flex items-center gap-3 border border-white/5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10">
                <span
                  className={`${fullscreen ? "i-mdi:fullscreen-exit" : "i-mdi:fullscreen"} text-xl text-white`}
                />
              </div>
              <span className="text-[14px] font-bold text-white/90">Full Screen</span>
            </motion.div>
          </div>

          <ControlCard className="flex flex-col gap-4 !p-5">
            <div className="flex items-center gap-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-[#FF2D55] to-[#5856D6] flex items-center justify-center shadow-lg relative overflow-hidden group"
              >
                <span
                  className={`i-mdi:music text-white text-3xl transition-transform duration-700 ${media.playing ? "scale-110" : "scale-90 opacity-50"}`}
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-[17px] font-bold text-white leading-tight truncate">
                  {media.title}
                </div>
                <div className="text-[14px] text-white/50 truncate font-semibold mt-0.5">
                  {media.artist}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-1.5 w-full bg-white/10 rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  style={{ width: `${(media.progress / media.duration) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-10">
                <button className="text-white/60 hover:text-white transition-colors">
                  <span className="i-mdi:skip-previous text-3xl" />
                </button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlaying(!media.playing)}
                  className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/5"
                >
                  <span
                    className={`i-mdi:${media.playing ? "pause" : "play"} text-white text-3xl ml-0.5`}
                  />
                </motion.button>
                <button className="text-white/60 hover:text-white transition-colors">
                  <span className="i-mdi:skip-next text-3xl" />
                </button>
              </div>
            </div>
          </ControlCard>
        </div>
      </motion.div>
    </>
  );
}
