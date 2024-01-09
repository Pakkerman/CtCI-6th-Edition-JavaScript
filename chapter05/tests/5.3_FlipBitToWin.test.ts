import { test, describe, expect } from 'bun:test'
import { flip, flipBit } from '../code/5.3_FlipBitToWin'

describe('Flip', () => {
  test(() => {
    expect(flip(1775)).toBe(8) // 11011101111
    expect(flip(204)).toBe(3) // 0b11001100
    expect(flip(0b10001111)).toBe(5) //
    expect(flip(-1)).toBe(32) // 11111111111111111111111111111111
    expect(flip(4294967295)).toBe(32) //
    expect(flip(2863311530)).toBe(3) // 10101010101010101010101010101010
    expect(flip(0)).toBe(1)
  })
})

describe('Optimized', () => {
  test('input: 1775, result: 8', () => {
    expect(flipBit(1775)).toBe(8) // 11011101111
    expect(flipBit(-1)).toBe(32) // 11111111111111111111111111111111
    expect(flipBit(4294967295)).toBe(32) //
    expect(flipBit(2863311530)).toBe(3) // 10101010101010101010101010101010
    expect(flipBit(0)).toBe(1)
  })
})
