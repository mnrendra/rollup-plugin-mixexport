import type { NormalizedOutputOptions } from 'rollup'

const outputOptions: NormalizedOutputOptions = {
  amd: {
    autoId: false,
    define: '',
    forceJsExtensionForImports: false
  },
  assetFileNames: '',
  banner: () => '',
  chunkFileNames: '',
  compact: false,
  dir: undefined,
  // dynamicImportFunction: undefined,
  dynamicImportInCjs: false,
  entryFileNames: '',
  esModule: false,
  // experimentalDeepDynamicChunkOptimization: false,
  experimentalMinChunkSize: 0,
  exports: 'none',
  extend: false,
  externalImportAssertions: false,
  externalImportAttributes: true,
  externalLiveBindings: false,
  file: undefined,
  footer: () => '',
  format: 'cjs',
  freeze: false,
  generatedCode: {
    arrowFunctions: false,
    constBindings: false,
    objectShorthand: false,
    reservedNamesAsProps: false,
    symbols: false
  },
  globals: {},
  hashCharacters: 'base64',
  hoistTransitiveImports: false,
  importAttributesKey: 'assert',
  indent: '',
  inlineDynamicImports: false,
  interop: () => 'auto',
  intro: () => '',
  manualChunks: {},
  minifyInternalExports: false,
  name: undefined,
  // namespaceToStringTag: false,
  noConflict: false,
  outro: () => '',
  paths: {},
  plugins: [],
  // preferConst: false,
  preserveModules: false,
  preserveModulesRoot: undefined,
  reexportProtoFromExternal: true,
  sanitizeFileName: () => '',
  sourcemap: false,
  sourcemapBaseUrl: undefined,
  sourcemapExcludeSources: false,
  sourcemapFile: undefined,
  sourcemapFileNames: '',
  sourcemapIgnoreList: () => false,
  sourcemapPathTransform: undefined,
  strict: false,
  systemNullSetters: false,
  validate: false
}

export default outputOptions
