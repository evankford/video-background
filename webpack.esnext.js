const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.base');
// const BundleAnalyzerPlugin =  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
  name: "mjs",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/mjs"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules|demo/,
        options: {
          configFile: path.resolve(__dirname, "./tsconfig-esnext.json"),
        },
      },
    ],
  },
  // plugins: [new BundleAnalyzerPlugin()],
});