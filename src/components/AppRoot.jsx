"use client";

import { useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Store from "@/Data/Store";
import DataProvider, { GlobalState } from "@/Data/Context";
import { loadUser } from "@/Data/Actions/AuthActions";
import { TOKEN } from "@/Data/Actions/ActionTypes";
import { SetAuthToken, SetDefaultHeaders } from "@/Data/Config";
import { installHttpLayer } from "@/lib/http";
import { BootProvider } from "@/components/BootContext";
import AppShell from "@/components/layout/AppShell";
import GlobalModals from "@/components/feedback/GlobalModals";
import SiteFooter from "@/components/layout/SiteFooter";
import InstallBanner from "@/components/pwa/InstallBanner";
import PwaRegister from "@/components/pwa/PwaRegister";
import PullToRefresh from "@/components/pwa/PullToRefresh";
import "@/lib/pwa"; // starts listening for beforeinstallprompt immediately

// Same boot sequence as the old App.js (runs in the browser only).
SetDefaultHeaders();
if (localStorage.getItem(TOKEN)) SetAuthToken(localStorage.getItem(TOKEN));
installHttpLayer(axios); // de-duplicates identical in-flight GETs

function Shell({ children }) {
  const { auth } = useContext(GlobalState);
  return (
    <>
      <ToastContainer autoClose={false} position="top-right" />
      <PwaRegister />
      <PullToRefresh />
      <InstallBanner />
      {auth?.user ? (
        <AppShell>{children}</AppShell>
      ) : (
        <div className="guest-shell">
          {children}
          <SiteFooter guest />
        </div>
      )}
      <GlobalModals />
    </>
  );
}

export default function AppRoot({ children }) {
  const [booted, setBooted] = useState(() => !localStorage.getItem(TOKEN));

  useEffect(() => {
    Promise.resolve(Store.dispatch(loadUser())).finally(() => setBooted(true));
    const link =
      document.querySelector("link[rel~='icon']") ||
      document.head.appendChild(Object.assign(document.createElement("link"), { rel: "icon" }));
    if (process.env.REACT_APP_IMAGE_URL) link.href = process.env.REACT_APP_IMAGE_URL;
  }, []);

  return (
    <Provider store={Store}>
      <DataProvider>
        <BootProvider value={booted}>
          <Shell>{children}</Shell>
        </BootProvider>
      </DataProvider>
    </Provider>
  );
}
