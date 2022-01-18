const path = require("path");
const express = require("express");

const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
  name: "dev",
  output: {
    filename: "bundle.js",
    publicPath: "/dev/dist/",
    path: path.resolve(__dirname, "dev/dist"),
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "./tsconfig-dev.json"),
        },
      },
    ],
  },
  devServer: {
    liveReload: true,
    static: "./dev",
    open: true,
    https: true,
    allowedHosts: [
      'youtube-nocookie.com',
      'youtube.com',
    ],
    devMiddleware: {
      index: true,
      // writeToDisk: true,
      publicPath: '/dist'
    },
    hot: true,
    // setupMiddlewares: (middlewares, devServer) => {
    //   devServer.app.use('/dev/', express.static(path.resolve(__dirname, 'src/')));
    //   return middlewares;
    // },
    client: {
      overlay: true,
    },
  },
});