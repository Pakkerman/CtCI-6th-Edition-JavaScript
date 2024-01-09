import { DependencyGraph, ProjectNode } from '../util/DependencyGraph'

export function findBuildOrder(
  projects: string[],
  dependencies: string[][]
): ProjectNode[] {
  // Build Graph
  const graph: DependencyGraph = buildGraph(projects, dependencies)
  // order the graph and output the build order
  return orderProjects(graph.getNodes())
}

// build out the graph with project and dependencies input
function buildGraph(
  projects: string[],
  dependencies: string[][]
): DependencyGraph {
  // init new graph
  const graph = new DependencyGraph()
  // insert project nodes
  for (const item of projects) graph.getOrCreateNode(item)
  // connect edges using dependencies
  for (const item of dependencies) graph.addEdge(item[0], item[1])
  return graph
}

function orderProjects(projects: ProjectNode[]): ProjectNode[] {
  // init output
  const buildorder: ProjectNode[] = []
  // init a number that will point to index of the last item's next
  let tail = addNonDependent(buildorder, projects, 0)
  // init a pointer for the point to the node that needs to be process
  let idx = 0
  // loop through, while the toBeProcessed is less than res.length
  while (idx < buildorder.length) {
    //    set curr to be process
    const curr = buildorder[idx]
    const children = curr.getChildren()
    for (const item of children) item.decremenetDependencies()

    tail = addNonDependent(buildorder, children, tail)
    idx++

    //getting children of the curr, and because we are going add this curr to the build order, so curr's edges, i.i.e., children's dependencies should be decrement, because they are no longer depending on curr, because curr will be built. Removing dependencies one at a time, until child, in iteration in the future, will become non dependent. We'll repeat until curr is the same is buildorder.length (idx at the end will point to undefined, but that is okay, because the condition is currIdx < buildorder.length, when currIdx === buildorder.length it is false, and the while loop ends.)
  }
  return buildorder
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
