const commonjs = require("rollup-plugin-commonjs");
const json = require("rollup-plugin-json");
const nodeResolve = require("rollup-plugin-node-resolve");

const pkg = require("./package.json");

module.exports = [
  // UMD (for lambda) build.
  {
    input: './lib/index.js',
    output: {name: 'gb-btm-skill', file: pkg.main, format: 'umd', sourcemap: true},
    onwarn: () => {},
    external: [
      'aws-sdk'
    ],
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs({
        namedExports: {
          '../../../../../libraries/handlers/dist/index.umd.js': [
            'AboutRequestHandler',
            'AttractionRequestHandler',
            'BreakfastRestaurantRequestHandler',
            'ConsoleErrorHandler',
            'DinnerRestaurantRequestHandler',
            'FallbackRequestHandler',
            'HelpRequestHandler',
            'LaunchRequestHandler',
            'LunchRestaurantRequestHandler',
            'SessionEndedRequestHandler',
            'StopRequestHandler'
          ],
          '../../../../../libraries/repositories/dist/index.umd.js': [
            'S3AttractionRepository',
            'S3RestaurantRepository'
          ],
          '../../../../../libraries/services/dist/index.umd.js': [
            'AttractionService',
            'RestaurantService'
          ]
        }
      }),
      json()
    ]
  }
];
