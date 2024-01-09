import { expect, describe, test } from 'bun:test'
import {
  BinaryTreeWithGetRandomNode,
  Node,
  RandomNodeTree,
  RandomNodeTreeNode,
} from '@code/4.12_RandomNode'

const count = 5000000
console.log('running: ', count, 'times')
console.log(
  'Chances should be evenly distributed on every node with slight plus/minus.'
)

const root = new Node(10)
const nodeCount = 20
const set: Set<number> = new Set()
for (let i = 0; i < nodeCount; i++) {
  let value = Math.floor(Math.random() * nodeCount)
  while (set.has(value)) value = Math.floor(Math.random() * nodeCount)
  set.add(value)
  if (value === 10) continue
  root.insertInOrder(value)
}

// const root = new Node(5)
// for (const value of [6, 7, 8, 9, 10, 3, 4, 2, 1, 0]) root.insertInOrder(value)

// describe('Slow But working solution', () => {
//   test('', () => {
//     const result: Map<number, number> = new Map()
//     for (let i = 0; i < count; i++) {
//       const randomNode = root.getRandomNode()
//       if (!result.has(randomNode?.getData()!))
//         result.set(randomNode?.getData()!, 0)
//       else
//         result.set(
//           randomNode?.getData()!,
//           result.get(randomNode?.getData()!)! + 1
//         )
//     }

//     for (const value of result.values()) {
//       console.log(((value / count) * 100).toFixed(2), '%')
//     }
//   })
// })

describe('#6, fast and working solution', () => {
  test('', () => {
    // const root = new Node(5)
    // const list = [2, 3, 4, 6, 7, 8, 9, 0, 1]
    // for (const item of list) {
    //   root.insertInOrder(item)
    // }

    const result: Map<number, number> = new Map()
    for (let i = 0; i < count; i++) {
      const node = root.getRandomNode()
      if (!result.has(node?.getData()!)) result.set(node?.getData()!, 0)
      else result.set(node?.getData()!, result.get(node?.getData()!)! + 1)
    }

    for (const item of result.values())
      console.log(((item / count) * 100).toFixed(2), '%')
  })
})

describe('#7, fast and working solution', () => {
  test('', () => {
    const tree = new RandomNodeTree()
    tree.root = new RandomNodeTreeNode(10)
    const nodeCount = 20
    const set: Set<number> = new Set()
    for (let i = 0; i < nodeCount; i++) {
      let value = Math.floor(Math.random() * nodeCount)
      while (set.has(value)) value = Math.floor(Math.random() * nodeCount)
      set.add(value)
      if (value === 10) continue
      tree.root.insertInOrder(value)
    }

    const result: Map<number, number> = new Map()
    for (let i = 0; i < count; i++) {
      const node = tree.getRandomNode()
      if (!result.has(node?.getData()!)) result.set(node?.getData()!, 0)
      else result.set(node?.getData()!, result.get(node?.getData()!)! + 1)
    }

    for (const item of result.values())
      console.log(((item / count) * 100).toFixed(2), '%')
  })
})
