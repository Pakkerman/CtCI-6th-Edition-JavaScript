// repeatly * 2 and subtract the left side of the decmial point, if within 32 times, there's still doesn't reach 0, that means we cannot represent this real number with 32 bit precision return error
export function multiply(n: number): string {
  let out: string[] = ['.']

  for (let i = 0; i < 32 && n != 0; i++) {
    n *= 2

    if (n >= 1) {
      out.push('1')
      n -= 1
    } else {
      out.push('0')
    }
  }

  if (n !== 0) return 'ERROR'
  return out.join('')
}

export function fraction(n: number): string {
  let out: string[] = ['.']
  let frac = 1
  for (let i = 0; i < 32 && n != 0; i++) {
    frac /= 2
    if (n >= frac) {
      n -= frac
      out.push('1')
    } else {
      out.push('0')
    }
  }

  if (n !== 0) return 'ERROR'
  return out.join('')
}
