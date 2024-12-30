/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
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
    "rc-pagination",
    "rc-picker",
    "@ant-design/icons-svg",
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
};

module.exports = nextConfig;
