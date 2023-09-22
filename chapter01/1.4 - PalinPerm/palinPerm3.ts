// using bit manipulation

function palinPerms3(str: string): boolean {
  let vector = 0

  str = str.toLowerCase()
  for (let i = 0; i < str.length; i++) {
    const idx = str.charCodeAt(i) - 97
    vector = toggleBit(idx, vector)
  }

  return (vector & (vector - 1)) === 0
}

function toggleBit(idx: number, vector: number): number {
  if (idx < 0 || 26 <= idx) return vector

  let mask = 1 << idx
  console.log((vector & mask) === 0)
  if ((vector & mask) === 0) {
    vector = vector | mask
  } else {
    vector = vector & ~mask
  }
  console.log('mask', mask.toString(2).padStart(25, '0'))
  console.log('vector', vector.toString(2).padStart(25, '0'))

  return vector
}

console.log(
  palinPerms3('tact coa'),
  palinPerms3('eefffee'),
  palinPerms3('eeffac')
)
console.log('true', 'true', 'false')
