class ProjectNode {
  private name: string
  private children: Array<ProjectNode>
  private map: Map<string, ProjectNode>
  private numberOfDenependcies: number
  constructor(name: string) {
    this.name = name
    this.children = []
    this.map = new Map()
    this.numberOfDenependcies = 0
  }

  addChild(node: ProjectNode): void {
    if (this.map.has(node.getName())) return

    this.map.set(node.getName(), node)
    this.children.push(node)

    node.changeNumberOfDependencies(1)
  }
  getChildren(): ProjectNode[] {
    return this.children
  }
  getName(): string {
    return this.name
  }

  getNumberOfDependencies(): number {
    return this.numberOfDenependcies
  }

  changeNumberOfDependencies(delta: number): void {
    this.numberOfDenependcies += delta
  }
}

class DependencyGraph {
  private nodes: Array<ProjectNode>
  private map: Map<string, ProjectNode>
  constructor() {
    this.nodes = []
    this.map = new Map()
  }

  getOrCreateNode(name: string): ProjectNode {
    if (!this.map.has(name)) {
      const node = new ProjectNode(name)
      this.map.set(name, node)
      this.nodes.push(node)
    }

    return this.map.get(name)
  }

  addEdge(from: string, to: string): void {
    let start = this.getOrCreateNode(from)
    let end = this.getOrCreateNode(to)
    start.addChild(end)
  }

  getNodes(): ProjectNode[] {
    return this.nodes
  }
}

// class ProjectNode {
//   private name: string
//   private children: Array<ProjectNode>
//   private map: Map<string, ProjectNode>
//   private dependencies: number
//   constructor(name: string) {
//     this.name = name
//     this.children = []
//     this.map = new Map()
//     this.dependencies = 0
//   }

//   addNeighbor(node: ProjectNode): void {
//     if (this.map.has(node.getName())) return

//     this.children.push(node)
//     this.map.set(node.getName(), node)
//     node.changeDependencies(1)
//   }

//   changeDependencies(delta: number): void {
//     this.dependencies += delta
//   }

//   getName(): string {
//     return this.name
//   }
//   getChildren(): ProjectNode[] {
//     return this.children
//   }
//   getNumberOfDependencies(): number {
//     return this.dependencies
//   }
// }

// class DependencyGraph {
//   private nodes: Array<ProjectNode>
//   private map: Map<string, ProjectNode>
//   constructor() {
//     this.nodes = []
//     this.map = new Map()
//   }

//   getOrCreateNode(name: string) {
//     if (this.map.has(name)) return this.map.get(name)

//     const node = new ProjectNode(name)
//     this.nodes.push(node)
//     this.map.set(name, node)
//   }

//   addEdge(from: string, to: string): void {
//     const start = this.getOrCreateNode(from)
//     const end = this.getOrCreateNode(to)
//     start.addNeighbor(end)
//   }

//   getNodes(): ProjectNode[] {
//     return this.nodes
//   }
// }

export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): ProjectNode[] {
  const graph = buildGraph(projects, dependencies)
  graph.getNodes().forEach((item) =>
    console.log(
      item.getName(),
      item.getNumberOfDependencies(),
      ':',
      item.getChildren().map((item) => item.getName())
    )
  )
  return order(graph.getNodes())
}

function order(nodes: ProjectNode[]): ProjectNode[] {
  const order: ProjectNode[] = []
  addNonDependent(nodes)

  let idx = 0
  while (idx < order.length) {
    const curr = order[idx]
    const children = curr.getChildren()
    for (const child of children) {
      child.changeNumberOfDependencies(-1)
    }
    addNonDependent(children)
    idx++
  }

  return order

  function addNonDependent(nodes: ProjectNode[]): void {
    for (const node of nodes) {
      if (node.getNumberOfDependencies() !== 0) continue
      order.push(node)
    }
  }
}

function buildGraph(
  projects: string[],
  dependencies: string[][]
): DependencyGraph {
  const graph = new DependencyGraph()
  for (const project of projects) {
    graph.getOrCreateNode(project)
  }
  for (const [from, to] of dependencies) {
    graph.addEdge(from, to)
  }

  return graph
}

// export function findBuildOrder(
//   projects: string[],
//   dependencies: string[][]
// ): ProjectNode[] {
//   const graph = buildGraph(projects, dependencies)
//   console.log(
//     graph.getNodes().map((item) => ({
//       node: item.getName(),
//       dependencies: item.getChildren().map((item) => item.getName()),
//     }))
//   )
//   return orderProjects(graph.getNodes())
// }

// function buildGraph(
//   projects: string[],
//   dependencies: string[][]
// ): DependencyGraph {
//   const graph = new DependencyGraph()
//   for (const project of projects) graph.getOrCreateNode(project)
//   for (const dependency of dependencies)
//     graph.addEdge(dependency[0], dependency[1])
//   return graph
// }

// function orderProjects(projects: ProjectNode[]): ProjectNode[] {
//   const order: ProjectNode[] = []
//   let endOfList = addNonDependent(order, projects, 0)
//   console.log(`endOfList: ${endOfList}`)
//   console.log(order.map((item) => item.getName()))

//   let toBeProecessed = 0
//   while (toBeProecessed < order.length) {
//     console.log(`loop: (${toBeProecessed} / ${order.length})`)
//     console.log(
//       '\t',
//       order.map((item) => item.getName())
//     )
//     console.log(`\tendOfList: ${endOfList}`)

//     const curr = order[toBeProecessed]
//     if (!curr) return null
//     console.log(
//       `\tcurr: ${curr.getName()} children: [${curr
//         .getChildren()
//         .map((item) => item.getName())}]`
//     )

//     const children = curr.getChildren()
//     for (const child of children) child.changeDependencies(-1)
//     endOfList = addNonDependent(order, children, endOfList)
//     toBeProecessed++
//   }

//   return order

//   function addNonDependent(
//     order: ProjectNode[],
//     projects: ProjectNode[],
//     offset: number
//   ): number {
//     console.log('\t\thelper: ')
//     for (const project of projects) {
//       if (project.getNumberOfDependencies() !== 0) continue
//       console.log(`\t\tdecrement child node "${project.getName()}" by 1`)
//       order[offset] = project
//       offset++
//     }
//     return offset
//   }
// }
