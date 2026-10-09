import { Link } from "@/lib/router";
import { FiChevronsLeft, FiChevronsRight, FiLogOut } from "react-icons/fi";
import Logo from "@/components/ui/Logo";
import NavIcon from "./NavIcon";
import { SECONDARY_NAV, groupNav, isActivePath } from "@/constants/navigation";

export default function Sidebar({ items, pathname, collapsed, onToggle, onLogout }) {
  const groups = groupNav(items);
  return (
    <aside className={`app-sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <div className="app-sidebar-head">
        <Logo size={34} />
        <button className="ui-icon-btn" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
        </button>
      </div>

      <nav className="app-sidebar-nav" aria-label="Main">
        {groups.map(group => (
          <div className="nav-group" key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map(({ name, url, icon }) => (
              <Link
                key={url}
                to={url}
                title={name}
                className={`nav-item ${isActivePath(pathname, url) ? "is-active" : ""}`}>
                <NavIcon icon={icon} />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="app-sidebar-foot">
        {SECONDARY_NAV.map(({ name, url, icon }) => (
          <Link
            key={url}
            to={url}
            title={name}
            className={`nav-item ${isActivePath(pathname, url) ? "is-active" : ""}`}>
            <NavIcon icon={icon} />
            <span>{name}</span>
          </Link>
        ))}
        <button type="button" className="nav-item nav-danger" title="Logout" onClick={onLogout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
