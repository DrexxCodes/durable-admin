const name = process.env.REACT_APP_NAME || "App";
const adminName = `${name} Admin`;

export default function manifest() {
  return {
    id: "/",
    name: adminName,
    // home-screen labels truncate around 12 characters
    short_name: name.length > 8 ? `${name.split(" ")[0]} Admin` : adminName,
    description: `${adminName}: manage users, transactions, wallets, products and settings.`,
    // launching the installed app lands on the dashboard; signed-out users are sent to /login by the router
    start_url: "/dashboard?source=pwa",
    scope: "/",
    // relaunching while the app is already open just resumes that window
    launch_handler: { client_mode: ["focus-existing", "auto"] },
    display: "standalone",
    background_color: "#f8f5fc",
    theme_color: "#3c0b5b",
    lang: "en",
    categories: ["business", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Users", url: "/users", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Transactions", url: "/transactions", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Wallet", url: "/wallets", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
