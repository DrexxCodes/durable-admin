import { useEffect } from "react";

/**
 * Reference-counted body scroll lock.
 *
 * Several modals can be open at once (global + page modals) or unmount mid-navigation.
 * Saving/restoring `body.style.overflow` per modal left the body stuck on "hidden";
 * here the original value is captured once, on the first lock, and restored only
 * when the last lock is released.
 */
let locks = 0;
let original = "";

export function lockBodyScroll() {
  if (typeof document === "undefined") return;
  if (locks === 0) {
    original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined" || locks === 0) return;
  locks -= 1;
  if (locks === 0) document.body.style.overflow = original;
}

/** Safety net: force-release everything (used on route change when no modal should be open). */
export function resetBodyScrollLock() {
  if (typeof document === "undefined") return;
  locks = 0;
  document.body.style.overflow = "";
}

export function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    lockBodyScroll();
    return unlockBodyScroll;
  }, [active]);
}
