// Get the smallest and largest number that is bigger than input
// just say that get the bigger number that is closest to the given value while still holding the same number of 1s. and the smaller number that is the closest to the given value.

import { clearBit, clearBitsIthTo0, setBit } from './5.0_BitOperations'

// just count up and check if the number of 1s is the same, return when find the first one that matches
export function brute(n: number): number {
  const count = countOnes(n)
  let curr = n + 1
  while (count !== countOnes(curr)) curr++
  return curr

  function countOnes(n: number): number {
    let count = 0
    while ((n &= n - 1)) count++
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
  let trailingZeros = 0
  let trailingOnes = 0
  let curr = n
  while (curr && (curr & 0b1) === 0) {
    curr >>>= 1
    trailingZeros++
  }

  while (curr && (curr & 0b1) === 1) {
    curr >>>= 1
    trailingOnes++
  }

  const flipIdx = trailingOnes + trailingZeros

  n |= 0b1 << flipIdx
  n &= ~0b0 << flipIdx
  n |= (0b1 << (trailingOnes - 1)) - 1
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
  let trailingOnes = 0
  let trailingZeros = 0
  let curr = n
  while (curr && (curr & 0b1) === 1) {
    curr >>>= 1
    trailingOnes++
  }

  while (curr && (curr & 0b1) === 0) {
    curr >>>= 1
    trailingZeros++
  }

  if (curr === 0) return -1

  const flipIdx = trailingOnes + trailingZeros
  console.log(flipIdx)
  console.log(n.toString(2))
  n &= ~0b0 << (flipIdx + 1)
  n |= ((0b1 << (trailingOnes + 1)) - 1) << (trailingZeros - 1)
  console.log(n.toString(2))
  return n
}
