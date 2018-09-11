process.env.NODE_ENV = 'production'

var ora = require('ora')
var chalk = require('chalk')
var Program = require('commander')
var webpack = require('webpack')
var webpackConfig = require('./webpack.base.conf')

Program
  .version('1.0.0')
  .option('-w, --watch')
  .option('-b, --build')
  .option('-p, --publish')
  .parse(process.argv)

emit(!!Program.watch)

function emit(watch) {
  var spinner = ora(`building for ${watch ? 'development' : 'production'}...`)
  spinner.start()
  Promise.all([
    webpackConfig(watch ? "'development'" : "'production'", {
      sourceMap: !Program.publish,
      uglify: Program.publish
    })
  ]).then(function (res) {
    construct(res[0], true).then(function async (res) {
      if (!res.watch) {
        spinner.stop()
        setTimeout(() => { process.exit() }, 1000)
      }
    })
  }).catch(function (err) {
    err instanceof Array ? console.log(chalk.red(err.join('\n'))) : console.log(chalk.red(err))
    process.exit()
  })
}

function construct(cfg, watch) {
  return new Promise(function (resolve, reject) {
    if (watch) {
      webpack(cfg).watch({
        aggregateTimeout: 300,
        poll: true
      }, errHandler)
    } else {
      webpack(cfg, errHandler)
    }

    function errHandler(err, stats) {
      if (err) {
        console.log(chalk.red('\n' + err + '\n'))
        reject(err)
      }
      if (!watch) {
        resolve({
          watch: watch,
          err: err,
          stats: stats
        })
      } else console.log('\n' + stats + '\n')
    }
  })
}
