import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/legacy.css";
import "@/styles/theme.css";
import "@/styles/tw.css";
import "@/styles/admin.css";
import AppEntry from "@/components/AppEntry";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const name = process.env.REACT_APP_NAME || "App";

export const metadata = {
  title: `${name}: Super Admin`,
  description: `${name} Superadmin`,
  applicationName: name,
  robots: { index: false, follow: false }, // back-office: keep out of search results
  // /manifest.webmanifest is linked automatically from src/app/manifest.js
  appleWebApp: { capable: true, title: `${name} Admin`, statusBarStyle: "default" },
  formatDetection: { telephone: false },
  icons: {
    icon: process.env.REACT_APP_IMAGE_URL || "/icons/favicon-48.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3c0b5b",
};

/** AppEntry is the persistent shell (providers, sidebar / bottom nav, top bar); only `children` swaps. */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppEntry>{children}</AppEntry>
      </body>
    </html>
  );
}
