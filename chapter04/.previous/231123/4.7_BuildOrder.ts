import { DependencyGraph, ProjectNode } from '../util/DependencyGraph'

type BuildOrder = Array<ProjectNode>

export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): BuildOrder {
  const graph = buildGraph(projects, dependencies)
  return orderProjects(graph.getNodes())
}
function buildGraph(
  projects: string[],
  dependencies: string[][]
): DependencyGraph {
  const graph = new DependencyGraph()
  for (const name of projects) graph.getOrCreateNode(name)
  for (const dependency of dependencies)
    graph.addEdge(dependency[0], dependency[1])
  return graph
}

function orderProjects(projects: ProjectNode[]): ProjectNode[] {
  const buildorder: ProjectNode[] = []
  addNonDependent(projects, buildorder)

  let idx = 0
  while (idx < projects.length) {
    const curr = buildorder[idx]
    const children = curr.getChildren()
    console.log(
      curr.getName(),
      children.map((item) => item.getName())
    )
    for (const child of children) {
      child.decremenetDependencies()
    }
    addNonDependent(children, buildorder)
    idx++
  }
  return buildorder
}

function addNonDependent(
  projectNodes: ProjectNode[],
  buildorder: ProjectNode[]
): void {
  for (const node of projectNodes) {
    if (node.getNumberDependencies() === 0) buildorder.push(node)
  }
}
