import { describe, test, expect } from 'bun:test'
import { solution } from '@code/5.7_PairwiseSwap'

describe('solution', () => {
  test(() => {
    expect(solution(0b111100110)).toBe(0b1011011001) // 111100110 >> 1011011001
    expect(solution(0b0001)).toBe(0b0010) // 0001 >> 0010
    expect(solution(0b1001)).toBe(0b0110) // 1001 >> 0110
  })
})
