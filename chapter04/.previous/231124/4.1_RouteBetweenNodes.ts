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
  const list = graph.getGraphList()
  const seen: boolean[] = new Array(list.length).fill(false)
  return recurse(0)

  function recurse(curr: number): boolean {
    if (seen[curr]) return false

    seen[curr] = true
    for (const to of list[curr]) {
      if (to === end) return true
      if (recurse(to)) return true
    }

    return false
  }
}

export function isConnectedBFS(
  start: number,
  end: number,
  graph: Graph
): boolean {
  console.log(graph.getGraphList())
  const queue: number[] = [start]
  const seen: boolean[] = new Array(graph.getGraphList().length).fill(false)
  seen[start] = true

  while (queue.length) {
    const curr = queue.shift() as number
    seen[curr] = true

    if (curr === end) return true

    const list = graph.getGraphList()[curr]
    for (const to of list) {
      if (seen[to]) continue
      queue.push(to)
    }
  }

  return false
}
