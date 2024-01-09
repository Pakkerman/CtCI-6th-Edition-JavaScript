import { describe, test, expect } from 'bun:test'
import { BinaryTreeA, BinaryTreeB } from '../util/lib'
import { TreeNode } from '../util/BST'
import {
  findCommonAncestorWithParent,
  findCommonAncestorWithParentBetter,
  findCommonAncestorWithoutParent,
  findCommonAncestorWithoutParentOptimised,
} from '@code/4.8_FirstCommonAncestor'

// BinaryTreeA
//        4
//    2       6
//  1   3   5   7

// describe('findCommonAncestorWithParent', () => {
//   test('root and 9', () => {
//     const result = findCommonAncestorWithParent(
//       BinaryTreeA.root,
//       BinaryTreeA.get(7)
//     )
//     expect(result).toEqual(BinaryTreeA.root)
//   })
//   test('2 and 8', () => {
//     const result = findCommonAncestorWithParent(
//       BinaryTreeA.get(1),
//       BinaryTreeA.get(6)
//     )
//     expect(result).toEqual(BinaryTreeA.root)
//   })
//   test('8 and 9', () => {
//     const result = findCommonAncestorWithParent(
//       BinaryTreeA.get(1),
//       BinaryTreeA.get(3)
//     )
//     expect(result).toEqual(BinaryTreeA.get(2))
//   })
// })

// describe('findCommonAncestorWithParentBetter', () => {
//   test(() => {
//     expect(
//       findCommonAncestorWithParentBetter(
//         BinaryTreeA.root,
//         BinaryTreeA.root,
//         BinaryTreeA.get(7)
//       )
//     ).toEqual(BinaryTreeA.root)
//     expect(
//       findCommonAncestorWithParentBetter(
//         BinaryTreeA.root,
//         BinaryTreeA.get(1),
//         BinaryTreeA.get(6)
//       )
//     ).toEqual(BinaryTreeA.root)
//     expect(
//       findCommonAncestorWithParentBetter(
//         BinaryTreeA.root,
//         BinaryTreeA.get(1),
//         BinaryTreeA.get(3)
//       )
//     ).toEqual(BinaryTreeA.get(2))

//     expect(
//       findCommonAncestorWithParentBetter(
//         BinaryTreeA.root,
//         BinaryTreeA.get(1),
//         new TreeNode<number>(5)
//       )
//     ).toBe(null)
//   })

//   test(() => {
//     expect(
//       findCommonAncestorWithParentBetter(
//         BinaryTreeB.root,
//         BinaryTreeB.get(4),
//         BinaryTreeB.get(8)
//       )
//     ).toBe(BinaryTreeB.root)
//   })
// })

describe('findCommonAncestorWithoutParent', () => {
  test(() => {
    expect(
      findCommonAncestorWithoutParent(
        BinaryTreeA.root,
        BinaryTreeA.root,
        BinaryTreeA.get(7)
      )
    ).toEqual(BinaryTreeA.root)

    expect(
      findCommonAncestorWithoutParent(
        BinaryTreeA.root,
        BinaryTreeA.get(1),
        BinaryTreeA.get(6)
      )
    ).toEqual(BinaryTreeA.root)

    expect(
      findCommonAncestorWithoutParent(
        BinaryTreeA.root,
        BinaryTreeA.get(1),
        BinaryTreeA.get(3)
      )
    ).toEqual(BinaryTreeA.get(2))

    expect(
      findCommonAncestorWithoutParent(
        BinaryTreeA.root,
        BinaryTreeA.get(1),
        new TreeNode<number>(5)
      )
    ).toBe(undefined)
  })

  test(() => {
    expect(
      findCommonAncestorWithoutParent(
        BinaryTreeB.root,
        BinaryTreeB.get(4),
        BinaryTreeB.get(8)
      )
    ).toBe(BinaryTreeB.root)
  })
})

// describe('findCommonAncestorOptimised', () => {
//   test('root and 9', () => {
//     expect(
//       findCommonAncestorOptimised(tree.root, tree.root, tree.get(9))
//     ).toEqual(tree.root)
//   })
//   test('2 and 9', () => {
//     expect(
//       findCommonAncestorOptimised(tree.root, tree.get(2), tree.get(9))
//     ).toEqual(tree.root)
//   })
//   test('8 and 9', () => {
//     expect(
//       findCommonAncestorOptimised(tree.root, tree.get(8), tree.get(9))
//     ).toEqual(tree.get(5))
//   })
// })
