import typescript from '@rollup/plugin-typescript';
// Cannot use @rollup/plugin-terser because of
// https://github.com/rollup/plugins/issues/1366
// import terser from '@rollup/plugin-terser';
import { terser } from 'rollup-plugin-terser';
import { readFileSync } from 'node:fs';
import camelCase from 'camelcase';
import json from '@rollup/plugin-json';
// Required to bundle external modules.
import { nodeResolve } from '@rollup/plugin-node-resolve';

const pkg = JSON.parse(readFileSync('package.json'));

// Human timestamp for banner.
const datetime = new Date().toISOString().substring(0, 19).replace('T', ' ');
const year = datetime.substring(0, 4);

// Remove npm namespace from the package name.
const pkgName = pkg.name.replace(/@.*\//, '');
const name = camelCase(pkgName, { pascalCase: true });

// Main banner.
const banner = `/*! ${name} v${pkg.version} ${datetime}
 *! ${pkg.homepage}
 *! Copyright (C) ${year} ${pkg.author}.
 *! License ${pkg.license}.
 */
`;

// Target ECMAScript version (es2017 is good for all modern browsers in 2022).
const target = 'es2017';

export default [
  {
    input: './src/index.ts',
    output: {
      name,
      file: `./dist/${pkgName}.min.js`,
      format: 'iife',
      banner,
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      json(),
      typescript({
        compilerOptions: {
          target,
        },
      }),
      terser({ output: { comments: /^!/ } }),
    ],
  },
  /* No ES Module bundle.
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'esm',
      banner,
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      json(),
      typescript({
        compilerOptions: {
          target,
        },
      }),
    ],
  },
  */
];
