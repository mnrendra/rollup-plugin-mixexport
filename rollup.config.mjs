import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import mixexport from '@mnrendra/rollup-plugin-mixexport'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        // dir: 'dist/cjs',
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
        // preserveModules: true
      },
      {
        // dir: 'dist/es',
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true
        // preserveModules: true
      }
    ],
    plugins: [
      // {
      //   name: 'alias',
      //   transform (code, id) {
      //     console.log(`---------- ${id} ----------:\n`, code)
      //   }
      // },
      esbuild({ minify: true }),
      // esbuild(),
      mixexport()
    ],
    onwarn (warning, warn) {
      if (warning.code === 'MIXED_EXPORTS') return false
    }
  },
  {
    input: 'src/index.ts',
    output: {
      // dir: 'dist/dts',
      file: 'dist/index.d.ts',
      format: 'es',
      sourcemap: true
      // preserveModules: true
    },
    plugins: dts()
  }
]
