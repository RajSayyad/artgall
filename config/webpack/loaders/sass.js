const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  test: /\.(scss|sass|css)$/i,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "sass-loader",
  ],
}
