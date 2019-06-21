const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'styles': resolve('src/assets/styles'),
        'images': resolve('src/assets/images')
      }
    }
  }
}
