import { readFileSync } from 'node:fs'

const read = (file: string): string => {
  return readFileSync(file, { encoding: 'utf8' })
}

export default read
