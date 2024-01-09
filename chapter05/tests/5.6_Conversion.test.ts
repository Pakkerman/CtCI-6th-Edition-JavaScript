import { expect, describe, test } from 'bun:test'
import { conversion } from '../code/5.6_Conversion'

describe('brute', () => {
  test(() => {
    expect(conversion(29, 15)).toBe(2)
    expect(conversion(0, 15)).toBe(4)
    expect(conversion(15, 0b1010)).toBe(2)
    expect(conversion(0b111111111111111111111111111111111111, 0)).toBe(32)
  })
})

// describe('solution', () => {
//   test(() => {
//     expect(solution(29, 15)).toBe(2)
//     expect(solution(0, 15)).toBe(4)
//     expect(solution(15, 0b1010)).toBe(2)
//     expect(solution(0b111111111111111111111111111111111111, 0)).toBe(32)
//   })
// })
