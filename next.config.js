// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  webpack(config) {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
};

module.exports = nextConfig;
