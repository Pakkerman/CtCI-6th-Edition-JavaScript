import { test, describe, expect } from 'bun:test'
import { multiply, fraction } from '../code/5.2_BinaryToString'

describe('Using multiplication', () => {
  test('', () => {
    expect(multiply(0.5)).toBe('.1')
    expect(multiply(0.0625)).toBe('.0001')
    expect(multiply(0.72)).toBe('ERROR')
    expect(multiply(0.893)).toBe('ERROR')
  })
})

describe('Using fraction', () => {
  test('', () => {
    expect(fraction(0.5)).toBe('.1')
    expect(fraction(0.0625)).toBe('.0001')
    expect(fraction(0.72)).toBe('ERROR')
    expect(fraction(0.893)).toBe('ERROR')
  })
})
