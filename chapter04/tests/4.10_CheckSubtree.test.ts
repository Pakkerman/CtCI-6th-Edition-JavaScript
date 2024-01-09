import { describe, test, expect } from 'bun:test'
import { BinaryTree, TreeNode } from '../util/BinaryTree'
import { containsTree, containsTreeTraversal } from '@code/4.10_CheckSubtree'

const t1 = new TreeNode<number>(5)
for (const value of [2, 3, 6, 7, 8, 1, 5]) t1.insertInOrder(value)

const t2 = new TreeNode<number>(2)
t2.insertInOrder(3)
t2.insertInOrder(1)

const t3 = new TreeNode<number>(6)
t3.left = new TreeNode<number>(7)

const t4 = new TreeNode<number>(5)

describe('containsTree()', () => {
  test('root and root.right on the same tree', () => {
    expect(containsTree(t1, t2)).toBe(true) // straightforward case
    expect(containsTree(t1, t3)).toBe(false) // wrong side
    expect(containsTree(t1, t4)).toBe(true) // duplicate nodes, need to check both node in t1 against t2
  })
})

describe('containsTreeTraversal()', () => {
  test('root and root.right on the same tree', () => {
    expect(containsTreeTraversal(t1, t2)).toBe(true) // straightforward case
    expect(containsTreeTraversal(t1, t3)).toBe(false) // wrong side
    expect(containsTreeTraversal(t1, t4)).toBe(true) // duplicate nodes, need to check both node in t1 against t2
  })
})
