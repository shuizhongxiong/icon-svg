exports.install = function (Vue, options) {
  Vue.prototype.deepClone = function (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}
