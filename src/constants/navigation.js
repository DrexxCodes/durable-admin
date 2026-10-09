import { FiSettings } from "react-icons/fi";

/** Bottom-tab shortcuts on phones; everything else lives in the "More" sheet. */
export const PRIMARY_URLS = ["/dashboard", "/users", "/transactions", "/wallets"];
export const SHORT_NAMES = {
  "/dashboard": "Home",
  "/users": "Users",
  "/transactions": "Sales",
  "/wallets": "Wallet",
};

/** Sidebar sections. Items that match none of them still show (under "More"). */
export const NAV_GROUPS = [
  { label: "Overview", urls: ["/dashboard", "/users", "/transactions", "/wallets", "/products", "/converter"] },
  { label: "Manage", urls: ["/controls", "/inventory", "/switchers", "/sliders", "/faqs", "/administration"] },
  { label: "Updates", urls: ["/notifications", "/activities"] },
];

export const SECONDARY_NAV = [{ name: "Settings", url: "/settings", icon: <FiSettings /> }];

export const isActivePath = (pathname, url) =>
  url === "/" ? pathname === "/" : pathname === url || pathname.startsWith(`${url}/`);

/**
 * Visible items come straight from the context's `sidebarList`, so the white-label
 * `show` rules stay where they always were.
 */
export const visibleNav = (sidebarList = []) => sidebarList.filter(item => item?.show);

export function groupNav(items) {
  const taken = new Set();
  const groups = NAV_GROUPS.map(g => {
    const list = g.urls.map(u => items.find(i => i.url === u)).filter(Boolean);
    list.forEach(i => taken.add(i.url));
    return { label: g.label, items: list };
  });
  const rest = items.filter(i => !taken.has(i.url));
  if (rest.length) groups.push({ label: "More", items: rest });
  return groups.filter(g => g.items.length);
}
