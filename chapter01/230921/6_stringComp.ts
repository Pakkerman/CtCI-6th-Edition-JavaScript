function strComp(str: string): string {
  const out: string[] = []

  let count = 1
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== str[i + 1]) {
      out.push(str[i], count + '')
      count = 1
    } else {
      count++
    }

    if (out.length > str.length) return str
  }

  return out.join('')
}

console.log(strComp('aabcccccaaa'))
console.log(strComp('abcdefg'))
