import type { NormalizedInputOptions } from 'rollup'

const inputOptions: NormalizedInputOptions = {
  plugins: [],
  acorn: {},
  acornInjectPlugins: [],
  cache: false,
  context: '',
  experimentalCacheExpiry: 0,
  experimentalLogSideEffects: false,
  external: () => false,
  inlineDynamicImports: undefined,
  input: [''],
  logLevel: 'info',
  makeAbsoluteExternalsRelative: false,
  manualChunks: undefined,
  maxParallelFileOps: 0,
  maxParallelFileReads: 0,
  moduleContext: () => '',
  onLog: () => {},
  onwarn: () => {},
  perf: false,
  preserveEntrySignatures: false,
  preserveModules: false,
  preserveSymlinks: false,
  shimMissingExports: false,
  strictDeprecations: false,
  treeshake: false
}

export default inputOptions
