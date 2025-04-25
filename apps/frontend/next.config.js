/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure that Next.js can resolve modules from the root of the monorepo
  transpilePackages: []
};

module.exports = nextConfig;