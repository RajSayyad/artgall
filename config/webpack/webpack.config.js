const { generateWebpackConfig } = require('shakapacker')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const sassLoader = require('./loaders/sass')

const webpackConfig = generateWebpackConfig()

// Add the Sass loader
webpackConfig.module.rules.push(sassLoader)

// Ensure the plugin is added (if not already)
webpackConfig.plugins.push(new MiniCssExtractPlugin())

module.exports = webpackConfig
