import { expect, test } from 'bun:test'
import {
  isConnectedDFS,
  isConnectedBFS,
  Graph,
} from '@code/4.1_RouteBetweenNodes'

const graph = new Graph()
for (const value of [0, 1, 2, 3, 4, 5]) graph.addNode(value)
graph.addEdges(0, [1, 3])
graph.addEdges(1, [0, 2])
graph.addEdges(2, [1, 3])
graph.addEdges(3, [0, 2, 4])
graph.addEdges(4, [3])

test('Graph test DFS', () => {
  expect(isConnectedDFS(0, 4, graph)).toBe(true)
  expect(isConnectedDFS(0, 5, graph)).toBe(false)
})

test('Graph test BFS', () => {
  expect(isConnectedBFS(0, 4, graph)).toBe(true)
  expect(isConnectedBFS(0, 5, graph)).toBe(false)
})
