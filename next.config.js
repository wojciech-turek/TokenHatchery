/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neonrain.io",
        port: "",
        pathname: "/static/media/*",
      },
    ],
  },
};

module.exports = nextConfig;
