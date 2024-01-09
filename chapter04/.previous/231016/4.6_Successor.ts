// 4.6 Successor: Write an algorithm to find the "next" node. (i.e., in-order successor) or a given node in a binary search tree. You may assume that each node has a link to its parent.
// Hints: #79, #91

// #79: Think about how an in-order traversal works and try to "reverse engineer" it.
// #91: Here's one step of the logic: The successor of a specific node is the leftmost node in the right subtree. What if there is no right subtree, though?

// What "next" node?
// What does "successor" mean?

// BinaryTreeA:
//        4
//    2       6
//  1   3   5   7
// in-order traversed: 1, 2, 3, 4, 5, 6, 7
// Node 1's successor is Node 2.
// Node 2's successor is Node 3.
// Node 3's successor is Node 4.
// Node 4's successor is Node 5.
// Node 5's successor is Node 6.
// Node 6's successor is Node 7.
// Node 7 doesn't have a successor in this context.
// So because inorder is left, center, right, so when we given a node, left is alread visited, and the next in line is right, so we go right, then its another regular dfs, so left again, until reach the leaf.

import { BST, TreeNode } from '../util/BST'

export function findSuccessor<T>(
  tree: BST<T>,
  target: T
): TreeNode<T> | undefined {
  if (!tree.root) return undefined
  let node = tree.get(target) // get the target node
  if (!node) return undefined

  let out: TreeNode<T> | undefined = undefined
  // if there is a right node, we'll go there
  if (node.right) {
    // Right node exist, now we drill all the way left and output that leaf node, that is the next node in line in the context of in-order traversal
    node = node.right
    while (node) {
      out = node
      node = node.left
    }
  } else {
    // There is no right node, we need to go back to parent ,and if the current node is already the left node, that means the parent will be traverse next, in the context of a in order traversal
    // But if the node is the right node, that means the parent has already been traversed, we need to go back further, until the current node is parent's left node, that means the next inorder travresal will be parent, then we will return the parent, the next node in line.
    let parent = node.parent
    while (parent && parent.right === node) {
      node = parent
      parent = parent.parent
    }
    out = parent
  }

  return out
}
