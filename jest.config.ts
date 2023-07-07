import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { useESM: true }
    ]
  },
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper({
    // @tests
    '@tests': ['<rootDir>/tests'],
    '@tests/*': ['<rootDir>/tests/*']
  })
}

export default config
