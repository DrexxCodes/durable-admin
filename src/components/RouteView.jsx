"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/components/ui/PageLoader";

const PageRouter = dynamic(() => import("@/components/PageRouter"), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function RouteView() {
  return <PageRouter />;
}
