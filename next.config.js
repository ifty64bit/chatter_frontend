/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.icons8.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "/a/**",
            },
        ],
    },
};

module.exports = nextConfig;
