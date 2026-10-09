import RouteView from "@/components/RouteView";

// One optional catch-all keeps every original URL (/dashboard, /users/profile/:id,
// /controls/data/:id ...) working exactly as before.
export default function Page() {
  return <RouteView />;
}
