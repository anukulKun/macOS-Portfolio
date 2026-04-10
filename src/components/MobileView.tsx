import { useWindowSize } from "~/hooks";

const MOBILE_BREAKPOINT = 768;

/**
 * Hook that returns true when viewport is below the mobile breakpoint.
 * Uses the same 768px threshold used throughout the codebase.
 */
export function useMobileDetection() {
  const { winWidth } = useWindowSize();
  return winWidth <= MOBILE_BREAKPOINT;
}
