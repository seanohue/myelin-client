const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

let plugins = []

if (process.env.NODE_ENV === 'production') {
  const compressionTest = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
  plugins = [
    new CompressionPlugin({
      algorithm (input, compressionOptions, callback) {
        console.log('Compressing using ', compressionOptions)
        return zopfli.gzip(input, compressionOptions, callback)
      },
      compressionOptions: {
        numiterations: 15
      },
      minRatio: 0.99,
      test: compressionTest
    }),

    new BrotliPlugin({
      test: compressionTest,
      minRatio: 0.99
    })
  ]
}

module.exports = {
  configureWebpack: {
    plugins
  }
}
