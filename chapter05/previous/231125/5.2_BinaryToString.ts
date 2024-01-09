export function printBinary(num: number): string {
  console.log(`fn(${num})`)
  if (num <= 0 && 1 <= num) return 'Error'

  const out: string[] = ['.']
  while (num > 0) {
    if (out.length === 32) return 'Error'
    num *= 2

    console.log(num)
    if (num >= 1) {
      out.push('1')
      num -= 1
    } else {
      out.push('0')
    }
    console.log('output: \t', out.join(''))
  }

  return out.join('')
}

export function printBinary2(num: number): string {
  if (num <= 0 || 1 <= num) return 'Error'

  const out: string[] = ['.']
  let frac = 1
  while (num > 0) {
    if (out.length === 32) return 'Error'
    frac /= 2

    if (num >= frac) {
      out.push('1')
      num -= frac
    } else {
      out.push('0')
    }
  }

  return out.join('')
}
