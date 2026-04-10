import React from "react";
import { motion } from "framer-motion";
import { apps } from "~/configs";
import MobileIcon from "~/components/mobile/MobileIcon";

export default function Springboard({
  openApp,
  open
}: {
  openApp: (id: string) => void;
  open: string | null;
}) {
  const springboardApps = apps.filter((app) => app.id !== "launchpad");

  return (
    <div className="flex-1 w-full flex flex-col items-stretch justify start pt-20 pb-8 px-6 sm:px-10 overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-4 gap-y-8 w-full items-start justify-items-center">
        {springboardApps.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.03, type: "spring", stiffness: 260, damping: 20 }}
            className="w-[60px] sm:w-[68px]"
          >
            <MobileIcon app={app} onClick={openApp} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
