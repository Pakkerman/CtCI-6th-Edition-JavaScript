// Given two strings, write a method to decide if one is a permuation of the other

// Questions:
// - Case sentsive?
// - Space and special character counts?

// using hashmap
// runtime: build map O(C), compare: O(I) => O(C + I)
// space: O(C)
function checkPermutationHashMap(input: string, check: string): boolean {
  if (input.length !== check.length) return false

  const map = new Map<string, number>()
  check.split('').forEach((char) => {
    if (!map.has(char)) map.set(char, 0)
    map.set(char, map.get(char)! + 1)
  })

  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if (!map.has(char)) break

    let count = map.get(char)!
    if (count === 1) map.delete(char)
    else map.set(char, count - 1)
  }

  return map.size === 0
}

// console.log(checkPermutation('abc', 'abd'))

function checkPermutationArray(input: string, check: string): boolean {
  if (input.length !== check.length) return false
  const arr = new Array(128).fill(0)
  for (let i = 0; i < check.length; i++) {
    arr[check.charCodeAt(i)]++
  }

  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i)
    arr[code]--
    if (arr[code] < 0) return false
  }
  return true
}

console.log(checkPermutationArray('az', 'az'))
console.log(checkPermutationArray('AAA', 'BBB'))
console.log(checkPermutationArray('AAAa', 'BBB'))
console.log(checkPermutationArray('bbb', 'BBB'))
console.log(checkPermutationArray('google', 'ooggle'))
