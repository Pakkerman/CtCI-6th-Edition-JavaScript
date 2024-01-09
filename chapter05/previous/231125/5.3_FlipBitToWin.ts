import { checkBit } from './5.0_BitOperations'

export function solution(input: number): number {
  const sequence = getAlternatingSequences(input)
  console.log(sequence)
  return findLongestSequence(sequence)
}
function getAlternatingSequences(input: number) {
  // 11011101111
  const out: number[] = []

  let searchingFor = 0
  let counter = 0

  for (let i = 0; i < 32; i++) {
    console.log('i:\t', i)
    console.log((input & 1) !== searchingFor)
    if ((input & 0b1) !== searchingFor) {
      // 1101110 & 0000001
      out.push(counter)
      searchingFor = 1 - searchingFor // x = 0, 1 - x = 1, x = 1, 1 - x = 0
      counter = 0

      console.log(out, 'resets counter, flip searchfor')
    }
    counter++
    input >>>= 1
    console.log(input.toString(2))
  }
  out.push(counter)
  return out
}

function findLongestSequence(seq: number[]): number {
  let max = 1

  for (let i = 0; i < seq.length; i += 2) {
    let zerosSeq = seq[i]
    const onesSeqRight = i - 1 >= 0 ? seq[i - 1] : 0
    const onesSeqLeft = i + 1 >= 0 ? seq[i + 1] : 0

    let thisSeq = 0
    if (zerosSeq === 1) {
      thisSeq = onesSeqLeft + 1 + onesSeqRight
    } else if (zerosSeq > 1) {
      thisSeq = 1 + Math.max(onesSeqLeft, onesSeqRight)
    } else if (zerosSeq === 0) {
      thisSeq = Math.max(onesSeqLeft, onesSeqRight)
    }

    max = Math.max(thisSeq, max)
  }

  return max
}
