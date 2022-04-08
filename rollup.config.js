import { terser } from "rollup-plugin-terser";

const pkg = require('./package.json')
const banner = `/*! Easmark - v${pkg.version} | Copyright 2022 - Haikel Fazzani */\n`;

export default {
  input: 'src/easmark.js',
  output: [
    {
      name: 'easmark',
      format: 'umd',
      file: 'build/index.umd.js',
      sourcemap: false,
      banner
    },
    {
      file: 'build/index.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    terser()
  ]
};
