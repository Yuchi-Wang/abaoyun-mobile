'use strict'
const path = require('path')
const zlib = require("zlib")
const resolve = dir => path.join(__dirname, dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const timeStamp = new Date().getTime()

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: !isProduction,
  productionSourceMap: false,
  devServer: {
    open: false,
    port: 8004,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_REQUEST_URL,
        changeOrigin: true,
        ws: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
    config.optimization.splitChunks({
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 300000,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `chunk.${packageName.replace('@', '')}`
          },
          priority: 10
        }
      }
    })
  },
  configureWebpack: config => {
    if (isProduction) {
      const plugins = []
      plugins.push(
        new CompressionWebpackPlugin({
          filename: `[path]${timeStamp}.gz[query]`,
          algorithm: 'brotliCompress',
          test: /\.(js|css|json)(\?.*)?$/i,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11  // Brotli打包，优于gip打包算法
            },
          },
          threshold: 10240,
          minRatio: 0.8
        }),
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: true // 去掉注释
            },
            warnings: true,
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']  // 移除console
            }
          },
          cache: true, // 启用文件缓存
          parallel: true // 使用多进程并行运行来提高构建速度
        })
      )
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
  }
}

