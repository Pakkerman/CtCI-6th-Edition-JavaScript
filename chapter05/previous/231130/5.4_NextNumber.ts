// Get the smallest and largest number that is bigger than input
// just say that get the bigger number that is closest to the given value while still holding the same number of 1s. and the smaller number that is the closest to the given value.

// just count up and check if the number of 1s is the same, return when find the first one that matches
export function brute(n: number): number {
  const count = getCount(n)
  let curr = n + 1

  while (count != getCount(curr)) {
    curr++
  }

  return curr

  function getCount(n: number): number {
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

export function getNext(n: number): number {
  let curr = n
  let trailing0s = 0
  let trailing1s = 0

  // move c0 to the position of the last 0
  while (curr && (curr & 0b1) === 0) {
    trailing0s++
    curr >>>= 1
  }
  // count the remaining 1s and assign to c1
  while ((curr & 0b1) === 1) {
    trailing1s++
    curr >>>= 1
  }

  // p is first 0 that comes after c0 + c1 from the right
  const flipPostition = trailing0s + trailing1s

  // flip position to 1
  n |= 0b1 << flipPostition
  // clear all right side of p
  n &= ~((0b1 << flipPostition) - 1)
  // consider how many training 1s we got, we need one less 1s, so by getting a mask that is 1 << 1s - 1 we got
  // say 000010110, 5th bit is already flipped, so we go 2 1s, we need to get it down to 1 and move to the right.
  // and we first by clear out the right side, 000010000
  // and then we do 1 << trailing1s - 1 => 000000010, and then we subtract 1 to get 000000001
  // that is our mask and we OR that with N we got the answer.
  n |= (1 << (trailing1s - 1)) - 1
  return n
}

// now we try to get the number that is closest to input, but smaller and has the same numbers of 1s
// take 1001, which is 9
// we -1 we got 8, that is 1000, not what we want
// -1 again we got 7, that is 0111, not what we want
// -1 again we got 6, that is 0110, we got to the answer,
// I think we flip the most bit to 0 first , and the add 1 to the first zero on the right, and then push them to the position to the flipPos -1
// try 153, 10011001
// 150,     10010110
// try 13948
//  11011001111100
//  11011001111010, 13946

// clear 0 to p
// insert c1 + 1 to the right of p
export function getPrevious(n: number): number {
  let temp = n
  let c0 = 0
  let c1 = 0

  while ((temp & 1) === 1) {
    c1++
    temp >>>= 1
  }

  if (temp === 0) return -1

  while ((temp & 1) === 0 && temp) {
    c0++
    temp >>>= 1
  }

  console.log(n.toString(2))
  const p = c0 + c1
  // flip the bit to 0
  // mask = 000100000 => 111011111111
  n &= ~(1 << p) // clear pth 1 to 0
  n &= ~((0b1 << (p + 1)) - 1) // clear p to 0

  const mask = (1 << (c1 + 1)) - 1 // 0000000111
  n |= mask << (c0 - 1) // 1001110000000 | 0000000000111 << 4 => 0000001110000
  console.log(n.toString(2))
  return n
}
