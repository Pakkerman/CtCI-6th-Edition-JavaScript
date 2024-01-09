import { expect, test } from 'bun:test'
import { createMinTree } from '@code/4.2_MinimalTree'
import { printBinaryTree } from '../util/helpers'

const sortedArray = [1, 2, 3, 4, 5, 6, 7]

test('Test CreateMinTree()', () => {
  const root = createMinTree(sortedArray)
  expect(root).toEqual({
    value: 4,
    left: {
      value: 2,
      left: {
        value: 1,
        left: undefined,
        right: undefined,
      },
      right: {
        value: 3,
        left: undefined,
        right: undefined,
      },
    },
    right: {
      value: 6,
      left: {
        value: 5,
        left: undefined,
        right: undefined,
      },
      right: {
        value: 7,
        left: undefined,
        right: undefined,
      },
    },
  })

  console.log(`Tree output:`)
  printBinaryTree(root)
})
