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
  sortedArray: Array<number>
): BinaryTreeNode | undefined {
  const node = recurse(0, sortedArray.length)
  return node

  function recurse(lo: number, hi: number): BinaryTreeNode | undefined {
    if (hi <= lo) return

    const mid = Math.floor(lo + (hi - lo) / 2)
    const node: BinaryTreeNode = { value: sortedArray[mid] }
    node.left = recurse(lo, mid)
    node.right = recurse(mid + 1, hi)
    return node
  }
}
