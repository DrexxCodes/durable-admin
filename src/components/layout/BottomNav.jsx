import { useState } from "react";
import { Link } from "@/lib/router";
import { FiMoreHorizontal, FiLogOut, FiX } from "react-icons/fi";
import NavIcon from "./NavIcon";
import { PRIMARY_URLS, SECONDARY_NAV, SHORT_NAMES, isActivePath } from "@/constants/navigation";

/** Mobile: 4 primary tabs + a "More" sheet for everything else. */
export default function BottomNav({ items, pathname, onLogout }) {
  const [open, setOpen] = useState(false);
  const primary = PRIMARY_URLS.map(u => items.find(i => i.url === u)).filter(Boolean);
  const more = items.filter(i => !PRIMARY_URLS.includes(i.url));
  const moreActive = [...more, ...SECONDARY_NAV].some(i => isActivePath(pathname, i.url));

  return (
    <>
      {open && <div className="sheet-backdrop" onClick={() => setOpen(false)} />}
      <div className={`more-sheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <strong>More</strong>
          <button className="ui-icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
            <FiX />
          </button>
        </div>
        <div className="more-grid">
          {[...more, ...SECONDARY_NAV].map(({ name, url, icon }) => (
            <Link key={url} to={url} onClick={() => setOpen(false)} className="more-item">
              <span className="more-icon">
                <NavIcon icon={icon} />
              </span>
              <span>{name}</span>
            </Link>
          ))}
          <button
            type="button"
            className="more-item more-danger"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}>
            <span className="more-icon">
              <FiLogOut size={20} />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <nav className="app-bottomnav" aria-label="Primary">
        {primary.map(({ name, url, icon }) => (
          <Link key={url} to={url} className={`tab ${isActivePath(pathname, url) ? "is-active" : ""}`}>
            <NavIcon icon={icon} size={22} />
            <span>{SHORT_NAMES[url] || name}</span>
          </Link>
        ))}
        <button type="button" className={`tab ${moreActive ? "is-active" : ""}`} onClick={() => setOpen(o => !o)}>
          <FiMoreHorizontal size={22} />
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
