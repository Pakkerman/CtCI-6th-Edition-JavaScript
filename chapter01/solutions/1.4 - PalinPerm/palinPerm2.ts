// If the string is odd length, it will have one char in odd count
// If the string is even length, it will have all char in even count

function palinPerms2(str: string): boolean {
  const check = new Array(26).fill(0)
  // this var is for counting the number of odd chars in the str
  let numberOfOddChars = 0

  str = str.toLowerCase()
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 97
    check[code]++

    // If the odd number after current iteration updated is odd, we'll add to
    // numberOfOddChars, and subtract if is even
    if (check[code] % 2 === 1) numberOfOddChars++
    else numberOfOddChars--
  }

  if (numberOfOddChars > 1) return false
  return true
}

console.log(
  palinPerms2('tact coa'),
  palinPerms2('eefffee'),
  palinPerms2('eeffac')
)
console.log('true', 'true', 'false')
