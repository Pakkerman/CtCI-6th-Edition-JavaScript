// String Compression: Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2blc5a3. If the "compressed"string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a - z).

// Compressed string will have char followed by number to represent the number of time char will appear consecutively

function strCompression(str: string): string {
  let out: string[] = []
  let counter = 1
  for (let i = 0; i < str.length; i++) {
    const curr = str[i]
    if (curr === str[i + 1]) {
      counter++
    } else {
      out.push(curr, counter + '')
      counter = 1
    }
    if (out.length > str.length) return str
  }

  return out.join('')
}

console.log(strCompression('aabcccccaaa'))
console.log(strCompression('abcde'))
