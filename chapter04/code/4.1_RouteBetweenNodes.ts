// Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
// Hints: #127

// Either a BFS or DFS is fine in this case.

export class GraphNode {
  value: number
  to: number[]
  constructor(value: number) {
    this.value = value
    this.to = []
  }
}

export class Graph {
  root: GraphNode
  private nodes: Map<number, GraphNode>

  constructor() {
    this.root = new GraphNode(Infinity)
    this.nodes = new Map()
  }

  addNode(value: number): void {
    const node = new GraphNode(value)
    this.nodes.set(value, node)
  }

  addEdges(start: number, targets: number[]): void {
    if (!start) this.addNode(start)
    let node = this.nodes.get(start)!
    node.to.push(...targets)
  }

  printNodes(): void {
    for (const node of this.nodes.values()) {
      console.log(node)
    }
  }

  getGraphList(): number[][] {
    const out: number[][] = []
    for (const node of this.nodes.values()) out.push(node.to)
    return out
  }
}

export function isConnectedDFS(
  start: number,
  end: number,
  graph: Graph
): boolean {
  const graphlist = graph.getGraphList()
  const seen: boolean[] = new Array(graph.getGraphList().length).fill(false)
  return recurse(start)

  function recurse(curr: number): boolean {
    if (seen[curr]) return false

    seen[curr] = true
    if (curr === end) return true

    for (let edge of graphlist[curr]) if (recurse(edge)) return true
    return false
  }
}

export function isConnectedBFS(
  start: number,
  end: number,
  graph: Graph
): boolean {
  const graphlist = graph.getGraphList()
  const queue: number[] = [start]
  const seen: boolean[] = new Array(graphlist.length).fill(false)

  while (queue.length) {
    const curr = queue.shift()
    seen[curr] = true
    if (curr === end) return true

    for (const edge of graphlist[curr]) {
      if (seen[edge]) continue
      queue.push(edge)
    }
  }

  return false
}
