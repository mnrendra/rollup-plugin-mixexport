import type { NormalizedInputOptions } from 'rollup'

import { requirementsCheck } from './utils'

/**
 * Rollup build hooks.
 * @param InputOptions Rollup's `NormalizedInputOptions`
 */
function buildStart ({
  plugins
}: NormalizedInputOptions): void {
  // Check if the requirements are met.
  requirementsCheck({ plugins })
}

export default buildStart
