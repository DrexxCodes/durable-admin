import { useEffect, useRef } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { BiArrowBack } from "react-icons/bi";
import { FiX } from "react-icons/fi";

/**
 * Same API as the old reactstrap-based ModalComponents
 * (isOpen, toggle, title, back, size, notHeader, borderNone, success, children)
 * without reactstrap / bootstrap JS.
 */
export function ModalComponents({
  isOpen,
  toggle,
  title,
  children,
  back,
  size,
  notHeader,
  success,
}) {
  useBodyScrollLock(isOpen);

  // keep the latest toggle without re-subscribing the key listener on every render
  const toggleRef = useRef(toggle);
  toggleRef.current = toggle;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => e.key === "Escape" && toggleRef.current && toggleRef.current();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="ui-modal-backdrop" onMouseDown={e => e.target === e.currentTarget && toggle && toggle()}>
      <div
        className={`ui-modal ${size === "sm" ? "ui-modal-sm" : size === "lg" ? "ui-modal-lg" : ""} ${
          notHeader ? "ui-modal-bare" : ""
        }`}
        role="dialog"
        aria-modal="true">
        {!notHeader && (
          <div className="ui-modal-header">
            {back && (
              <button type="button" className="ui-icon-btn" onClick={back} aria-label="Back">
                <BiArrowBack />
              </button>
            )}
            <h5 className={`ui-modal-title ${success || ""}`}>{title}</h5>
            {toggle && (
              <button type="button" className="ui-icon-btn ms-auto" onClick={toggle} aria-label="Close">
                <FiX />
              </button>
            )}
          </div>
        )}
        <div className="ui-modal-body">{children}</div>
      </div>
    </div>
  );
}

export default ModalComponents;
