import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://remindify-backend:8080/api/:path*'
          : 'http://remindify-backend:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
