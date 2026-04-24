class Solution {
  /**
   * @param {string[]} strs
   * @return {string[][]}
   */

  // we are given an array of strings
  // we have to determine what strings are anagrams of eachother and group them into a new array
  // the trick to this problem is understanding that words that are anagrams of eachother:
  // - have the same unique letters
  // - have those unique letters at the same frequency (same number of each unique letters)

  // we should loop the given array
  // for each value we should determine what letters they contain and at what frequency (tracking each strings values)
  // we can then bucket sort the map of values, and turn that into a group id for that anagram

  groupAnagrams(strs) {
    let anagramIds = {};

    for (let i = 0; i < strs.length; i++) {
      let counter = new Array(26).fill(0);

      for (let j = 0; j < strs[i].length; j++) {
        counter[strs[i][j].charCodeAt(0) - "a".charCodeAt(0)]++;
      }

      let groupId = counter.toString();

      if (!anagramIds[groupId]) {
        anagramIds[groupId] = [strs[i]];
      } else {
        anagramIds[groupId].push(strs[i]);
      }
    }

    return Object.values(anagramIds);
  }
}
