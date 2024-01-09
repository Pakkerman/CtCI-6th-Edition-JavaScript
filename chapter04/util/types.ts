export type BinaryTreeNode = {
  value: number
  left?: BinaryTreeNode
  right?: BinaryTreeNode
}

export type BinaryTreeNodeWithParent = {
  value: number
  parent?: BinaryTreeNodeWithParent
  left?: BinaryTreeNodeWithParent
  right?: BinaryTreeNodeWithParent
}
