/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.hashnode.com",
      },
    ],
  },
};

export default nextConfig;
