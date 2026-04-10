import React, { useRef } from "react";
import { motion } from "framer-motion";
import { apps } from "~/configs";
import MobileIcon from "~/components/mobile/MobileIcon";

function DockIcon({ app, onClick }: { app: any; onClick: (id: string) => void }) {
  return (
    <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] flex items-center justify-center">
      <MobileIcon app={app} onClick={onClick} isDock={true} />
    </div>
  );
}

export default function MobileDock({
  openApp,
  open
}: {
  openApp: (id: string) => void;
  open: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const dockAppIds = ["facetime", "safari", "terminal", "github"];
  const dockApps = apps.filter((app) => dockAppIds.includes(app.id));
  const visibleApps = dockApps;

  return (
    <div
      className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-[100] px-4 w-full flex justify-center pointer-events-none"
      ref={containerRef}
    >
      <motion.div
        className="flex items-center justify-center gap-[20px] sm:gap-[24px] px-[20px] sm:px-[28px] h-[84px] sm:h-[92px] rounded-[30px] sm:rounded-[34px] bg-white/[0.08] backdrop-blur-[30px] border border-white/[0.15] shadow-lg pointer-events-auto"
        style={{
          width: "fit-content",
          maxWidth: "90vw"
        }}
      >
        {visibleApps.map((app) => (
          <DockIcon key={app.id} app={app} onClick={openApp} />
        ))}
      </motion.div>
    </div>
  );
}
