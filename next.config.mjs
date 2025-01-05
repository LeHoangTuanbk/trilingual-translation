/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
