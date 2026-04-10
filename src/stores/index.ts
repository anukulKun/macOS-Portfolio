import { create } from "zustand";
import { createDockSlice, type DockSlice } from "./slices/dock";
import { createSystemSlice, type SystemSlice } from "./slices/system";
import { createUserSlice, type UserSlice } from "./slices/user";
import { createMediaSlice, type MediaState } from "./slices/media";

export const useStore = create<DockSlice & SystemSlice & UserSlice & MediaState>(
  (...a) => ({
    ...createDockSlice(...a),
    ...createSystemSlice(...a),
    ...createUserSlice(...a),
    ...createMediaSlice(...a)
  })
);
