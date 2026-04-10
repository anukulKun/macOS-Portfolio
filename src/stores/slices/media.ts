import type { StateCreator } from "zustand";

export interface MediaState {
  media: {
    track: string;
    title: string;
    artist: string;
    progress: number;
    duration: number;
    playing: boolean;
  };
  setPlaying: (v: boolean) => void;
  setProgress: (v: number) => void;
  setDuration: (v: number) => void;
}

export const createMediaSlice: StateCreator<MediaState> = (set) => ({
  media: {
    track: "music/sunflower.mp3",
    title: "Sunflower",
    artist: "Post Malone / Swae Lee",
    progress: 0,
    duration: 0,
    playing: false
  },
  setPlaying: (v) => set((state) => ({ media: { ...state.media, playing: v } })),
  setProgress: (v) => set((state) => ({ media: { ...state.media, progress: v } })),
  setDuration: (v) => set((state) => ({ media: { ...state.media, duration: v } }))
});
