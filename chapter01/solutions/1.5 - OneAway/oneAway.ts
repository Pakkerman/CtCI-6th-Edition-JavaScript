// 3 operations can be perform on a string
//  1. insert a character
//    - the length is +1 than the original
//    - run a length comparison
//  2. remove a character
//    - the length is -1 than the original
//    - run a length comparison
//  3. replace a character
//    - the length is the same, but only one character is change,
//    - run a character by character check

function onAway(str: string, edit: string): boolean {
  const diff = str.length - edit.length
  if (diff === 0) return checkEdited(str, edit)
  else if (diff === 1) return checkInsert(str, edit)
  else if (diff === -1) checkInsert(edit, str)
  return false
}

function checkEdited(str: string, edit: string): boolean {
  let diff = 0
  for (let i = 0; i < str.length; i++) {
    if (diff > 1) return false
    if (str[i] !== edit[i]) diff++
  }

  return true
}

function checkInsert(a: string, b: string): boolean {
  let idxA = 0
  let idxB = 0

  while (a[idxA] && b[idxB]) {
    if (a[idxA] === b[idxB]) {
      idxA++
      idxB++
      continue
    }
    if (idxA !== idxB) return false
    idxA++
  }

  return true
}

console.log(
  '',
  onAway('pale', 'ple') ? 'success: true' : 'fail: should be true',
  '\n',
  onAway('pales', 'pale') ? 'success: true' : 'fail: should be true',
  '\n',
  onAway('pale', 'bale') ? 'success: true' : 'fail: should be true',
  '\n',
  !onAway('pale', 'bake') ? 'success: false' : 'fail: should be false'
)
