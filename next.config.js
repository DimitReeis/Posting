// https://github.com/vercel/next.js/discussions/42994
// Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    newNextLinkBehavior: false,
  },
};

module.exports = nextConfig;
