import { BST, TreeNode } from '../../util/BST'
import { SinglyLinkedList } from '../../util/SinglyLinkedList'
import { blue, yellow, green } from '../../util/ConsoleColors'

//        50
//     20    60
//  10   25    70
// 5 15      65  80
// const tree = new BST([50, 20, 60, 10, 25, 70, 5, 15, 65, 80])
const tree = new BST([5, 2, 6, 1])
const out = allSequences(tree.root)
console.log(
  'restult: ',
  out.map((item) => item.getPrintList())
)

function allSequences(
  node: TreeNode<number> | undefined,
  indent: string = ''
): SinglyLinkedList<number>[] {
  console.log(indent, blue, `@ fn (node: ${node?.value})`)
  const out: SinglyLinkedList<number>[] = []

  indent += '  '
  console.log(indent, yellow, `BASECASE`)
  if (!node) {
    out.push(new SinglyLinkedList<number>())
    console.log(indent.slice(0, indent.length - 2), yellow, `^ return`)
    return out
  }

  const prefix = new SinglyLinkedList<number>()
  prefix.append(node.value)

  console.log(indent, yellow, `RECURSE LEFT`)
  const leftSeq = allSequences(node.left, indent)
  console.log(indent, yellow, `RECURSE RIGHT`)
  const rightSeq = allSequences(node.right, indent)

  console.log(indent, yellow, `POST RECURSE: WEAVING`)

  console.log(
    indent,
    yellow,
    `leftSeq: [${leftSeq.map((item) => item.getPrintList())}]`
  )
  console.log(
    indent,
    yellow,
    `rightSeq: [${rightSeq.map((item) => item.getPrintList())}]`
  )
  console.log(indent, green, `ENTER FORLOOP`)
  for (const left of leftSeq) {
    for (const right of rightSeq) {
      const weaved: SinglyLinkedList<number>[] = []
      weaveLists(left, right, weaved, prefix, indent)
      out.push(...weaved)
      console.log(
        indent,
        `pushing [${weaved.map((item) => `[${item.getPrintList()}]`)}] to out `
      )
    }
  }
  console.log(indent, green, `END FORLOOP`)

  console.log(
    indent,
    yellow,
    `out: [${out.map((item) => `[${item.getPrintList()}]`)}]`
  )
  console.log(indent.slice(0, indent.length - 2), yellow, `^ return`)
  return out
}

function weaveLists(
  left: SinglyLinkedList<number>,
  right: SinglyLinkedList<number>,
  weaved: SinglyLinkedList<number>[],
  prefix: SinglyLinkedList<number>,
  indent: string
): void {
  console.log(
    indent,
    blue,
    `@ weaveLists (left: [${left.getPrintList()}], right: [${right.getPrintList()}], weaved: [${weaved.map(
      (item) => `[${item.getPrintList()}]`
    )}], prefix: [${prefix.getPrintList()}]))`
  )
  if (left.length === 0 || right.length === 0) {
    const out = prefix.cloneList()
    for (let i = 0; i < left.length; i++) {
      const item = left.get(i)
      if (item) out.append(item)
    }

    for (let i = 0; i < right.length; i++) {
      const item = right.get(i)
      if (item) out.append(item)
    }
    weaved.push(out)
    console.log(indent, yellow, `^ push to weaved [${out.getPrintList()}]`)
    return
  }

  const leftHead = left.removeAtHead()

  prefix.append(leftHead!)
  weaveLists(left, right, weaved, prefix, indent)
  prefix.removeAtTail()
  left.prepend(leftHead!)

  const rightHead = right.removeAtHead()
  prefix.append(rightHead!)
  weaveLists(left, right, weaved, prefix, indent)
  prefix.removeAtTail()
  right.prepend(rightHead!)
}

function generateAllWeavedLists(a: number[], b: number[]): number[][] {
  const out: number[][] = []

  function recurse(
    a: number[],
    b: number[],
    curr: number[] = [],
    indent: string = ''
  ) {
    console.log(
      indent,
      blue,
      `@ Fn (a: [${a.length ? a : 'na'}], b: [${b.length ? b : 'na'}], curr: [${
        curr.length ? curr : 'na'
      }])`
    )
    indent += '  '
    console.log(indent, yellow, `BASECASE`)
    console.log(
      indent,
      green,
      `(a.length === 0 && b.length === 0) => ${
        a.length === 0 && b.length === 0
      }`
    )
    if (a.length === 0 || b.length === 0) {
      out.push([...curr, ...a, ...b])
      console.log(indent, `$ Push [${[...curr, ...a, ...b]}] to out, return`)
      return
    }

    if (a.length > 0) {
      const newPrefix = [...curr, a[0]]
      console.log(indent, yellow, `RECURSE A`)
      recurse(a.slice(1), b, newPrefix, indent)
    }

    if (b.length > 0) {
      const newPrefix = [...curr, b[0]]
      console.log(indent, yellow, `RECURSE B`)
      recurse(a, b.slice(1), newPrefix, indent)
    }
  }

  recurse(a, b)
  return out
}

// Example usage:
// const list1 = [1, 2]
// const list2 = [4, 5]

// const allWeavedLists = generateAllWeavedLists(list1, list2)
// console.log(allWeavedLists)
