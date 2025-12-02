import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desactivar static generation para ciertas rutas
  experimental: {
    // Otras configuraciones si las necesitas
  },
  // Forzar dynamic rendering
  output: 'standalone', // Importante para Docker
};

export default nextConfig;