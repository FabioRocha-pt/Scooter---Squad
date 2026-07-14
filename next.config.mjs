/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.scooter-quad.com' }],
  },
  // Resolver path para @/ no Windows
  experimental: {
    modularizeImports: {
      '@react-three/fiber': {
        skipDefaultValues: true,
      },
    },
  },
};

export default nextConfig;
