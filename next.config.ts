const nextConfig: NextConfig = {
  output: 'export',  // Cambiar de 'standalone' a 'export'
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};