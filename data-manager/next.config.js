/** @type {import('next').NextConfig} */
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
