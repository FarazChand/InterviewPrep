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
    // creating the map to track each anagram group
    let anagramIds = {};

    // looping through the given array of words
    for (let i = 0; i < strs.length; i++) {
      // creating a counter array to count the frequency of each letter in the word
      let counter = new Array(26).fill(0);

      // looping through each letter of the word, determining what index of the counter array they belong to (0-25, a-z)
      for (let j = 0; j < strs[i].length; j++) {
        counter[strs[i][j].charCodeAt(0) - "a".charCodeAt(0)]++;
      }

      // converting the completed counter to a string that represents the anagram group ID so it can be used as an object key
      let groupId = counter.toString();

      // checking to see if the group ID already exists in the anagram group map
      // if it doesnt we create it -> an array with the current word inside of it
      //  If it does exist, we push the current word into it
      if (!anagramIds[groupId]) {
        anagramIds[groupId] = [strs[i]];
      } else {
        anagramIds[groupId].push(strs[i]);
      }
    }

    // we return an array of the object's values using the values method and passing the anagram group map
    return Object.values(anagramIds);
  }
}
