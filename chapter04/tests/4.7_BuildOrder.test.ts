import { expect, test } from 'bun:test'
import { findBuildOrder } from '@code/4.7_BuildOrder'

const projectsA = ['a', 'b', 'c', 'd', 'e', 'f']
const dependenciesA = [
  ['a', 'd'],
  ['f', 'b'],
  ['b', 'd'],
  ['f', 'a'],
  ['d', 'c'],
]

const projectsB = ['a', 'b', 'c']
const dependenciesB = [
  ['a', 'b'],
  ['b', 'c'],
  ['c', 'a'],
]

console.log(projectsA)
console.log(dependenciesA)

test('4.7 Build Order', () => {
  const buildOrder = findBuildOrder(projectsA, dependenciesA)
  const result = buildOrder.map((item) => item.getName())
  expect(result).toEqual(['e', 'f', 'b', 'a', 'd', 'c'])
})

test('circular in dependencies', () => {
  const buildOrder = findBuildOrder(projectsB, dependenciesB)
  expect(buildOrder).toEqual([])
})

// console.log(order.map((item) => item.getName()))
// console.log(buildGraph(projects, dependencies).listNodes())
