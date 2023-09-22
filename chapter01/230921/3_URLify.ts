function URLify(str: string, len: number): string {
  if (str.length === 0) return 'invalid string'
  str = str.slice(0, len)
  const out: string[] = []

  for (let i = 0; i < str.length; i++) {
    const curr = str[i]
    if (curr === ' ') out.push('%20')
    else out.push(curr)
  }

  return out.join('')
}

console.log(URLify('Mr John Smith     ', 13))
