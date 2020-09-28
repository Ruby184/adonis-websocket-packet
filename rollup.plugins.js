module.exports = [
  require('rollup-plugin-node-resolve')(),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-babel')({
    // exclude: 'node_modules/**',
    plugins: ['external-helpers'],
    presets: [
      [
        'env',
        {
          modules: false
        }
      ]
    ]
  })
]
