/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[{hostname: "utfs.io"}],
        domains: ["images.pexels.com","miro.medium.com", "www.cnet.com"],
    },
};

export default nextConfig;
