import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Neue Proxy Configuration für Admin-Schutz
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/api/auth/check?path=/admin/:path*',
      },
    ];
  },
};

export default nextConfig;
