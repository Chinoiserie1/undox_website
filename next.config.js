/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const { parsed: myEnv } = require("dotenv").config();
const Dotenv = require("dotenv-webpack");

const nextConfig = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
  env: {
    PROJECT_ID: process.env.PROJECT_ID || "default_value",
  },
};

module.exports = nextConfig;
