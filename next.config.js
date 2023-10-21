// /** @type {import('next').NextConfig} */
// const webpack = require("webpack");
// const { parsed: myEnv } = require("dotenv").config();

// const nextConfig = {
//   webpack(config) {
//     if (!myEnv) {
//       config.plugins.push(
//         new webpack.EnvironmentPlugin(
//           new Dotenv({
//             path: "./.env", // Path to .env file (this is the default)
//             safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
//           })
//         )
//       );
//       return config;
//     }

//     config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
//     return config;
//   },
// };

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
