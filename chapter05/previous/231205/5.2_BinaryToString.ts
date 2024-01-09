// repeatly * 2 and subtract the left side of the decmial point, if within 32 times, there's still doesn't reach 0, that means we cannot represent this real number with 32 bit precision return error
export function multiply(num: number): string {
  // multiply by 2 until you hit 32 digits or num is 0

  const out: string[] = ['.']
  while (num) {
    if (out.length === 32) return 'ERROR'

    num *= 2
    if (num >= 1) {
      num -= 1
      out.push('1')
    } else {
      out.push('0')
    }
  }

  return out.join('')
}

export function fraction(num: number): string {
  const out: string[] = ['.']
  let frac = 1
  while (num) {
    if (out.length === 32) return 'ERROR'
    frac /= 2
    if (num >= frac) {
      num -= frac
      out.push('1')
    } else {
      out.push('0')
    }
  }

  return out.join('')
}
