import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/easmark.js',
  output: [
    {
      name: 'Hixo',
      file: 'build/index.js',
      format: 'umd'
    },
    {
      file: 'build/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    //terser()
  ]
};
