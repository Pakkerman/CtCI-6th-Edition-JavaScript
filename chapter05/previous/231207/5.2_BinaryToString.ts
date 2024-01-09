// repeatly * 2 and subtract the left side of the decmial point, if within 32 times, there's still doesn't reach 0, that means we cannot represent this real number with 32 bit precision return error
export function multiply(n: number): string {
  const out: string[] = ['.']
  while (n) {
    if (out.length === 32) return 'ERROR'
    n *= 2
    if (n >= 1) {
      n -= 1
      out.push('1')
    } else {
      out.push('0')
    }
  }
  return out.join('')
}

export function fraction(n: number): string {
  const out: string[] = ['.']
  let frac = 1
  while (n) {
    if (out.length === 32) return 'ERROR'
    frac /= 2
    if (n >= frac) {
      n -= frac
      out.push('1')
    } else {
      out.push('0')
    }
  }
  return out.join('')
}
