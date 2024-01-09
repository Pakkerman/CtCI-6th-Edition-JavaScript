import { DependencyGraph, ProjectNode } from '../util/DependencyGraph'

// Steps
//    Build Graph
//    order the graph and output the build order
export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): ProjectNode[] {
  const graph = buildGraph(projects, dependencies)
  return orderProjects(graph.getNodes())
}

// build out the graph with project and dependencies input
//    init new graph
//    insert project nodes
//    connect edges using dependencies
function buildGraph(
  projects: string[],
  dependencies: string[][]
): DependencyGraph {
  const graph = new DependencyGraph()
  for (const item of projects) graph.getOrCreateNode(item)
  for (const item of dependencies) graph.addEdge(item[0], item[1])
  return graph
}
// orderProjects stpes:
//    init output
//    init a number that will point to index of the last item's next
//    init a pointer for the point to the node that needs to be process
//    loop through, while the toBeProcessed is less than res.length
//    getting children of the curr, and because we are going add this curr to the build order, so curr's edges, i.i.e., children's dependencies should be decrement, because they are no longer depending on curr, because curr will be built. Removing dependencies one at a time, until child, in iteration in the future, will become non dependent. We'll repeat until curr is the same is buildorder.length (idx at the end will point to undefined, but that is okay, because the condition is currIdx < buildorder.length, when currIdx === buildorder.length it is false, and the while loop ends.)
function orderProjects(projects: ProjectNode[]): ProjectNode[] {
  const buildOrder: ProjectNode[] = []
  let tail = addNonDependent(buildOrder, projects, 0)
  let idx = 0

  while (idx < buildOrder.length) {
    const curr = buildOrder[idx]
    const children = curr.getChildren()
    for (const item of children) item.decremenetDependencies()
    tail = addNonDependent(buildOrder, children, tail)
    idx++
  }

  return buildOrder
}

// this function will go through the projects and find all projects that doesnt has any dependencies,
// return a number to offset pointer to res, while pushing empty dependent nodes to order
function addNonDependent(
  buildorder: ProjectNode[],
  projectList: ProjectNode[],
  tail: number
): number {
  for (const item of projectList) {
    if (item.getNumberDependencies() > 0) continue
    buildorder.push(item)
    tail++
  }

  return tail
}
