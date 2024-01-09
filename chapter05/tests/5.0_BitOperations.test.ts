import { test, describe, expect } from 'bun:test'
import {
  checkBit,
  setBit,
  clearBit,
  clearBitsMSBToIth,
  clearBitsIthTo0,
} from '../code/5.0_BitOperations'

describe('Bit operations', () => {
  test('checkBit()', () => {
    expect(checkBit(0b1000, 0)).toBe(false)
    expect(checkBit(0b1010, 1)).toBe(true)
    expect(checkBit(0b1111, 4)).toBe(false)
  })

  test('setBit()', () => {
    expect(setBit(0b1000, 0)).toBe(0b1001)
    expect(setBit(0b1010, 1)).toBe(0b1010)
    expect(setBit(0b1111, 4)).toBe(0b11111)
  })

  test('clearBit()', () => {
    expect(clearBit(0b1000, 0)).toBe(0b1000)
    expect(clearBit(0b1010, 1)).toBe(0b1000)
    expect(clearBit(0b1111, 4)).toBe(0b1111)
  })

  test('clearBitsMSBToIth()', () => {
    expect(clearBitsMSBToIth(0b00001110, 0)).toBe(0b0)
    expect(clearBitsMSBToIth(0b00110011, 1)).toBe(0b0001)
    expect(clearBitsMSBToIth(0b010111111, 4)).toBe(0b1111)
  })
  test('clearBitsIthTo0()', () => {
    expect(clearBitsIthTo0(0b00001110, 7)).toBe(0b00000000)
    expect(clearBitsIthTo0(0b00110011, 3)).toBe(0b00110000)
    expect(clearBitsIthTo0(0b11000111, 1)).toBe(0b11000100)
  })
})

function printBinaryAndPadStart(num: number) {
  console.log(num.toString(2).padStart(16, '0'))
}

// To show signed string of binary string
function signedIntToBinaryString(value: number, bits: number): string {
  // Convert to unsigned binary string
  let unsignedBinary = Math.abs(value).toString(2)

  // Pad to the specified number of bits
  let paddedBinary = unsignedBinary.padStart(bits, '0')

  // If the original value was negative, invert and add 1 to get two's complement
  if (value < 0) {
    let invertedBinary = paddedBinary
      .split('')
      .map((bit) => (bit === '0' ? '1' : '0'))
      .join('')
    let twoComplementBinary = (parseInt(invertedBinary, 2) + 1).toString(2)
    return twoComplementBinary.padStart(bits, '1') // Pad with '1' for negative numbers
  }

  return paddedBinary
}
