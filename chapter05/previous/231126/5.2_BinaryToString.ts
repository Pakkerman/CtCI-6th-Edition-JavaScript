// repeatly * 2 and subtract the left side of the decmial point, if within 32 times, there's still doesn't reach 0, that means we cannot represent this real number with 32 bit precision return error
export function printBinary(num: number): string {
  if (num <= 0 || 1 <= num) return 'ERROR'

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

export function printBinary2(num: number): string {
  if (num <= 0 || 1 <= num) return 'ERROR'
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
