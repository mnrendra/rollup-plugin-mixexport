import type { Options } from './types'

/**
 * Get the skipped status by filtering Rollup `format` and `exports`.
 * @param options The skipped status options
 * @returns The skipped status
 */
const getSkippedStatus = ({
  format,
  exports
}: Options): boolean => {
  // Filtering `options` value.
  if (!(
    // Will proceed if the Rollup config format
    // is set to 'cjs' or 'commonjs'!
    (format === 'cjs' || format === 'commonjs') &&

    // Will proceed if the number of 'exports'
    // in the 'chucked' module is more than one!
    exports.length > 1 &&

    // Will proceed if one of the 'exports'
    // in the 'chucked' module includes the name 'default'!
    exports.includes('default')
  )) {
    // Return `true` (indicating it should be skipped)
    // if the above criteria aren't met!
    return true
  }

  // Retrun `false` (indicating it should proceed)
  // if the above criteria aren't met!
  return false
}

export default getSkippedStatus
