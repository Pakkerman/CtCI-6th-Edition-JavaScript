// export type Graph = Array<GraphNode>
// export type GraphNode = { to: Array<number>; weight: Array<number> }

// // GraphA
// //    1 - 2
// //   /  /
// // 0   /    5
// //  \ /
// //   3 - 4

// export const graphA: Graph = [
//   { to: [1, 3], weight: [] },
//   { to: [0, 2], weight: [] },
//   { to: [0, 2, 4], weight: [] },
//   { to: [3], weight: [] },
//   { to: [], weight: [] },
// ]

//

export class GraphNode {
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

export class Graph {
  public length: number
  public root: GraphNode
  private nodeMap: Map<string | number, GraphNode>
  constructor(initialValue: number | string) {
    this.length = 0
    this.root = new GraphNode('root')
    this.nodeMap = new Map()
    this.nodeMap.set('root', this.root)
    this.createNode(initialValue)
    this.addEdgeToNode(this.root, initialValue)
  }

  createNode(value: string | number): void {
    const node = new GraphNode(value)
    this.length++
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

  getNodeList(): GraphNode[] {
    const out: GraphNode[] = []
    for (const node of this.nodeMap.values()) {
      if (node.value === 'root') continue
      out.push(node)
    }
    return out
  }

  printmap(): void {
    for (const node of this.nodeMap.values()) {
      const edgeList = node.to.map((item) => item.value)
      console.log(node.value, edgeList)
    }
  }
}

export const buildGraph = new Graph('a')
buildGraph.createNode('b')
buildGraph.createNode('c')
buildGraph.createNode('d')
buildGraph.createNode('e')
buildGraph.createNode('f')
buildGraph.addEdgeToNode('a', 'd')
buildGraph.addEdgeToNode('f', 'b')
buildGraph.addEdgeToNode('b', 'd')
buildGraph.addEdgeToNode('f', 'a')
buildGraph.addEdgeToNode('d', 'c')
buildGraph.printmap()
