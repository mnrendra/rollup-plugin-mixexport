import type { Options } from './types'

import { errorRequireESBuild } from './errors'
import { getPluginNames, getPrecedingPlugin } from './utils'

/**
 * Checking requirements.
 * @param options At least including Rollup `plugins`
 */
const requirementsCheck = ({
  plugins
}: Options): void => {
  // Throw an error if the `plugins` is not an array.
  if (!Array.isArray(plugins)) throw errorRequireESBuild()

  // Get the plugin names.
  const pluginNames = getPluginNames(plugins)

  // Get the preceding plugin.
  const precedingPlugin = getPrecedingPlugin(pluginNames)

  // Throw an error if the `precedingPlugin` is not `esbuild`.
  if (precedingPlugin !== 'esbuild') throw errorRequireESBuild()
}

export default requirementsCheck
