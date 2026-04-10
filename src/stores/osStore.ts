import create from "zustand";

interface OsState {
  spotlightOpen: boolean;
  launchpadOpen: boolean;
  activeApp: string | null;
  setSpotlightOpen: (v: boolean) => void;
  setLaunchpadOpen: (v: boolean) => void;
  setActiveApp: (id: string | null) => void;
}

export const useOsStore = create<OsState>((set) => ({
  spotlightOpen: false,
  launchpadOpen: false,
  activeApp: null,
  setSpotlightOpen: (v) => set({ spotlightOpen: v }),
  setLaunchpadOpen: (v) => set({ launchpadOpen: v }),
  setActiveApp: (id) => set({ activeApp: id })
}));
