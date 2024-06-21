/**
 * Stateful store to save the expensive values.
 */
const store = {
  // plugin name
  pluginName: '',

  // name
  name: '',
  setName: (name: string) => {
    store.name = name
    store.pluginName = name.replace('@mnrendra/rollup-plugin-', '')
  },

  // version
  version: '',
  setVersion: (version: string) => {
    store.version = version
  },

  // homepage
  homepage: '',
  setHomepage: (homepage: string) => {
    store.homepage = homepage
  }
}

// Export the `store` as the default value.
export default store
