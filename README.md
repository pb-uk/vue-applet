# vue-applet

Vue applets for a website

## Development

### Getting started

```console
$ npm init -y
$ # Typescript.
$ npm i -D typescript
```

```js
// tsconfig.json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Language and Environment */
    "target": "esnext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,

    /* Modules */
    "module": "esnext" /* Specify what module code is generated. */,
    "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
    "resolveJsonModule": true /* Enable importing .json files */,
    "allowSyntheticDefaultImports": true,

    /* Interop Constraints */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,

    /* Completeness */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

###  Build
Cannot use `@rollup/plugin-terser` because of
https://github.com/rollup/plugins/issues/1366
so we must use the deprecated `rollup-plugin-terser` which in turn forces rollup
to be v.2.

```console
$ npm i -D rimraf, camelcase, rollup, rollup-plugin-terser
$ npm i -D @rollup/plugin-json, @rollup/plugin-typescript
$ # As we are bundling imports we also need
$ npm i -D @rollup/plugin-node-resolve
```

```js
// package.json
{
  "scripts": {
    "build": "npm run clean && rollup -c",
    "clean": "rimraf dist",
  },
}
```

### Testing with mocha and chai

```console
$ npm i -D mocha, chai, @types/mocha, @types/chai, ts-node
```

```js
// .mocharc.cjs
module.exports = {
  'node-option': [
    'experimental-specifier-resolution=node',
    'loader=ts-node/esm',
  ],
};
```

```js
// package.json
{
  "scripts": {
    // "test:unit": "mocha src/**/*.spec.ts"
    "test:unit": "mocha test/unit/**/*.spec.ts"
  },
}
```
### Code coverage
```console
$ npm i -D c8
$ # @istanbuljs/nyc-config-typescript
```js
// package.json
{
  "scripts": {
    "coverage": "rimraf coverage && c8 -r html -r text npm run test:unit",
  },
}
```


### Linting and prettifying

```console
$ npm i -D prettier, eslint, eslint-plugin-mocha, @typescript-eslint/eslint-plugin, @typescript-eslint/parser
```

```ini
# .eslintignore and .prettierignore
dist
.nyc_output
coverage
```

```js
// .prettierrc.cjs
module.exports = {
  singleQuote: true,
};
```

```js
// .eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:mocha/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
```

```js
// package.json
{
  "scripts": {
    "lint": "eslint . && prettier . --check",
    "lint:fix": "eslint . --fix && prettier . --write",
  },
}
```

### Review

$ #
$ # Bundling with rollup.
$ #
$
$ # If there are any DOM tests...
$ npm i -D jsdom, @types/jsdom
$ #

```

