function isUnique(str: string): boolean {
  if (str.length === 0) return false
  const check = new Array(128).fill(false)
  for (let i = 0; i < str.length; i++) {
    const idx = str.charCodeAt(i)
    if (check[idx]) return false
    check[idx] = true
  }

  return true
}

console.log(isUnique('ab'))
console.log(isUnique('abdjka'))

function isUnique2(str: string): boolean {
  let check = 0
  for (let i = 0; i < str.length; i++) {
    const idx = str.charCodeAt(i)
    const mask = 1 << idx
    if ((check & mask) > 1) return false
    check |= mask
  }

  return true
}

console.log(isUnique2('azs'))
console.log(isUnique2('a2s'))
console.log(isUnique2('aaa'))
