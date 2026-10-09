import { useEffect, useState } from "react";

/**
 * Skeletons must never shimmer forever when a request fails or the API is down:
 * after `ms` this flips to true and the page falls back to showing whatever it has.
 */
export function useGiveUp(ms = 15000) {
  const [giveUp, setGiveUp] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGiveUp(true), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return giveUp;
}
