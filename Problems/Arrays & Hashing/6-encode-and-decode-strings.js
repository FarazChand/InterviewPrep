class Solution {
  // we are given a list of strings that we need to encode into a single string
  // we are also tasked to decode the string we produced so that it returns to the array it was before

  // the trick to this is understanding what we need within a string to decode it into an array
  // once we know that, we can encode our string
  // in order to have enough information to decode the string, we need to know:
  // - the length of the string, we can use a number at the beginning of the string
  // - a delimiter - to signify the end of the number representing the length, and the start of the string
  // then when decoding we can use the delimiter to extract the length, and use that length to extract the string

  /**
   * @param {string[]} strs
   * @returns {string}
   */
  encode(strs) {
    let output = "";

    for (let i = 0; i < strs.length; i++) {
      output += `${strs[i].length}#${strs[i]}`;
    }

    return output;
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */
  decode(str) {
    let output = [];
    let i = 0;

    while (i < str.length) {
      let length = "";
      let j = i;

      while (str[j] != "#") {
        length += str[j];
        j++;
      }

      output.push(str.substring(j + 1, j + 1 + parseInt(length)));

      i = j + 1 + parseInt(length);
    }
    return output;
  }
}
