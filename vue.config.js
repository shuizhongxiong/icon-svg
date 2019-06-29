const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  configureWebpack: {
    resolve: {
      alias: {
        'styles': resolve('src/assets/styles'),
        'images': resolve('src/assets/images')
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/icon-svg/dist/'
    : '/',
  productionSourceMap: false
}
