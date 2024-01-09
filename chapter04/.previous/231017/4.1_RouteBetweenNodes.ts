// Route Between Nodes: Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
// Hints: #127

// Either a BFS or DFS is fine in this case.

type Graph = Array<GraphNode>
type GraphNode = {
  to: Array<number>
  weight: Array<number>
}

export function isConnectedDFS(
  start: number,
  end: number,
  graph: Graph
): boolean {
  const path: number[] = []
  const seen: boolean[] = new Array(graph.length).fill(false)
  return traverse(start)

  function traverse(curr: number): boolean {
    if (seen[curr]) return false
    path.push(curr)
    seen[curr] = true

    if (curr === end) return true

    const list = graph[curr].to
    for (let i = 0; i < list.length; i++) {
      const edge = list[i]
      if (traverse(edge)) return true
    }

    path.pop()
    return false
  }
}

export function isConnectedBFS(
  start: number,
  end: number,
  graph: Graph
): boolean {
  const queue: number[] = [start]
  const seen: boolean[] = new Array(graph.length).fill(false)

  while (queue.length) {
    const curr = queue.shift()
    if (curr === undefined) continue
    seen[curr] = true
    const list = graph[curr].to
    for (let i = 0; i < list.length; i++) {
      const edge = list[i]
      if (edge === end) return true
      if (seen[edge]) continue
      queue.push(edge)
    }
  }

  return false
}
