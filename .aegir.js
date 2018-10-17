'use strict'

const path = require('path')

module.exports = {
  karma: {
    // plugins: ['karma-coverage-istanbul-reporter'],
    reporters: ['coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['json', 'html', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      },
    },
    preprocessors:
   { 'node_modules/aegir/src/config/karma-entry.js': [ 'webpack', 'sourcemap' ] },
    webpack: {
      module: {
        rules: [
          // instrument only testing sources with Istanbul
          {
            test: /\.js$/,
            use: { loader: 'istanbul-instrumenter-loader' },
            include: path.resolve('src/')
          }
        ]
      }
    },
    customLaunchers: {
      ChromeDocker: {
        base: 'ChromeHeadless',
        // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
        // more permissions than Docker allows by default)
        flags: ['--no-sandbox']
      }
    },
    client: {
      mocha: {
        bail: true,
      }
    },
    singleRun: true
  },
  
}
