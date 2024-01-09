import { BST, TreeNode } from './BST'

// A binary tree: (Balanced, Valid BST)
//        4
//    2       6
//  1   3   5   7

export const BinaryTreeA = new BST([4, 2, 6, 1, 3, 5, 7])

// A binary tree: (Unbalanced)
// From the preceptive of 6 on the second level, left height is 0, right height is 2, therefore the entire tree is deemed unbalanced, the height different is > 1
//        5
//    2       6
//  1   3       6
// 0   2 3        8
//        4
export const BinaryTreeB = new BST([5, 2, 6, 1, 3, 0, 2, 3, 4, 6, 8])

// console.log(BinaryTreeB.root)
// A binary tree: (Balanced, invalid BST)
//        4
//    2       6
//  1   3   5   2 << smaller than root
export const BinaryTreeC = new BST([4, 2, 6, 1, 3, 5])
const node = BinaryTreeC.get(6)
if (node) node.right = new TreeNode(2, node)

export const BinaryTreeD = new BST([2])
BinaryTreeD.root!.left = new TreeNode(2)
BinaryTreeD.root!.right = new TreeNode(2)
