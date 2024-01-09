// Build the graph

class GraphNode {
  public value: number | string
  public to: Array<GraphNode>
  public weight: number
  constructor(
    value: number | string,
    to: Array<GraphNode> = [],
    weight: number = 0
  ) {
    this.value = value
    this.to = to
    this.weight = weight
  }
}

class Graph {
  public root: GraphNode
  private nodeMap: Map<string | number, GraphNode>
  constructor(initialValue: number | string) {
    this.root = new GraphNode('root')
    this.nodeMap = new Map()
    this.nodeMap.set('root', this.root)
    this.createNode(initialValue)
    this.addEdgeToNode(this.root, initialValue)
  }

  createNode(value: string | number): void {
    const node = new GraphNode(value)
    this.nodeMap.set(value, node)
  }

  addEdgeToNode(
    from: string | number | GraphNode,
    target: string | number | GraphNode
  ): void {
    const node =
      from instanceof GraphNode
        ? (from as GraphNode)
        : this.nodeMap.get(from as number | string)
    if (!node) return

    const destination =
      target instanceof GraphNode
        ? (target as GraphNode)
        : this.nodeMap.get(target as number | string)

    if (!destination) return
    node.to.push(destination)
  }

  printmap(): void {
    for (const node of this.nodeMap.values()) {
      const edgeList = node.to.map((item) => item.value)
      console.log(node.value, edgeList)
    }
  }
}

const graph = new Graph('f')
graph.createNode('a')
graph.createNode('c')
graph.printmap()
