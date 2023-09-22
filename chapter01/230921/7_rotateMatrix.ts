function rotate(mtx: (string | number)[][]): boolean {
  if (mtx.length === 0 || mtx.length != mtx[0].length) return false

  const row = mtx.length
  for (let col = 0; col < row / 2; col++) {
    const x = col
    const y = row - 1 - col // y = 3 - 1 - 0 = 2
    for (let i = x; i < y; i++) {
      const offset = i - x // 0 - 0 = 0
      const tmp = mtx[x][i] // 0, 0
      mtx[x][i] = mtx[y - offset][x] // 0, 0 to (2 - 0, 0)
      mtx[y - offset][x] = mtx[y][y - offset] // (2, 0) to (0, y - 0)
      mtx[y][y - offset] = mtx[i][y]
      mtx[i][y] = tmp
    }
  }

  return true
}

const matrix = [
  [1, 1, 2],
  [4, 0, 2],
  [4, 3, 3],
]

rotate(matrix)
matrix.forEach((item) => console.log(item))
