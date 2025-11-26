const HtmlWebpackPlugin = require('html-webpack-plugin')

function createPage(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks
  })
}

const htmlPages = [
  createPage('./src/index.html', './index.html', ['index']),
  createPage('./src/posters/poster1.html', './posters/poster1.html', [
    'poster1'
  ]),
  createPage('./src/posters/poster2.html', './posters/poster2.html', [
    'poster2'
  ]),
  createPage('./src/posters/poster3.html', './posters/poster3.html', [
    'poster3'
  ]),
  createPage('./src/posters/poster4.html', './posters/poster4.html', [
    'poster4'
  ]),
  createPage('./src/posters/poster5.html', './posters/poster5.html', [
    'poster5'
  ]),
  createPage('./src/posters/poster6.html', './posters/poster6.html', [
    'poster6'
  ]),
  createPage('./src/posters/poster7.html', './posters/poster7.html', [
    'poster7'
  ]),
  createPage('./src/posters/poster8.html', './posters/poster8.html', [
    'poster8'
  ]),
  createPage('./src/posters/poster9.html', './posters/poster9.html', [
    'poster9'
  ]),
  createPage('./src/posters/poster10.html', './posters/poster10.html', [
    'poster10'
  ])
]

module.exports = htmlPages
