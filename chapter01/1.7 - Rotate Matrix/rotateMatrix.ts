function rotateMatrix(matrix: number[][]): boolean {
  if (matrix.length === 0) return false
  if (matrix.length !== matrix[0].length) return false

  const n = matrix.length

  for (let layer = 0; layer < n / 2; layer++) {
    let first = layer
    let last = n - 1 - layer

    for (let i = first; i < last; i++) {
      let offset = i - first
      let top = matrix[first][i]
      matrix[first][i] = matrix[last - offset][first]
      matrix[last - offset][first] = matrix[last][last - offset]
      matrix[last][last - offset] = matrix[i][first]
      matrix[i][last] = top
    }
  }

  return true
}

const matrix = [
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

rotateMatrix(matrix)
console.log(matrix)
