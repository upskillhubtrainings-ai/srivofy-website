import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes a plain HTML/CSS/JS site to `out/`.
 * That folder can be served by any Hostinger plan (no Node.js server needed).
 */
const nextConfig: NextConfig = {
  output: "export",
  // /about -> out/about/index.html, so Apache serves nested routes on refresh.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
