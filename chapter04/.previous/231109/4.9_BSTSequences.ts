import { BST, TreeNode } from '../util/BST'
import { SinglyLinkedList } from '../util/SinglyLinkedList'
import { blue, yellow, green } from '../util/ConsoleColors'

//        50
//     20    60
//  10   25    70
// 5 15      65  80
// const tree = new BST([50, 20, 60, 10, 25, 70, 5, 15, 65, 80])
// const tree = new BST([5, 2, 7, 1, 3, 6, 9])

export function allSequences(
  node: TreeNode<number> | undefined,
  indent: string = ''
): SinglyLinkedList<number>[] {
  console.log(indent, blue, `fn(${node?.value})`)
  const result: SinglyLinkedList<number>[] = []
  indent += '  '
  console.log(indent, green, `BASECASE`)
  if (!node) {
    result.push(new SinglyLinkedList<number>())
    console.log(indent, green, `< push to result, RETURN`)
    return result
  }

  const prefix = new SinglyLinkedList<number>()
  prefix.append(node.value)
  console.log(indent, `prefix > [${prefix.getPrintList()}]`)

  console.log(indent, yellow, `RECURSE left`)
  const leftSeq = allSequences(node.left, indent)
  console.log(indent, yellow, `RECURSE right`)
  const rightSeq = allSequences(node.right, indent)

  console.log(
    indent,
    yellow,
    `POST ORDER: leftSeq: [${leftSeq.map((item) =>
      item.getPrintList()
    )}], rightSeq: [${rightSeq.map((item) => item.getPrintList())}]`
  )
  for (const left of leftSeq) {
    for (const right of rightSeq) {
      const weaved: SinglyLinkedList<number>[] = []
      weaveLists(left, right, weaved, prefix, indent)
      result.push(...weaved)
    }
  }

  result.forEach((item) => console.log(indent, `[${item.getPrintList()}]`))
  console.log(indent, blue, '< RETURN RESULT')
  return result
}

function weaveLists(
  first: SinglyLinkedList<number>,
  second: SinglyLinkedList<number>,
  results: SinglyLinkedList<number>[],
  prefix: SinglyLinkedList<number>,
  indent: string
): void {
  console.log(
    indent,
    blue,
    `weave(first: [${first.getPrintList()}], second: [${second.getPrintList()}], prefix: ${prefix.getPrintList()})`
  )
  indent += '  '
  console.log(indent, yellow, 'BASECASE')
  if (first.length === 0 || second.length === 0) {
    const result = prefix.cloneList()
    let idx = 0
    while (idx < first.length) result.append(first.get(idx++)!)
    idx = 0
    while (idx < second.length) result.append(second.get(idx++)!)
    results.push(result)
    console.log(
      indent,
      `push to results, results: ${results.map((item) => item.getPrintList())}`
    )
    console.log(indent, blue, '< RETURN')
    return
  }

  console.log(indent, yellow, 'RECURSE first')
  const firstHead = first.removeAtHead()!
  prefix.append(firstHead)
  weaveLists(first, second, results, prefix, indent)
  prefix.removeAtTail()
  first.prepend(firstHead)

  console.log(indent, yellow, 'RECURSE second')
  const secondHead = second.removeAtHead()!
  prefix.append(secondHead)
  weaveLists(first, second, results, prefix, indent)
  prefix.removeAtTail()
  second.prepend(secondHead)
}
