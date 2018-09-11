const DefinePlugin = require('webpack/lib/DefinePlugin')

const baseConfig = require('./webpack.base.config')

const ret = Object.assign({}, baseConfig)

ret.plugins.push(new DefinePlugin({
  'process.env': {
    'NODE_ENV': '\'production\''
  }
}))
ret.devtool = undefined
ret.optimization.minimize = true
ret.mode = 'production'

module.exports = ret
