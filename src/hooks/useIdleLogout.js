import { useIdleTimer } from "react-idle-timer";

/** Auto-logout after 30 minutes of inactivity (same rule as the old sidebar). */
export function useIdleLogout(onIdle) {
  useIdleTimer({ timeout: 1000 * 60 * 30, onIdle, debounce: 500 });
}
