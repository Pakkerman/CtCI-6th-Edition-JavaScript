// 1.9 String Rotation: Assume you have a method isSubstring() which checks ifone word is a substring of another. Given two strings, 51 and 52, write code to check if 52 is a rotation of 51 using only one call to isSubstring (e.g., waterbottle a rotation erbottlewat).

// intuition:
//  Use two pointer that one is going from 0 to last in the first string,
//  Second point that will find the first matching char first, then sync with first point and then walk until the first point is at the end
// In any point two pointed char is mismatched, we'll return false
// maybe keep track where the second pointer has started, if ther first time it start the process might be there is a duplicate character in the string, make sure that all charactor is checked

function stringRotation
