var plugins = [
  ["@babel/plugin-transform-runtime", {
    "helpers": false,
    "regenerator": true
  }],
  ["@babel/plugin-transform-regenerator"],
  ["@babel/plugin-transform-destructuring"],
  ["@babel/plugin-proposal-object-rest-spread"],
  ["@babel/plugin-proposal-class-properties"]
]
if (process.env.NO_CONSOLE === 'true') {
  plugins.push([
    "transform-remove-console", {
      "exclude": ["error"]
    }])
}

module.exports = {
  "plugins": plugins,
  "compact": true,
}
