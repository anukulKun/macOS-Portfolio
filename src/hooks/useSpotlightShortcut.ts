import { useEffect } from "react";
import { useOSStore } from "~/stores/osStore";

export const useSpotlightShortcut = () => {
  const toggleSpotlight = useOSStore((s) => s.toggleSpotlight);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSpotlight();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleSpotlight]);
};
