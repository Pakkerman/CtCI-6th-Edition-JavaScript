import { test, describe, expect } from 'bun:test'
import { pathsWithSum, pathsWithSumOptimized } from '@code/4.12_PathsWithSum'
import { TreeNode } from '../util/BinaryTree'

const root = new TreeNode<number>(10)
root.left = new TreeNode<number>(5)
root.left.left = new TreeNode<number>(3)
root.left.right = new TreeNode<number>(2)
root.left.right.right = new TreeNode<number>(1)
root.left.left.left = new TreeNode<number>(3)
root.left.left.right = new TreeNode<number>(-2)
root.right = new TreeNode<number>(-3)
root.right.right = new TreeNode<number>(11)

// root:
//          10
//       5     -3
//    3    2      11
//  3 -2     1

describe('Brute', () => {
  test('Case 01', () => {
    expect(pathsWithSum(root, 8)).toBe(3)
    expect(pathsWithSum(root, 6)).toBe(2)
    expect(pathsWithSum(root, 7)).toBe(2)
  })
})

describe('Optimized', () => {
  test('Case 01', () => {
    expect(pathsWithSumOptimized(root, 8)).toBe(3)
    // expect(pathsWithSumOptimized(root, 6)).toBe(2)
    // expect(pathsWithSumOptimized(root, 7)).toBe(2)
  })
})
