const { generateWebpackConfig } = require('shakapacker')

const webpackConfig = generateWebpackConfig()

// Add SCSS loader
webpackConfig.module.rules.push({
  test: /\.scss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
})

module.exports = webpackConfig