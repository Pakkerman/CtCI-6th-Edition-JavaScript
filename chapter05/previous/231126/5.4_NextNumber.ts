// Get the smallest and largest number that is bigger than input

export function brute(n: number): number {
  let ones = countOnes(n)
  let curr = n + 1
  while (ones != countOnes(curr)) curr++

  return curr

  function countOnes(n: number): number {
    let count = 0
    while (n) {
      if ((n & 0b1) === 1) count++
      n >>>= 1
    }

    return count
  }
}

// 0b11001100 >> 0b11010001
// set the non-trailing 0 from the right to 1
// move all bits left of the flipped bit to right and trash one 1 bit
// 0b11001100 to 0b11011100
//      ^ change to 1
// 0b11011100 >> 0b11010110 >> 0b11010011
//       ^^^^ move this part to the right
// 0b11010011, keep move right and trans one 1
// 0b11010001

function getNext(n: number): number {
  let curr = n
  let c0 = 0
  let c1 = 0

  // 0b11001100 >> 0b00110011, c0 = 2
  while (curr && (curr & 0b1) === 0) {
    c0++
    curr >>= 1
  }

  // 0b11001100
  //        ^ c0

  // 0b00110011 >> 0b00001100
  while ((curr & 0b1) === 1) {
    c1++
    curr >>= 1
  }
  // c0 = 2
  // c1 = 2

  if (c0 + c1 === 31 || c0 + c1 === 0) return -1

  let p = c0 + c1
  // 0b11001100
  //      ^ p

  n = n | (1 << p) // 0b11001100 | 0b00010000 >> 0b11011100
}
