import { BST, TreeNode } from '../../util/BST'

//   2
// 1   3
const tree = new BST()
tree.insertNode(2)
tree.get(2)!.left = new TreeNode(1)
tree.get(2)!.right = new TreeNode(3)

function sequences<T>(root: TreeNode<T>): Array<Array<T>> {}

if (tree.root) console.log(sequences(tree.root))
