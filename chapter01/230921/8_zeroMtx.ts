// Only need to track what row has a zero and what col has zero,
// Init 2 array to keep track of the zero-ed row and column
// We dont use a matrix to keep track and flip that new matrix, because that would require O(MN) space, while O(M + N) is much smaller space
// After scan the matrix, we can go through each row and col and modify the mtx

function zeroMtx1(mtx: (string | number)[][]): boolean {
  const zeroRows: boolean[] = new Array(mtx.length).fill(false)
  const zeroCols: boolean[] = new Array(mtx[0].length).fill(false)

  // scan and record row and col that contain 0
  for (let y = 0; y < mtx.length; y++) {
    for (let x = 0; x < mtx[y].length; x++) {
      if (mtx[y][x] !== 0) continue
      zeroRows[y] = true
      zeroCols[x] = true
    }
  }

  // Set the rows that contains 0 all to 0
  for (let y = 0; y < zeroRows.length; y++) {
    if (!zeroRows[y]) continue
    for (let x = 0; x < zeroCols.length; x++) {
      mtx[y][x] = 0
    }
  }

  // set the cols that contains 0 all to 0
  for (let x = 0; x < zeroCols.length; x++) {
    if (!zeroCols[x]) continue
    for (let y = 0; y < zeroRows.length; y++) {
      matrix[y][x] = 0
    }
  }
}

// using constent space, achieve by using the first row and first col as tracker
//  - go through first row and scan all cols, if there's a zero, set to 0
//  - go through first col and scan all rows, if there's a zero, set to 0

function zeroMtx2(mtx: (number | string)[][]): boolean {
  let zeroInFirstRow = false
  let zeroInFirstCol = false

  for (let y = 0; y < mtx.length; y++) {
    if (mtx[y][0] !== 0) continue
    zeroInFirstCol = true
    break
  }
  for (let x = 0; x < mtx.length; x++) {
    if (mtx[0][x] !== 0) continue
    zeroInFirstRow = true
    break
  }

  for (let y = 1; y < mtx.length; y++) {
    for (let x = 1; x < mtx[y].length; x++) {
      if (mtx[y][x] !== 0) continue
      mtx[0][x] = 0
      mtx[y][0] = 0
    }
  }

  for (let y = 1; y < mtx.length; y++) {
    if (mtx[y][0] !== 0) continue
    for (let x = 1; x < mtx[y].length; x++) {
      mtx[y][x] = 0
    }
  }

  for (let x = 1; x < mtx[0].length; x++) {
    if (mtx[0][x] !== 0) continue
    for (let y = 1; y < mtx.length; y++) {
      mtx[y][x] = 0
    }
  }

  if (zeroInFirstRow) for (let x = 0; x < mtx[0].length; x++) mtx[0][x] = 0
  if (zeroInFirstCol) for (let y = 0; y < mtx.length; y++) mtx[y][0] = 0

  return true
}

const matrix = [
  [7, 3, 2, 9, 1],
  [6, 5, 0, 8, 4],
  [0, 3, 8, 2, 9],
  [1, 4, 7, 6, 8],
  [5, 1, 3, 1, 2],
  [9, 7, 6, 4, 5],
  [8, 2, 5, 1, 3],
  [0, 6, 9, 7, 0],
  [2, 8, 1, 5, 6],
  [3, 5, 4, 3, 7],
]
zeroMtx2(matrix)
// matrix.forEach((item) => console.log(item))
