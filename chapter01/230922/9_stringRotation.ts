// 1.9 String Rotation: Assume you have a method isSubstring() which checks ifone word is a substring of another. Given two strings, 51 and 52, write code to check if 52 is a rotation of 51 using only one call to isSubstring (e.g., waterbottle a rotation erbottlewat).

// intuition:
//  Use two pointer that one is going from 0 to last in the first string,
//  Second point that will find the first matching char first, then sync with first point and then walk until the first point is at the end
// In any point two pointed char is mismatched, we'll return false
// maybe keep track where the second pointer has started, if ther first time it start the process might be there is a duplicate character in the string, make sure that all charactor is checked

// runtime: O(log s)
function stringRotation(str: string, target: string): boolean {
  if (str.length !== target.length) return false
  str = str.split('').sort().join('')
  target = target.split('').sort().join('')

  console.log(str, target)
  if (str === target) return true
  return false
}

// console.log(stringRotation('waterbottle', 'erbottlewat'))
// console.log(stringRotation('waterbottle', 'rbottlewat'))
// console.log(stringRotation('waterbottle', 'erxottlewat'))

// s1s1 = waterbottlewaterbottle
// s2 = erbottlewat
function stringRotation2(s1: string, s2: string): boolean {
  if (s1.length !== s2.length) return false
  return isSubstring(s1 + s1, s2)

  function isSubstring(a: string, b: string): boolean {
    for (let i = 0; i < a.length - b.length; i++) {
      const substring = a.slice(i, i + b.length)
      if (substring === b) return true
    }
    return false
  }
}

console.log(stringRotation2('waterbottle', 'erbottlewat'))
console.log(stringRotation2('waterbottle', 'rbottlewat'))
console.log(stringRotation2('waterbottle', 'erxottlewat'))
