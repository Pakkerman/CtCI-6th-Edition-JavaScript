// 3 operations can be perform on a string
//  1. insert a character
//    - the length is +1 than the original
//    - run a length comparison
//  2. remove a character
//    - the length is -1 than the original
//    - run a length comparison
//  3. replace a character
//    - the length is the same, but only one character is change,
//    - run a character by character check

function onAway(short: string, long: string): boolean {
  let diff = Math.abs(short.length - long.length)
  if (diff > 1) return false
  if (short.length > long.length) [short, long] = [long, short]

  let shortIdx = 0
  let longIdx = 0

  // Keep interating until there's a difference, then set diff true, this means that it theres a different
  // char, but
  let isDiffFound = false
  while (shortIdx < short.length && longIdx < long.length) {
    console.log('curr', short[shortIdx], long[longIdx])
    if (short[shortIdx] === long[longIdx]) {
      shortIdx++
      longIdx++
      continue
    }

    if (isDiffFound) return false
    if (shortIdx !== longIdx) return false
    isDiffFound = true
    if (diff === 0) shortIdx++
    longIdx++
  }

  return true
}

console.log(
  '',
  onAway('pale', 'ple') ? 'success: true' : 'fail: should be true',
  '\n',
  onAway('pales', 'pale') ? 'success: true' : 'fail: should be true',
  '\n',
  onAway('pale', 'bale') ? 'success: true' : 'fail: should be true',
  '\n',
  !onAway('pale', 'bake') ? 'success: false' : 'fail: should be false'
)
