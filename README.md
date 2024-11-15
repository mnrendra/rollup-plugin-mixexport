# @mnrendra/rollup-plugin-mixexport
🍣 A [Rollup](https://rollupjs.org/) plugin to mix **CommonJS** exports. So, the consumers of your bundle will not have to use **chunk** `.default` to access their default export.

## Example:
Your source code might be like this:
```javascript
export let amount = 0

export const increaseAmount = () => {
  amount = amount + 1
}

export const named = () => {
  console.log('named')
}

export default () => {
  console.log('default')
}
```
Then, consumers could import it like this (use `ES Modules`):
```javascript
import index, { named, increaseAmount } from 'your-module-name'
index() // will print: 'default'
named() // will print: 'named'
index.default() // will print: 'default'
console.log(index.amount) // will print: 0
increaseAmount()
console.log(index.amount) // will print: 1
```
Or, they could require it like this (use `CommonJS`):
```javascript
const index = require('your-module-name')
const { named, increaseAmount } = require('your-module-name')
index() // will print: 'default'
named() // will print: 'named'
index.default() // will print: 'default'
console.log(index.amount) // will print: 0
increaseAmount()
console.log(index.amount) // will print: 1
```
## Why?
By default, [Rollup](https://rollupjs.org/) keeps **named** and **default** exports separate, requiring consumers to use `.default` to access default exports. This plugin simplifies the consumer experience by merging them.

## Install
```bash
npm i -D rollup-plugin-esbuild @mnrendra/rollup-plugin-alias @mnrendra/rollup-plugin-mixexport
```

## Usage
For **ES modules** (`rollup.config.mjs`):
```javascript
import esbuild from 'rollup-plugin-esbuild' // 'rollup-plugin-esbuild' is required
import alias from '@mnrendra/rollup-plugin-mixexport' // (Optional) to resolve alias paths
import mixexport from '@mnrendra/rollup-plugin-mixexport'

export default {
  external: (id) => !/^[./]/.test(id),
  input: 'your_input_file.(js|cjs|mjs|jsx|ts|cts|mts|tsx)',
  output: {
    file: 'dist/your_output_file.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    esbuild(), // <-- Require `esbuild` to be executed immediately before `mixexport` or `alias`
    alias(), // <-- Optional to resolve alias paths
    mixexport({ minify: true }) // <-- Execute `mixexport` immediately after `esbuild` or `alias`
  ],
  onwarn ({ code }) {
    if (code === 'MIXED_EXPORTS') return false // To disable Rollup's 'MIXED_EXPORTS' warning log
  }
}
```
For **CommonJS** (`rollup.config.js`):
```javascript
const esbuild = require('rollup-plugin-esbuild') // 'rollup-plugin-esbuild' is required
const alias = require('@mnrendra/rollup-plugin-mixexport') // (Optional) to resolve alias paths
const mixexport = require('@mnrendra/rollup-plugin-mixexport')

module.exports = {
  external: (id) => !/^[./]/.test(id),
  input: 'your_input_file.(js|cjs|mjs|jsx|ts|cts|mts|tsx)',
  output: {
    file: 'dist/your_output_file.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    esbuild(), // <-- Require `esbuild` to be executed immediately before `mixexport` or `alias`
    alias(), // <-- Optional to resolve alias paths
    mixexport({ minify: true }) // <-- Execute `mixexport` immediately after `esbuild` or `alias`
  ],
  onwarn ({ code }) {
    if (code === 'MIXED_EXPORTS') return false // To disable Rollup's 'MIXED_EXPORTS' warning log
  }
}
```

## Options
```javascript
const mixexport = require('@mnrendra/rollup-plugin-mixexport')

module.exports = {
  plugins: [
    mixexport({
      minify: true, // To produce the minified or pretty format.
      defineEsModule: true // To specify whether to define `exports.__esModule`.
    })
  ]
}
```

### • `minify`
*type: `boolean`*<br/>
*default: `false`*<br/>
To produce the minified or pretty format.

### • `defineEsModule`
*type: `boolean|undefined`*<br/>
*default: `undefined`*<br/>
To specify whether to define `exports.__esModule`.

## Types
```typescript
import type {
  Options,
  Plugin
} from '@mnrendra/rollup-plugin-mixexport'
```

## License
[MIT](https://github.com/mnrendra/rollup-plugin-mixexport/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
