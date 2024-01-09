export function printBinary(num: number): string {
  if (num <= 0 && 1 <= num) return 'Error'

  const out: string[] = []
  out.push('.')
  while (num > 0) {
    console.log(out.join(''))
    if (out.length > 32) return 'Error'
    const r = num * 2
    if (r >= 1) {
      out.push('1')
      num = r - 1
    } else {
      out.push('0')
      num = r
    }
  }

  return out.join('')
}

export function printBinary2(num: number): string {
  if (num <= 0 || 1 <= num) return 'Error'

  const out: string[] = []
  let frac = 0.5
  out.push('.')

  while (num > 0) {
    if (out.length > 32) return 'Error'
    if (num >= frac) {
      out.push('1')
      num -= frac
    } else {
      out.push('0')
    }
    frac /= 2
  }

  return out.join('')
}
