type BinaryTreeNode = {
  value: number
  left?: BinaryTreeNode
  right?: BinaryTreeNode
}

//       1
//    2     3
//  4  5  6  7

// [1, 2, 3, 4, 5, 6, 7]

// Getting the mid and slice the array, and repeat, set mid to the root value, recurse left and right, and done.

export function createMinTree(
  sortedArray: Array<number>,
  idx: number = Math.floor(sortedArray.length / 2)
): BinaryTreeNode | undefined {
  if (sortedArray.length === 0) return
  const node: BinaryTreeNode = { value: sortedArray[idx] }
  node.left = createMinTree(sortedArray.slice(0, idx))
  node.right = createMinTree(sortedArray.slice(idx + 1))

  return node
}
