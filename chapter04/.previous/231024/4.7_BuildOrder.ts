import { DependencyGraph, ProjectNode } from '../util/DependencyGraph'

// the second project is dependent on the first one, so the first one must be build first before the second can be build

export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): ProjectNode[] {
  const graph = buildGraph(projects, dependencies)
  return order(graph.getNodes())
}

function buildGraph(
  projects: string[],
  dependencies: string[][]
): DependencyGraph {
  const graph = new DependencyGraph()
  for (const item of projects) graph.getOrCreateNode(item)
  for (const item of dependencies) graph.addEdge(item[0], item[1])
  return graph
}

function order(nodes: ProjectNode[]): ProjectNode[] {
  const buildorder: ProjectNode[] = []
  addNonDependent(buildorder, nodes)
  let idx = 0
  while (idx < buildorder.length) {
    const curr = buildorder[idx]
    const children = curr.getChildren()
    for (const child of children) child.decremenetDependencies()
    addNonDependent(buildorder, children)
    idx++
  }
  return buildorder
}

function addNonDependent(
  buildorder: ProjectNode[],
  nodes: ProjectNode[]
): void {
  for (const node of nodes) {
    if (node.getNumberDependencies() > 0) continue
    buildorder.push(node)
  }
}
