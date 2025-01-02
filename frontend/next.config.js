const { i18n } = require("./next-i18next.config");

/**@type {import('next').NextConfig} */

const nextConfig = {
  // output: "export",
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  basePath: "",
  assetPrefix: "",
  images: {
    loader: "default",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "new-bucket-9bbdee12.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: [
    "rc-util",
    "rc-table",
    "rc-tree",
    "rc-pagination",
    "rc-picker",
    "rc-input",
    "@ant-design/icons-svg",
    "i18next",
    "react-i18next",
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    return config;
  },
  experimental: {
    esmExternals: "loose",
  },
  i18n,
};

module.exports = nextConfig;
