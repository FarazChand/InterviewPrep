class Solution {
  /**
   * @param {number[]} nums
   * @return {number[]}
   */

  // we are given an array of integers
  // we have to return an array where each index is the product of all the elements of the given array except its own index number
  // we are challenged to solve it in O(n) time without using the division operation
  // we are also challenged to do this using one array for memory

  // the trick to this problem is understanding that the product in this specific scenario is the prefix * postfix
  // prefix being the product of all the numbers before the current index, and postfix being the product of all the nubmers that come after

  // we can create an output array
  // we can also create a prefix and postfix variable with the default value of 1
  // loop through the given array, for each index:
  // - multiply the prefix by the current index value to get the prefix of the next index
  // - store that prefix in its respective index of the output array (creating an array of prefixes)
  // - update the prefix to the current prefix value
  // loop through the output array backwards
  // - find the output value of the current index using the postfix * the prefix
  // - update the postfix
  // return once loop is complete and output array is filled with correct products

  productExceptSelf(nums) {
    let output = [];
    let prefix = 1;
    let postfix = 1;

    // ouput.push(prefix);

    // [1,2,3,4]
    // [1, 1, 2, 6] 24
    // [1,1,2,6]
    // [24,12,8,6]
    for (let i = 0; i < nums.length; i++) {
      // first we store the current prefix, then we update it
      // this results in having the prefix for each index of the given array stored in the respective index of the output array

      output.push(prefix);
      prefix *= nums[i];
    }

    for (let i = output.length - 1; i >= 0; i--) {
      // we get the product of prefix and post fix and insert it into the array
      // we then update the prefix and continue to the next iteration

      output[i] *= postfix;
      postfix *= nums[i];
    }

    return output;
  }
}
