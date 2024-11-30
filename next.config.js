/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                // ... additional options if needed ...
            },
            {
                protocol: 'https',
                hostname: 'fakeimg.pl',
                // ... additional options if needed ...
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                // ... additional options if needed ...
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                // ... additional options if needed ...
            },
        ],
    },
}

module.exports = nextConfig
