/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                // ... additional options if needed ...
            },
        ],
    },
}

module.exports = nextConfig
