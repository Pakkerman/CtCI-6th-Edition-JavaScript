class DependencyGraph {
  map: Map<string, ProjectNode>
  constructor() {
    this.map = new Map()
  }

  getOrCreateNode(name: string): ProjectNode {
    let node = this.map.get(name)
    if (node) return node

    if (!node) node = new ProjectNode(name)
    this.map.set(name, node)
    return node
  }

  addEdge(from: string, to: string): void {
    const start = this.map.get(from)
    const end = this.map.get(to)
    start.addDependecy(end)
  }

  getNodes(): ProjectNode[] {
    const out: ProjectNode[] = []
    this.map.forEach((item) => out.push(item))
    return out
  }
}

class ProjectNode {
  name: string
  children: ProjectNode[]
  dependencies: number
  constructor(name: string) {
    this.name = name
    this.children = []
    this.dependencies = 0
  }

  addDependecy(node: ProjectNode): void {
    this.children.push(node)
    this.deltaDependencies(1)
  }

  deltaDependencies(delta: number): void {
    this.dependencies += delta
  }

  getChildren(): ProjectNode[] {
    return this.children
  }

  getName(): string {
    return this.name
  }
}

export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): ProjectNode[] {
  const graph = createGraph(projects, dependencies)
  return order(graph.getNodes())
}
function createGraph(
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
  addNonDependent(nodes, buildorder)

  let idx = 0
  while (idx < buildorder.length) {
    const curr = buildorder[idx]
    const children = curr.getChildren()
    for (const child of children) child.deltaDependencies(-1)
    addNonDependent(children, buildorder)
    idx++
  }

  return buildorder
}

function addNonDependent(
  nodes: ProjectNode[],
  buildorder: ProjectNode[]
): void {
  for (const item of nodes) {
    if (item.dependencies > 0) continue
    buildorder.push(item)
  }
}
