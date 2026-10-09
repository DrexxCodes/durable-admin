import { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/Data/Context";
import { useLocation, useNavigate } from "@/lib/router";
import { visibleNav } from "@/constants/navigation";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useIdleLogout } from "@/hooks/useIdleLogout";
import { resetBodyScrollLock } from "@/hooks/useBodyScrollLock";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";
import LogoutDialog from "./LogoutDialog";
import SupportFab from "@/components/feedback/SupportFab";
import SiteFooter from "./SiteFooter";

/** Authenticated layout: sidebar (desktop) / bottom tabs (mobile) + top bar. */
export default function AppShell({ children }) {
  const { auth, stateName, sidebarList, logoutUser } = useContext(GlobalState);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const items = visibleNav(sidebarList);

  useDocumentTitle(pathname);

  // a page change can never legitimately keep the body locked: release any leaked lock
  useEffect(() => {
    resetBodyScrollLock();
  }, [pathname]);

  const handleLogout = async () => {
    setConfirmLogout(false);
    await logoutUser();
    navigate("/");
  };
  useIdleLogout(handleLogout);

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        items={items}
        pathname={pathname}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        onLogout={() => setConfirmLogout(true)}
      />
      <div className="app-body">
        <Topbar pathname={pathname} title={stateName} user={auth?.user} onBack={() => navigate(-1)} />
        <main className="app-main">{children}</main>
        <SiteFooter />
      </div>
      <BottomNav items={items} pathname={pathname} onLogout={() => setConfirmLogout(true)} />
      {auth?.isAuth && <SupportFab />}
      <LogoutDialog
        isOpen={confirmLogout}
        onCancel={() => setConfirmLogout(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
