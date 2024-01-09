import type { BST, TreeNode } from '../util/BST'

type N = TreeNode<number>

export function findCommonAncestorWithParent(a: N, b: N): N | undefined {
  console.log(`a: ${a.value}`)
  console.log(`b: ${b.value}`)
  let aDepth = depth(a)
  let bDepth = depth(b)
  if (aDepth - bDepth < 0) {
    ;[a, b] = [b, a]
  }

  let deep = a
  let shallow = b

  let diff = Math.abs(aDepth - bDepth)
  while (diff-- && deep) {
    deep = deep.parent
  }
  console.log(deep.value)

  while (deep && shallow) {
    if (deep === shallow) return deep
    deep = deep.parent
    shallow = shallow.parent
  }

  return deep

  function depth(curr: N): number {
    let count = -1
    while (curr) {
      curr = curr.parent
      count++
    }
    return count
  }
}

export function findCommonAncestorWithParentBetter(
  root: N,
  a: N,
  b: N
): N | undefined {
  if (!covers(root, a) || !covers(root, b)) return null
  if (covers(a, b)) return a
  if (covers(b, a)) return b

  let sib = getSib(a)
  let parent = a.parent
  while (!covers(sib, b)) {
    sib = getSib(parent)
    parent = parent.parent
  }

  return parent

  function covers(curr: N, node: N): boolean {
    if (!curr) return false

    while (node) {
      if (curr === node) return true
      node = node.parent
    }

    return false
  }

  function getSib(node: N): N | undefined {
    if (!node) return undefined

    const parent = node.parent
    if (node === parent.left) return parent.right
    else return parent.left
  }
}

export function findCommonAncestorWithoutParent(
  root: N,
  a: N,
  b: N
): N | undefined {
  if (!covers(root, a) || !covers(root, b)) return undefined

  return recurse(root, a, b)

  //helper
  function recurse(root: N, a: N, b: N): N | undefined {
    if (!root || root === a || root === b) return root

    const aOnLeft = covers(root.left, a)
    const bOnLeft = covers(root.left, b)

    if (aOnLeft !== bOnLeft) return root

    const child = aOnLeft ? root.left : root.right
    return recurse(child, a, b)
  }

  function covers(curr: N, node: N): boolean {
    if (!curr) return false
    if (curr === node) return true

    return covers(curr.left, node) || covers(curr.right, node)
  }
}
export function findCommonAncestorWithoutParentOptimised(
  root: N,
  a: N,
  b: N
): N | undefined {}
