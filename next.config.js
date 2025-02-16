/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals = [...config.externals, 'punycode'];  // Handle punycode deprecation warning
    return config;
  },
};

module.exports = nextConfig;
