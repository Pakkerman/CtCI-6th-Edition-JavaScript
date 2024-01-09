export class DependencyGraph {
  private nodes: Array<ProjectNode>
  private map: Map<string, ProjectNode>
  constructor() {
    this.nodes = []
    this.map = new Map()
  }

  getOrCreateNode(name: string): ProjectNode {
    if (!this.map.has(name)) {
      const node = new ProjectNode(name)
      this.nodes.push(node)
      this.map.set(name, node)
    }
    return this.map.get(name)!
  }

  addEdge(startName: string, endName: string): void {
    const start = this.getOrCreateNode(startName)
    const end = this.getOrCreateNode(endName)
    start.addNeighbor(end)
  }

  getNodes(): ProjectNode[] {
    return this.nodes
  }

  listNodes(): [name: string, children: string[]][] {
    return this.nodes.map((item) => [
      item.getName(),
      item.getChildren().map((child) => child.getName()),
    ])
  }
}

export class ProjectNode {
  private children: ProjectNode[]
  private map: Map<string, ProjectNode>
  private name: string
  private dependencies: number
  constructor(name: string) {
    this.name = name
    this.children = []
    this.map = new Map()
    this.dependencies = 0
  }

  addNeighbor(node: ProjectNode): void {
    if (this.map.has(node.getName())) return
    this.children.push(node)
    this.map.set(node.getName(), node)
    node.incremenetDependencies()
  }

  incremenetDependencies(): void {
    this.dependencies++
  }
  decremenetDependencies(): void {
    this.dependencies--
  }

  getChildren(): ProjectNode[] {
    return this.children
  }

  getName(): string {
    return this.name
  }

  getNumberDependencies(): number {
    return this.dependencies
  }
}
