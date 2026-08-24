import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {}, // Enable Turbopack (Next.js 16 default)
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Allow larger file uploads
    },
  },
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "node:buffer": "commonjs buffer",
        "node:stream": "commonjs stream",
        "node:util": "commonjs util",
        "node:url": "commonjs url",
        "node:fs": "commonjs fs",
        "node:path": "commonjs path",
        "node:child_process": "commonjs child_process",
        "node:os": "commonjs os",
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
