/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
 },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
