import type { Store as Storage } from '@mnrendra/rollup-utils'
import type { Options } from '../types'

interface Store extends Storage, Options {}

const store: Store = {
  pluginName: '',
  name: '',
  version: '',
  homepage: '',
  excludeDefault: false
}

export default store
