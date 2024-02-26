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
Because by default, Rollup will not mix the **named** and **default** exports together.  
So, Rollup will automatically add `.default` for every **default** export that is mixed with the **named** exports.  

## Requirements
This plugin requires:  
✅ [LTS](https://github.com/nodejs/Release) Node version (v14.0.0+),  
✅ [Rollup](https://www.npmjs.com/package/rollup) (v1.20.0+),  
✅ [ESBuild](https://www.npmjs.com/package/rollup-plugin-esbuild) plugin (v4.10.3+)  

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

module.export = [
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
      esbuild.default({ minify: true }),
      mixexport()
    ],
    onwarn ({ code }) {
      if (code === 'MIXED_EXPORTS') return false // to disable Rollup's 'MIXED_EXPORTS' warning log
    }
  }
]
```

## License
[MIT](https://github.com/mnrendra/read-packag/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
