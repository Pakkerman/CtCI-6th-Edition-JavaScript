import { test, describe, expect } from 'bun:test'
import { allSequences } from '@code/4.9_BSTSequences'
import { BST } from '../util/BST'

const treeA = new BST([5, 2, 7])
const treeB = new BST([5, 2, 7, 1, 6])

describe('allSequences', () => {
  test('[5, 2, 7]', () => {
    const result = allSequences(treeA.root).map((item) => item.getPrintList())
    expect(result).toEqual([
      [5, 2, 7],
      [5, 7, 2],
    ])
  })

  test('[5, 2, 7, 1, 6]', () => {
    const result = allSequences(treeB.root).map((item) => item.getPrintList())
    console.log(result)
    expect(result).toEqual([
      [5, 2, 1, 7, 6],
      [5, 2, 7, 1, 6],
      [5, 2, 7, 6, 1],
      [5, 7, 2, 1, 6],
      [5, 7, 2, 6, 1],
      [5, 7, 6, 2, 1],
    ])
  })
})
