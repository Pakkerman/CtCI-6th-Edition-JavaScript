import { describe, test, expect } from 'bun:test'
import { brute, getNext, getPrevious } from '../code/5.4_NextNumber'

describe('brute', () => {
  test(() => {
    expect(brute(9)).toBe(10) // 0b1001 =>  0b1010
    expect(brute(204)).toBe(209) //  0b11001100 =>  0b11010001
    expect(brute(170)).toBe(172) //  0b10101010 =>  0b10101100
    expect(brute(13948)).toBe(13967) //  0b11011001111100 =>  0b11011010001111
  })
})

describe('getNext()', () => {
  test('', () => {
    expect(getNext(204)).toBe(209) //  0b11001100 =>  0b11010001
    expect(getNext(9)).toBe(10) // 0b1001 =>  0b1010
    expect(getNext(170)).toBe(172) //  0b10101010 =>  0b10101100
    expect(getNext(13948)).toBe(13967) //  0b11011001111100 =>  0b11011010001111
  })
})

describe('getPrevious()', () => {
  test(() => {
    expect(getPrevious(~0)).toBe(-1) // 0b....1111111...
    expect(getPrevious(10115)).toBe(10096) //  0b10011110000011 =>  0b10011101110000
    expect(getPrevious(0)).toBe(-1)
  })
})
