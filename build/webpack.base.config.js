const path = require('path')
const webpack = require('webpack')

const babelConfig = require('../.babelrc')
const MinaWebpackPlugin = require('mina-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/app.js'
  },
  optimization: {},
  plugins: [
    new MinaWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      pugLoader: {
        locals: {
          basedir: path.resolve(__dirname, '../src') + '/'
        },
        pretty: true,
        debug: false,
        cache: true,
        basedir: path.resolve(__dirname, '../src') + '/'
      }
    })
  ].filter(function (e) { return e }),
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
      'lib'
    ],
    extensions: ['.js', '.json', '.pug', '.styl', '.coffee'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(json)$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[json]',
              context: resolve('src')
            }
          },
          {
            loader: 'raw-loader'
          }
        ]

      },
      {
        enforce: 'pre',
        include: /src/,
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true
        }
      },
      {
        test: /\.js$/,
        include: [/src/, /lib/],
        loader: 'babel-loader',
        options: babelConfig
      },
      {
        test: /\.pug$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].wxml',
              context: resolve('src')
            }
          },
          {
            loader: 'wxml-loader'
          },
          {
            loader: 'pug-html-loader',
            options: {
              locals: {
                basedir: path.resolve(__dirname, '../src')
              },
              data: {
                strings: {}
              },
              pretty: true,
              debug: false,
              cache: true,
              basedir: path.resolve(__dirname, '../src')
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        include: /src/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].wxss',
              context: resolve('src')
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.yaml$/,
        include: /src/,
        loader: 'json-loader!yaml-loader'
      },
      {
        test: /\.(jpe?g|png|svg)(\?.*)?$/,
        include: /src/,
        loader: 'file-loader',
        options: {
          // useRelativePath: true,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(gif)(\?.*)?$/,
        include: /src/,
        loader: 'url-loader',
        options: {
          // useRelativePath: true,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
