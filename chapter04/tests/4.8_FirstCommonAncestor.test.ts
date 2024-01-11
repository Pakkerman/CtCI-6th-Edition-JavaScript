import { describe, test, expect } from 'bun:test'
import { BinaryTreeA, BinaryTreeB } from '../util/lib'
import { TreeNode } from '../util/BST'
import {
  findCommonAncestorWithParent,
  findCommonAncestorWithParentBetter,
  findCommonAncestorWithoutParent,
  findCommonAncestorWithoutParentOptimised,
} from '@code/4.8_FirstCommonAncestor'

// BinaryTreeA //
//        4
//    2       6
//  1   3   5   7

// describe('findCommonAncestorWithParent', () => {
//   test(() => {
//     expect(
//       findCommonAncestorWithParent(BinaryTreeA.root, BinaryTreeA.get(7)).value
//     ).toEqual(BinaryTreeA.root.value)

//     expect(
//       findCommonAncestorWithParent(BinaryTreeA.get(1), BinaryTreeA.get(6)).value
//     ).toEqual(BinaryTreeA.root.value)

//     expect(
//       findCommonAncestorWithParent(BinaryTreeA.get(1), BinaryTreeA.get(3)).value
//     ).toEqual(BinaryTreeA.get(2).value)

//     expect(
//       findCommonAncestorWithParent(BinaryTreeA.get(1), new TreeNode<number>(3))
//         ?.value
//     ).toEqual(undefined)
//   })
// })

// describe('findCommonAncestorWithParentBetter', () => {
//   test('root and 9', () => {
//     const result = findCommonAncestorWithParentBetter(
//       BinaryTreeA.root,
//       BinaryTreeA.get(7)
//     ).value
//     expect(result).toEqual(BinaryTreeA.root.value)
//   })
//   test('2 and 8', () => {
//     const result = findCommonAncestorWithParentBetter(
//       BinaryTreeA.get(1),
//       BinaryTreeA.get(6)
//     ).value
//     expect(result).toEqual(BinaryTreeA.root.value)
//   })
//   test('8 and 9', () => {
//     const result = findCommonAncestorWithParentBetter(
//       BinaryTreeA.get(1),
//       BinaryTreeA.get(3)
//     ).value
//     expect(result).toEqual(BinaryTreeA.get(2).value)
//   })
//   test('a and b are not even in the same tree', () => {
//     const result = findCommonAncestorWithParentBetter(
//       BinaryTreeA.get(1),
//       new TreeNode<number>(3)
//     )?.value
//     expect(result).toEqual(undefined)
//   })
// })

// describe('findCommonAncestorWithoutParent', () => {
//   test(() => {
//     expect(
//       findCommonAncestorWithoutParent(
//         BinaryTreeA.root,
//         BinaryTreeA.root,
//         BinaryTreeA.get(7)
//       )?.value
//     ).toEqual(BinaryTreeA.root.value)

//     expect(
//       findCommonAncestorWithoutParent(
//         BinaryTreeA.root,
//         BinaryTreeA.get(1),
//         BinaryTreeA.get(6)
//       )?.value
//     ).toEqual(BinaryTreeA.root.value)

//     expect(
//       findCommonAncestorWithoutParent(
//         BinaryTreeA.root,
//         BinaryTreeA.get(1),
//         BinaryTreeA.get(3)
//       )?.value
//     ).toEqual(BinaryTreeA.get(2).value)

//     expect(
//       findCommonAncestorWithoutParent(
//         BinaryTreeA.root,
//         BinaryTreeA.get(1),
//         new TreeNode<number>(5)
//       )?.value
//     ).toBe(undefined)
//   })

//   test(() => {
//     expect(
//       findCommonAncestorWithoutParent(
//         BinaryTreeB.root,
//         BinaryTreeB.get(4),
//         BinaryTreeB.get(8)
//       )?.value
//     ).toBe(BinaryTreeB.root.value)
//   })
// })

describe('findCommonAncestorWithoutParentOptimised', () => {
  test(() => {
    expect(
      findCommonAncestorWithoutParentOptimised(
        BinaryTreeA.root,
        BinaryTreeA.root,
        BinaryTreeA.get(1)
      ).value
    ).toEqual(BinaryTreeA.root.value)

    // expect(
    //   findCommonAncestorWithoutParentOptimised(
    //     BinaryTreeA.root,
    //     BinaryTreeA.get(2),
    //     BinaryTreeA.get(7)
    //   ).value
    // ).toEqual(BinaryTreeA.root.value)
    // expect(
    //   findCommonAncestorWithoutParentOptimised(
    //     BinaryTreeA.root,
    //     BinaryTreeA.get(5),
    //     BinaryTreeA.get(7)
    //   ).value
    // ).toEqual(BinaryTreeA.get(6).value)
    // expect(
    //   findCommonAncestorWithoutParentOptimised(
    //     BinaryTreeA.root,
    //     BinaryTreeA.get(5),
    //     new TreeNode<number>(10)
    //   )
    // ).toEqual(undefined)
  })
})
