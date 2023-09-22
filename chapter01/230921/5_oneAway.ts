//

function oneAway(short: string, long: string): boolean {
  const diff = Math.abs(long.length - short.length)
  if (diff > 1) return false
  if (long.length - short.length < 0) [short, long] = [long, short]
  // if long length - short length is less than 0, means that long is shorter than short, we need to swap them
  let shortIdx = 0
  let longIdx = 0
  let foundDiff = false

  while (shortIdx < short.length && longIdx < long.length) {
    if (short[shortIdx] === long[longIdx]) {
      shortIdx++
      longIdx++
      continue
    }

    if (foundDiff) return false // if already has diff found before, return false
    foundDiff = true
    if (diff === 0) shortIdx++ // when we find a diff, we dont know if its because of replaced or deleted, we need to check diff is which, if its 0, means 2 strings is the same length, we keep both idx in sync, if it's removed char, we just increment long idx, and keep going, if it is mismatch again the if statement checking foundDiff will return false.
    longIdx++
  }

  return true
}

console.log(
  '',
  oneAway('pale', 'ple') ? 'success: true' : 'fail: should be true',
  '\n',
  oneAway('pales', 'pale') ? 'success: true' : 'fail: should be true',
  '\n',
  oneAway('pale', 'bale') ? 'success: true' : 'fail: should be true',
  '\n',
  !oneAway('pale', 'bake') ? 'success: false' : 'fail: should be false'
)
