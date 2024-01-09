// 4.2 Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an algorithm to create a binary search tree with minimal height.
// Hints: #19, #73, #116

// A minimal binary tree has about the same number of nodes on the left of each node as on the right. Let's focus on just the root for now. How would you ensure that about same number of nodes are on the left of the root as the right?
// You could implement this by finding the 'ideal' next element to add and repeatedly calling insertValue. this will be a bit inefficient, as you would have to repeatedly traverse the tree. Try recursion instead. Can you divide this problem into subproblems?
// Imagine we had a createMinimalTree method that returns a minimal tree for a given array (but for some strange reason doesn't operate on the root of the tree). Could you use this to operate on the root of the tree? Could you write the base case for the function? Great! Then that's basically the entire function

type BinaryTreeNode = {
  value: number
  left?: BinaryTreeNode
  right?: BinaryTreeNode
}

const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//       1
//    2     3
//  4  5  6  7

function CreateMinTree(
  sortedArray: Array<number>,
  idx: number = 0,
  height: number = 1
): BinaryTreeNode | undefined {
  if (idx >= sortedArray.length) return undefined
  const node: BinaryTreeNode = { value: sortedArray[idx] }
  height++
  node.left = CreateMinTree(sortedArray, idx * height + 1)
  node.right = CreateMinTree(sortedArray, idx * height + 2)

  return node
}

console.log(CreateMinTree(sortedArray))
