// runtime: O(N^2)
function isUnique(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    const curr = str[i]
    for (let k = 0; k < str.length && k != i; k++) {
      if (curr === str[k]) return false
    }
  }

  return true
}

// Using a check map to achieve runtime: O(N), space: O(1)

function isUnique2(str: string): boolean {
  if (str.length > 128) return false
  const check = new Array(128).fill(false)
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (check[code]) return false
    check[code] = true
  }

  return true
}

// using bits

function isUniqueBit(str: string): boolean {
  let check: number = 0
  for (let i = 0; i < str.length; i++) {
    console.log('curr check: ', check.toString(2).padStart(26, '0'))
    let val = str.charCodeAt(i) - 'a'.charCodeAt(0)
    console.log('curr val', val)
    console.log('that stuff: ', (1 << val).toString(2).padStart(26, '0'))
    const compare = 1 << val
    console.log((compare & check).toString(2))
    if ((check & compare) !== 0) return false //both 1 output 1
    check |= 1 << val // or operation, either one has 1 output 1
  }
  return true
}

console.log(isUniqueBit('abc'))
// console.log(isUniqueBit('abba'))
// console.log(isUniqueBit('foo'))
// console.log(isUniqueBit('Qui suscipit sit id libero.'))
// console.log(isUniqueBit('ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
