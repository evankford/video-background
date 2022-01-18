const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: "production",

  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  // plugins: [new BundleAnalyzerPlugin()],
};
