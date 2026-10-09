import { useContext, useEffect } from "react";
import { GlobalState } from "@/Data/Context";
import { useLocation, useNavigate, useParams } from "@/lib/router";
import { appRoutes, publicRoutes, resolvePageName } from "@/config/routes";
import { useAuthRedirects } from "@/hooks/useAuthRedirects";
import PageLoader from "@/components/ui/PageLoader";
import ErrorPage from "@/features/ErrorPage";
import AppHome from "@/views/app/home";
import GuestHome from "@/views/public/home";

/** Port of the old PageRender: same auth redirects, same URL -> page rules. */
export default function PageRouter() {
  const { auth, errors, clearErrors } = useContext(GlobalState);
  const params = useParams();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const isRoot = pathname === "/";
  const page = isRoot ? undefined : params.page;

  const { ready, isAppArea, redirecting } = useAuthRedirects({ auth, page, isRoot, pathname, search });

  useEffect(() => {
    // stale auth errors are cleared; guests are sent home (login), as before
    if (!auth?.isAuth && errors?.errorText) {
      // Never "go home" while already at "/": GuestHome is mid-redirect to /login, and this
      // navigate("/") would cancel that push and leave the landing page blank.
      if (!isRoot && page !== "login" && page !== "register" && !isAppArea) navigate("/");
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, auth?.isAuth, navigate, errors?.errorText]);

  // A stored token is still being verified: don't flash login / 404.
  if (!ready && !auth?.user) return <PageLoader fullscreen />;
  if (auth?.token && auth?.loading) return <PageLoader fullscreen={!auth?.user} />;
  if (redirecting) return <PageLoader fullscreen />;

  if (isRoot) return auth?.user ? <AppHome /> : <GuestHome />;

  const registry = auth?.user ? appRoutes : publicRoutes;
  const Page = registry[resolvePageName(params)];
  return Page ? <Page /> : <ErrorPage />;
}
