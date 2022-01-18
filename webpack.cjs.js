const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  name: "cjs",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/cjs"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules|demo/,
        options: {
          configFile: path.resolve(__dirname, "./tsconfig-cjs.json"),
        },
      },
    ],
  },
});
