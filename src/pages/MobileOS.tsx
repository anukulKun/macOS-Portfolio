import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "~/stores";
import Springboard from "~/components/mobile/Springboard";
import MobileDock from "~/components/mobile/MobileDock";
import MobileAppWindow from "~/components/mobile/MobileAppWindow";
import StatusBar from "~/components/mobile/StatusBar";
import { wallpapers, apps } from "~/configs";
import ControlCenter from "~/components/mobile/ControlCenter";

export default function MobileOS() {
  const [ccOpen, setCcOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);

  const { dark, brightness } = useStore((s) => ({
    dark: s.dark,
    brightness: s.brightness
  }));

  const activeAppData = apps.find((a) => a.id === activeApp);

  return (
    <div
      className="w-full h-[100dvh] fixed inset-0 flex flex-col font-sans touch-none overflow-hidden"
      style={{
        backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: `brightness(${Number(brightness) * 0.7 + 50}%)`
      }}
    >
      {/* Wallpaper Layer */}
      <motion.div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${dark ? wallpapers.night : wallpapers.day})`,
          filter: `brightness(${Number(brightness) * 0.7 + 50}%) ${ccOpen ? "blur(12px)" : "blur(0px)"}`,
          transform: ccOpen ? "scale(0.96)" : "scale(1)",
          borderRadius: ccOpen ? "40px" : "0px",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      />

      {/* Apps Layer */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col"
        style={{
          filter: ccOpen ? "blur(12px)" : "none",
          transform: ccOpen ? "scale(0.96)" : "scale(1)",
          borderRadius: ccOpen ? "40px" : "0px",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        <div className="flex-1 w-full flex flex-col overflow-hidden relative pb-4">
          <Springboard openApp={setActiveApp} />
          <MobileDock openApp={setActiveApp} />
        </div>
      </motion.div>

      {/* StatusBar */}
      <div className="absolute top-0 left-0 w-full z-[102] pointer-events-none">
        <StatusBar ccOpen={ccOpen} setCcOpen={setCcOpen} />
      </div>

      {/* Control Center trigger */}
      <div
        className="absolute top-0 right-0 w-[40%] h-[40px] z-[110] pointer-events-auto cursor-pointer hover:bg-white/5 transition-colors rounded-bl-2xl"
        onClick={() => setCcOpen(!ccOpen)}
      />

      {/* Control Center */}
      <AnimatePresence>
        {ccOpen && <ControlCenter onClose={() => setCcOpen(false)} />}
      </AnimatePresence>

      {/* App Window */}
      <AnimatePresence>
        {activeApp && activeAppData && (
          <MobileAppWindow
            app={activeAppData}
            closeApp={() => setActiveApp(null)}
            key="mobile-window"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
