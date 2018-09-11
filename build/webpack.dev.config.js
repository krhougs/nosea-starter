const DefinePlugin = require('webpack/lib/DefinePlugin')

const baseConfig = require('./webpack.base.config')

const ret = Object.assign({}, baseConfig)

ret.plugins.push(new DefinePlugin({
  'process.env': {
    'NODE_ENV': '\'development\''
  }
}))
ret.devtool = undefined
ret.optimization.minimize = false
ret.mode = 'none'

module.exports = ret
