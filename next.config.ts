import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,  // 🔥 ESTO ES CLAVE
  },
  typescript: {
    ignoreBuildErrors: true,   // 🔥 ESTO TAMBIÉN
  },
};

export default nextConfig;