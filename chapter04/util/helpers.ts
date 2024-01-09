import type { BinaryTreeNode } from '../util/types'

export function printBinaryTree(root: BinaryTreeNode | undefined): void {
  if (!root) return

  const queue: BinaryTreeNode[] = [root]

  while (queue.length > 0) {
    const levelLength = queue.length

    for (let i = 0; i < levelLength; i++) {
      const node = queue.shift() as BinaryTreeNode

      if (i === 0) process.stdout.write(`   ${node.value}`)
      else process.stdout.write(` ${node.value}`)

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    console.log()
  }
}
