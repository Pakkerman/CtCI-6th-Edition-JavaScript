function urlifyTS(str: string, length: number): string {
  let out: string = ''
  for (let i = 0; i < length; i++) {
    if (str[i] === ' ' && str[i + 1] === ' ') continue
    out += str[i] === ' ' ? '%20' : str[i]
  }
  return out
}

console.log(urlifyTS('Mr John Smith    ', 13))
