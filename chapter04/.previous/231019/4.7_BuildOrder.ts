import { DependencyGraph, ProjectNode } from '../../util/DependencyGraph'

export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): ProjectNode[] {
  const graph = buildGraph(projects, dependencies)
  return orderProjects(graph.getNodes())
}

function buildGraph(
  projects: string[],
  dependencies: string[][]
): DependencyGraph {
  const graph = new DependencyGraph()
  for (const project of projects) {
    graph.getOrCreateNode(project)
  }
  for (const dependency of dependencies) {
    graph.addEdge(dependency[0], dependency[1])
  }
  return graph
}

function orderProjects(projects: ProjectNode[]): ProjectNode[] {
  const buildorder: ProjectNode[] = []
  addNonDependent(buildorder, projects)
  let idx = 0
  while (idx < buildorder.length) {
    const curr = buildorder[idx]
    const children = curr.getChildren()
    for (let child of children) child.decremenetDependencies()
    addNonDependent(buildorder, children)
    idx++
  }

  return buildorder
}

function addNonDependent(
  buildorder: ProjectNode[],
  projectList: ProjectNode[]
): void {
  for (const project of projectList) {
    if (project.getNumberDependencies() > 0) continue
    buildorder.push(project)
  }
}
