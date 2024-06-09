/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    secretKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
 },
};

export default nextConfig;
