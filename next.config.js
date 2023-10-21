// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new Dotenv({
        path: "./.env",
        systemvars: true, // Load system environment variables as well
      })
    );
    return config;
  },
};

module.exports = nextConfig;
