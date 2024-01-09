import { expect, describe, test } from 'bun:test'
import { checkPow2, checkPow2Bit } from '../code/5.5_Debugger'

// Not much to test for this one, so we are just compare the speed
const limit = 100000000 // 100 million

describe('checkPow2()', () => {
  test(() => {
    console.log(checkPow2(limit))
  })
})

describe('checkPow2Bit()', () => {
  test(() => {
    console.log(checkPow2Bit(limit))
  })
})
