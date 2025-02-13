import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ['@chakra-ui/react'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'supermetrics.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
