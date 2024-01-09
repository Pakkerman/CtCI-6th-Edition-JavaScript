import { test, describe, expect } from 'bun:test'
import { insertionSolution } from '../code/5.1_Insertion'

describe('insertion Solution', () => {
  test('testing', () => {
    const result = insertionSolution(0b10000000000, 0b10011, 2, 6)
    console.log(formatToString(result))
    expect(result).toBe(0b10001001100)
  })

  test('testing', () => {
    const result = insertionSolution(0b10101010101010101, 0b01111, 4, 9)
    console.log(result.toString(2))
    expect(result).toBe(0b10101010011110101) //
  })
})

function formatToString(input: number): string {
  return input.toString(2)
}
