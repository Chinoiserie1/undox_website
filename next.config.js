/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const { parsed: myEnv } = require("dotenv").config();

const nextConfig = {
  webpack(config) {
    if (!myEnv) {
      // throw new Error("Failed to load environment variables from .env file");
      config.plugins.push(new webpack.EnvironmentPlugin("undefined"));
      return config;
    }

    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};

module.exports = nextConfig;
