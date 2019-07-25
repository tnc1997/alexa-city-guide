const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");

const pkg = require("./package.json");

module.exports = [
  // CommonJS (for node) build and ES (for bundlers) build.
  {
    input: './lib/index.js',
    output: [
      {file: pkg.main, format: 'cjs', sourcemap: true},
      {file: pkg.module, format: 'es', sourcemap: true}
    ],
    onwarn: () => {},
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ]
  },
  // UMD (for browsers) build.
  {
    input: './lib/index.js',
    output: {name: 'specifications', file: pkg.browser, format: 'umd', sourcemap: true},
    onwarn: () => {},
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs({
        include: [
          /node_modules/
        ],
        namedExports: {
          '../../common/temp/node_modules/.registry.npmjs.org/@ts-utils/array/2.0.1/node_modules/@ts-utils/array/dist/index.umd.js': [
            'contains'
          ]
        }
      })
    ]
  }
];
