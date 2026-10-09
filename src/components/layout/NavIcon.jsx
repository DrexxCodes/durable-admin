import { cloneElement, isValidElement } from "react";

/** The context ships icons as ready-made elements; re-size them for the new shell. */
export default function NavIcon({ icon, size = 20 }) {
  return isValidElement(icon) ? cloneElement(icon, { size, className: "nav-icon" }) : null;
}
