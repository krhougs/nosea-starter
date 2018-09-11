
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    "arrow-parens": 0,
    "generator-star-spacing": 0,
    "space-before-function-paren": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  "globals": {
    "wxp": true,
    "wx": true,
    "getApp": true,
    "getCurrentPages": true,
    "App": true,
    "Page": true
  }
}
