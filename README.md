# @mnrendra/rollup-plugin-mixexport

🍣 A [Rollup](https://rollupjs.org/) plugin to mix the **named** and **default** exports together.  
So, the consumers of your bundle will not have to use **chunk**`.default` to access their default export.

## Example:

Your source code might be like this:

```javascript
export const named () => {
  console.log('named')
}

export default () => {
  console.log('default')
}

```

Then, your consumer could consume by like this:

```javascript
import index, { named } from 'your-module-name'
index() // will print: 'default'
named() // will print: 'named'
```

Or, could consume by like this:

```javascript
const index = require('your-module-name')
const { named } = require('your-module-name')
index() // will print: 'default'
named() // will print: 'named'
```
## Why?
By default, Rollup keeps **named** and **default** exports separate, requiring `.default` for default exports. This plugin simplifies the consumer experience by merging them.

## Requirements
This plugin requires:  
✅ [LTS](https://github.com/nodejs/Release) Node version (v14.0.0+),  
✅ [Rollup](https://www.npmjs.com/package/rollup) (v4.22.4+),  
✅ [ESBuild](https://www.npmjs.com/package/rollup-plugin-esbuild) plugin (v6.1.1+)  

## Install
```bash
npm i -D rollup-plugin-esbuild @mnrendra/rollup-plugin-mixexport
```

## Usage

Using `rollup.config.mjs`:
```javascript
import esbuild from 'rollup-plugin-esbuild' // 'rollup-plugin-esbuild' is required
import mixexport from '@mnrendra/rollup-plugin-mixexport'

export default [
  {
    external: (id) => !/^[./]/.test(id),
    input: 'your_input_file.(js|cjs|mjs|jsx|ts|cts|mts|tsx)',
    output: [
      {
        file: 'dist/your_output_file.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/your_output_file.mjs',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      esbuild({ minify: true }), // <-- need to execute `esbuild` immediately before `mixexport`
      mixexport() // <-- execute `mixexport` immediately after `esbuild`
    ],
    onwarn ({ code }) {
      if (code === 'MIXED_EXPORTS') return false // to disable Rollup's 'MIXED_EXPORTS' warning log
    }
  }
]
```

Using `rollup.config.js`:
```javascript
const esbuild = require('rollup-plugin-esbuild') // 'rollup-plugin-esbuild' is required
const mixexport = require('@mnrendra/rollup-plugin-mixexport')

module.exports = [
  {
    external: (id) => !/^[./]/.test(id),
    input: 'your_input_file.(js|cjs|mjs|jsx|ts|cts|mts|tsx)',
    output: [
      {
        file: 'dist/your_output_file.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/your_output_file.mjs',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      esbuild({ minify: true }),
      mixexport()
    ],
    onwarn ({ code }) {
      if (code === 'MIXED_EXPORTS') return false // to disable Rollup's 'MIXED_EXPORTS' warning log
    }
  }
]
```

## Options
```javascript
const mixexport = require('@mnrendra/rollup-plugin-mixexport')

module.exports = [
  {
    plugins: [
      mixexport({
        /**
         * Exclude `module.exports.default`
         *
         * Set to `true` to exclude `module.exports.default`
         *
         * @default false
         */
        excludeDefault: true
      })
    ]
  }
]
```
### • `excludeDefault`
#### type: `boolean`
#### default: `false`
Exclude `module.exports.default`.<br/>
Set to `true` to exclude `module.exports.default`.<br/>

By default, `mixexport` generates output as follows:
```javascript
module.exports = main;
module.exports.main = main;
module.exports.default = main;
```
However, if the `excludeDefault` option is set to `true`, `mixexport` generates output as follows:
```javascript
module.exports = main;
module.exports.main = main;
```

## License
[MIT](https://github.com/mnrendra/rollup-plugin-mixexport/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
