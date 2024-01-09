// repeatly * 2 and subtract the left side of the decmial point, if within 32 times, there's still doesn't reach 0, that means we cannot represent this real number with 32 bit precision return error
export function multiply(n: number): string {
  const out: string[] = ['.']

  for (let i = 0; n != 0 && i < 32; i++) {
    n *= 2
    if (n >= 1) {
      out.push('1')
      n -= 1
    } else {
      out.push('0')
    }
  }

  return n === 0 ? out.join('') : 'ERROR'
}

export function fraction(n: number): string {
  const out: string[] = ['.']

  for (let frac = 0.5; n !== 0; frac /= 2) {
    if (out.length === 32) return 'ERROR'
    if (n >= frac) {
      n -= frac
      out.push('1')
    } else {
      out.push('0')
    }
  }

  return out.join('')
}
