"use client";

/**
 * Drop-in replacement for the small slice of react-router-dom the legacy admin pages use
 * (Link, useNavigate, useParams, useLocation, useSearchParams) so their logic stays untouched
 * while routing is handled by Next.js.
 *
 * Old routes were `/:page/:id/:step`, so params are derived from the path.
 */
import NextLink from "next/link";
import { useCallback, useMemo } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";

const STATE_KEY = "__nav_state";
const pathOnly = to => String(to || "").split(/[?#]/)[0].replace(/\/+$/, "") || "/";

function saveState(to, state) {
  try {
    if (state === undefined) sessionStorage.removeItem(STATE_KEY);
    else sessionStorage.setItem(STATE_KEY, JSON.stringify({ path: pathOnly(to), state }));
  } catch {
    /* storage unavailable: pages fall back to their own defaults */
  }
}

function readState(pathname) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STATE_KEY) || "null");
    return saved && saved.path === pathOnly(pathname) ? saved.state : null;
  } catch {
    return null;
  }
}

export function Link({ to, href, children, replace, state, onClick, ...rest }) {
  const target = href ?? to ?? "#";
  const handleClick = e => {
    saveState(target, state);
    if (onClick) onClick(e);
  };
  return (
    <NextLink href={target} replace={replace} onClick={handleClick} {...rest}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to, options = {}) => {
      if (typeof to === "number") {
        if (to < 0) router.back();
        else if (to > 0) window.history.go(to);
        return;
      }
      if (!to) return;
      saveState(to, options.state);
      if (options.replace) router.replace(to);
      else router.push(to);
    },
    [router]
  );
}

export function useParams() {
  const pathname = usePathname() || "/";
  return useMemo(() => {
    const [page, id, step] = pathname.split("/").filter(Boolean);
    return { page, id, step };
  }, [pathname]);
}

export function useLocation() {
  const pathname = usePathname() || "/";
  const search = useNextSearchParams();
  const searchString = search?.toString() ? `?${search.toString()}` : "";
  return useMemo(
    () => ({ pathname, search: searchString, state: readState(pathname) }),
    [pathname, searchString]
  );
}

export function useSearchParams() {
  const params = useNextSearchParams();
  return [params];
}
