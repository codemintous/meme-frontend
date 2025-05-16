/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['imgen.x.ai'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imgen.x.ai',
                pathname: '/xai-imgen/**',
            },
        ],
    },
}

module.exports = nextConfig 