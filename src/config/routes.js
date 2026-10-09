import { appRoutes, publicRoutes } from "./routes.generated";

export { appRoutes, publicRoutes };

/** First URL segment of every logged-in page (dashboard, users, controls ...). */
export const APP_AREAS = new Set(
  Object.keys(appRoutes)
    .map(key => key.split("/")[0])
    .filter(area => area !== "home")
);

/** Logged-in users opening these are sent on (to `next`, else the dashboard). */
export const AUTH_ONLY_REDIRECT = ["login", "register"];

const escapeUsers = ["reseller", "users", "topuser", "upgrade", "standalone"];
const escapeTransactions = ["pending", "app"];
const escapeProducts = [
  "airtime", "data", "tv-subscriptions", "airtime_pin", "bulk_sms", "education", "auto-buy",
  "electricity-bills", "cgwallet", "verification", "verification-type",
];
const escapeAdmin = ["manager", "marketer", "billers", "superadmin", "developer", "accountant", "customer-care"];
const escapeWallet = [
  "bonus", "give-bonus", "bonus-data", "commissions", "referral", "my-wallet", "provider",
  "manage-transactions", "find-transactions", "manage-wallet", "wallet-funding", "manual",
];
const escapeControl = [
  "electricity", "education", "broadcasts", "cables", "bonus", "data", "category", "biller",
  "network", "manage-products", "manage-cgwallet", "manage-cgwallet-history", "blacklist",
];

/**
 * Port of the old PageRender name rules: `/:page/:id/:step` -> registry key.
 * (`page/id` when `id` is a known sub-page, otherwise `page/[id]`.)
 */
export function resolvePageName({ page, id, step }) {
  if (step) {
    if (
      (["biz", "verification"].includes(id) && step === "verify") ||
      (["purchase", "wallet"].includes(id) && step === "admin") ||
      (id === "commissions" && step === "stat") ||
      (id === "app" && ["privacy", "terms"].includes(step))
    )
      return `${page}/${id}/${step}`;
    return `${page}/${id}/[id]`;
  }
  if (id) {
    const known =
      (page === "users" && escapeUsers.includes(id)) ||
      (page === "products" && escapeProducts.includes(id)) ||
      (page === "controls" && escapeControl.includes(id)) ||
      (page === "administration" && escapeAdmin.includes(id)) ||
      ((page === "transactions" || page === "settings") && escapeTransactions.includes(id)) ||
      (page === "wallets" && escapeWallet.includes(id));
    return known ? `${page}/${id}` : `${page}/[id]`;
  }
  return `${page}`;
}
