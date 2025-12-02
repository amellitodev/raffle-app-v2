import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // ← ESTA LÍNEA ES CRÍTICA
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;