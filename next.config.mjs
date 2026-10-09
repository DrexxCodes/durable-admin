/**
 * The original CRA app reads REACT_APP_* variables everywhere. Expose them to the browser
 * bundle as-is so the existing .env keeps working (NEXT_PUBLIC_* also works for new ones).
 */
const publicEnv = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith("REACT_APP_"))
);

/** next/image (the refresh chip) only loads remote pictures from hosts listed here. */
const hostPattern = value => {
  try {
    const { protocol, hostname, port } = new URL(value);
    return { protocol: protocol.replace(":", ""), hostname, ...(port ? { port } : {}) };
  } catch {
    return null;
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: publicEnv,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      hostPattern(process.env.REACT_APP_IMAGE_URL), // app logo
      hostPattern(process.env.REACT_APP_IMAGE_URL_LIGHT),
    ].filter(Boolean),
  },
  async headers() {
    return [
      {
        // always revalidate the service worker so updates reach users quickly
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
        ],
      },
    ];
  },
};
export default nextConfig;
