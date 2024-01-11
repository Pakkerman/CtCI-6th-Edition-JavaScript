import type { BST, TreeNode } from '../util/BST'
import { yellow, cyan, magenta } from '../util/ConsoleColors'

type N = TreeNode<number>

export function findCommonAncestorWithParent(a: N, b: N): N | undefined {
  // 1. Get the depth of a and b
  // 2. Pick and deep one and walk the difference of depthA and depthB
  // 3. Go up to parent and if A and B eventually meet, that is the common ancestor

  let shallow = depth(a)
  let deep = depth(b)
  console.log(shallow, deep)

  if (deep < shallow) [a, b] = [b, a]

  let diff = Math.abs(deep - shallow)

  while (b && diff) {
    b = b.parent
    diff--
  }

  while (a && b) {
    if (a === b) {
      console.log(`found ancestor: ${a.value}`)
      return a
    }
    a = a.parent
    b = b.parent
  }

  return undefined

  function depth(node: N): number {
    let depth = 0
    while (node) {
      node = node.parent
      depth++
    }
    return depth
  }
}

export function findCommonAncestorWithParentBetter(a: N, b: N): N | undefined {
  // 1. Check if a a's parent node covers b
  // 2. Go back up to parent's parent and check again
  //    - if covers b return parent
  //    - if not repeat
  //    - if parent is undfined, return undefined
  if (covers(a, b)) return a
  if (covers(b, a)) return b

  let parent = a.parent
  while (!covers(parent, b) && parent) {
    parent = parent.parent
  }

  return parent

  function covers(parent: N, node: N): boolean {
    if (parent === node) return true

    while (node) {
      if (node === parent) return true
      node = node.parent
    }

    return false
  }
}

export function findCommonAncestorWithoutParent(
  root: N,
  a: N,
  b: N
): N | undefined {
  if (!covers(root, a) || !covers(root, b)) return false

  return recurse(root, a, b)

  // helper
  function recurse(root: N, a: N, b: N): N | undefined {
    if (!root || root === a || root === b) return root

    const aOnLeft = covers(root.left, a)
    const bOnLeft = covers(root.left, b)

    if (aOnLeft !== bOnLeft) return root

    const child = aOnLeft ? root.left : root.right
    return recurse(child, a, b)
  }

  // util
  function covers(parent: N, node: N): boolean {
    while (node) {
      if (node === parent) return true
      node = node.parent
    }
    return false
  }
}

type Result = { node: TreeNode<number>; isAncestor: boolean }
export function findCommonAncestorWithoutParentOptimised(
  root: N,
  a: N,
  b: N
): N | undefined {
  console.log(yellow, `fn(${root.value}, ${a.value}, ${b.value})`)
  const result: Result = recurse(root, a, b)
  if (result.isAncestor) {
    return result.node
  }
  return undefined

  // helper
  function recurse(root: N, a: N, b: N, indent?: string = ''): Result {
    indent += '   '
    console.log(indent, ` if(!root) ${!root}`)
    if (!root) {
      const result = { node: undefined, isAncestor: false }
      console.log(
        indent,
        cyan,
        `return: node: ${result.node}, isAncestor: ${result.isAncestor}`
      )
      return result
    }
    console.log(
      indent,
      ` if(root === a && root === b) ${root === a && root === b}`
    )
    if (root === a && root === b) {
      const result = { node: root, isAncestor: true }
      console.log(
        indent,
        cyan,
        `return: node: ${result.node}, isAncestor: ${result.isAncestor}`
      )

      return result
    }

    console.log(
      indent,
      yellow,
      `recurse(root.left: ${root.left?.value}, a: ${a.value}, b: ${b.value})`
    )
    const left: Result = recurse(root.left, a, b, indent)
    console.log(indent, `if (left.isAncestor) ${left.isAncestor}`)
    if (left.isAncestor) {
      console.log(
        indent,
        cyan,
        `return: node: ${left.node}, isAncestor: ${left.isAncestor}`
      )
      return left
    }

    console.log(
      indent,
      yellow,
      `recurse(root.right: ${root.right?.value}, a: ${a.value}, b: ${b.value})`
    )
    const right: Result = recurse(root.right, a, b, indent)
    console.log(indent, `if (right.isAncestor) ${right.isAncestor}`)
    if (right.isAncestor) {
      console.log(
        indent,
        cyan,
        `return: node: ${left.node}, isAncestor: ${left.isAncestor}`
      )
      return right
    }

    console.log(
      indent,
      magenta,
      `left: {node: ${left.node?.value}, isAncestor: ${left.isAncestor}}`
    )
    console.log(
      indent,
      magenta,
      `right: {node: ${right.node?.value}, isAncestor: ${right.isAncestor}}`
    )
    let node = root
    let isAncestor = true
    console.log(
      indent,
      `if(left.node && right.node) ${!!left.node && !!right.node}`
    )
    if (left.node && right.node) {
      console.log(
        indent,
        cyan,
        `return: {node: ${node}, isAncestor: ${isAncestor}}`
      )
    } else if (root === a || root === b) {
      isAncestor = !!left.node || !!right.node
      console.log(indent, 'if(root === a || root === b) true')
      console.log(
        indent,
        cyan,
        `return: {node: ${node?.value}, isAncestor: ${isAncestor}}`
      )
    } else {
      node = left.node ? left.node : right.node
      isAncestor = false
      console.log(
        indent,
        cyan,
        `return: {node: ${node?.value}, isAncestor: ${isAncestor}}`
      )
    }
    return { node, isAncestor }
  }
}
