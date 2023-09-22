// Permutation, ways that a collection of chars can be rearranged,
// Palindrome, a string that reading from the start or the back will give you the same result

// Don't compute every permutation and then check it, it will be O(2! + checktime), it will blow up with just 10 chars

// Consider, Palindrome for:
//  - Even length: no one character can be odd count,
//  - Odd length: only one character can be odd count,

// Runtime: O(N + 26) >> O(N)

function PermuPal(str: string): boolean {
  str = str.replace(' ', '').toLocaleLowerCase()
  const check = new Array(26).fill(0)

  for (let i = 0; i < str.length; i++) {
    const idx = str.charCodeAt(i) - 97
    console.log(idx)
    check[idx]++
  }

  let foundOdd = false
  for (let i = 0; i < check.length; i++) {
    if (check[i] % 2 === 0) continue
    if (str.length % 2 === 0) return false
    if (foundOdd) return false
    foundOdd = true
  }
  return true
}

function PermuPalVector(str: string): boolean {
  str = str.replace(' ', '').toLowerCase()
  let check = 0

  for (let i = 0; i < str.length; i++) {
    const idx = str.charCodeAt(i) - 97
    const mask = 1 << idx
    if ((check & mask) === 0) check |= mask
    else check &= ~mask
  }

  return (check & (check - 1)) === 0
}

console.log(PermuPalVector('tact Coa'))
console.log(PermuPalVector('asd'))

function print(input: any): boolean {
  return input.toString(2).padStart(26, '0')
}
