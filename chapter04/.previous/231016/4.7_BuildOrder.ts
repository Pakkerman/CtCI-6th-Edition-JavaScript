import { DependencyGraph, ProjectNode } from '../util/DependencyGraph'

export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): ProjectNode[] {
  const graph: DependencyGraph = buildGraph(projects, dependencies)
  return orderProjects(graph.getNodes())
}

// build out the graph with project and dependencies input
function buildGraph(
  projects: string[],
  dependencies: string[][]
): DependencyGraph {
  const graph = new DependencyGraph()
  for (const item of projects) graph.getOrCreateNode(item)
  for (const item of dependencies) graph.addEdge(item[0], item[1])
  return graph
}

function orderProjects(projects: ProjectNode[]): ProjectNode[] {
  const res: ProjectNode[] = []
  let endOfList = addNonDependent(res, projects, 0)
  let toBeProcessed = 0
  while (toBeProcessed < res.length) {
    const curr = res[toBeProcessed]
    if (curr == null) return []

    const children = curr.getChildren()
    for (const child of children) {
      child.decremenetDependencies()
    }
    endOfList = addNonDependent(res, children, endOfList)
    toBeProcessed++
  }

  return res
}

function addNonDependent(
  order: ProjectNode[],
  projects: ProjectNode[],
  offset: number
): number {
  for (const project of projects) {
    if (project.getNumberDependencies() === 0) {
      order[offset] = project
      offset++
    }
  }
  return offset
}
