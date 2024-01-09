// If the string is odd length, it will have one char in odd count
// If the string is even length, it will have all char in even count

function palinPerms(str: string): boolean {
  const check = buildMap(str)
  return checkMap(check)
}

// Map char into a hashmap
function buildMap(str: string): number[] {
  const check = new Array(26).fill(0)

  str = str.toLowerCase()
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 97
    if (code < 0) continue
    check[code]++
  }

  return check
}

function checkMap(check: number[]): boolean {
  let foundOdd = false
  for (let i = 0; i < check.length; i++) {
    if (check[i] % 2 === 0) continue
    if (foundOdd) return false
    foundOdd = true
  }

  return true
}

console.log(palinPerms('tact coa'))
console.log(palinPerms('eefffee'))
console.log(palinPerms('eeffac'))
