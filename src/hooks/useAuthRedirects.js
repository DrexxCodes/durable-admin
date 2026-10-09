import { useEffect } from "react";
import { useNavigate } from "@/lib/router";
import { loginUrlFor, safeNext } from "@/lib/redirect";
import { useBooted } from "@/components/BootContext";
import { APP_AREAS, AUTH_ONLY_REDIRECT } from "@/config/routes";

/**
 * Auth-aware redirects (nothing fires until the stored token has been checked):
 *  - guests opening a logged-in page (bookmark, refresh) -> /login?next=<page>
 *  - logged-in users opening login/register -> back to `next`, else home
 */
export function useAuthRedirects({ auth, page, isRoot, pathname, search }) {
  const navigate = useNavigate();
  const ready = useBooted();
  const isAppArea = !isRoot && APP_AREAS.has(page);

  useEffect(() => {
    if (!ready) return;
    if (auth?.user) {
      if (AUTH_ONLY_REDIRECT.includes(page)) {
        const next = safeNext(new URLSearchParams(search).get("next"));
        navigate(next || "/", { replace: true });
      }
      return;
    }
    if (isAppArea) navigate(loginUrlFor(pathname, search), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, auth?.user, page, isAppArea, pathname, search]);

  return { ready, isAppArea, redirecting: ready && !auth?.user && isAppArea };
}
