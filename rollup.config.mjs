import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

export default [
  {
    external: (id) => !/^[./]/.test(id),
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      esbuild({ minify: true })
    ],
    onwarn ({ code }) {
      if (code === 'MIXED_EXPORTS') return false
    }
  },
  {
    external: (id) => !/^[./]/.test(id),
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
      sourcemap: true
    },
    plugins: dts()
  }
]
