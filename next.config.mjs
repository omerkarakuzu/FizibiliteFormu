/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/FizibiliteFormu",
  assetPrefix: "/FizibiliteFormu/",
};

module.exports = nextConfig;
