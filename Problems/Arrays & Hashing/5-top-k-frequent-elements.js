class Solution {
  /**
   * @param {number[]} nums
   * @param {number} k
   * @return {number[]}
   */

  // we are given an array of integers, and an integer representing the number of unique integers to be returned
  // we are tasked to find the "k" most frequent integers and return them

  // we have to loop through the given array
  // for each value:
  // - we need to track each value (in a map)
  // - we need to track the frequency
  // then we need to sort the mapped values by the frequency in which they occur
  // - we can use a bucket array to do this, with the elements representing the possible frequencies
  // - simply use a for in loop to loop through the object's keys(unique numbers), and look at their frequency
  // - store the key as a value in the counter array in the relative frequency
  // - since multiple unique numbers can have to same frequency, we need to store them within an array
  // once we have finished ordering the unique numbers by frequency, we can loop backwards through the array
  // - we return the values one by one in each internal array
  // - we increment a counter each time we push a new value into the output array
  // - once the counter = k, we have finished
  // - return the output array

  topKFrequent(nums, k) {
    let output = [];
    let map = {};

    for (let val of nums) {
      map[val] = (map[val] || 0) + 1;
    }

    let buckets = Array.from({ length: nums.length + 1 }, () => []);

    for (let key in map) {
      buckets[map[key]].push(Number(key));
    }

    for (let i = buckets.length - 1; i >= 0 && output.length < k; i--) {
      for (let val of buckets[i]) {
        if (output.length === k) break;
        output.push(val);
      }
    }

    return output;
  }
}

// Common Mistakes:

// I used the wrong length for the buckets array:
// - you need it to be nums.length+1
// - this is so the frequency you track for each element corresponds accurately to the bucket array elements
// - if not, you will be off one in scenarios where you have the max freequency (1 unique value)
// - [0,0,0] -> if this is your bucket array, the largest index is 2
// - so if you have a frequency of 3 e.g. [1, 1, 1], you have no where to store it without extra work e.g. map[key - 1]
// - either do the extra work in the length or in the key area

// I used "new Array(nums.length + 1).fill([])""
// - this actually creates an array of arrays that have the same reference
// - so every element in the outer array is the same array, changing one changes all
// - instead we need to use "Array.from({length: nums.length + 1}, () => []);
// - .from method takes 2 arguments in this case:
// --> an object that has the desired length as a key-value pair
// --> a map function that can take the value of its current iteration and perform work on it and return it into the array
// since our array is new and empty, we just defined the length, and instruct the map function to return;
// an empty array for every index of the main array

// I did not use the count < k as a condition in the j loop, i did it in the "i" loop
// - this means that we can fully loop through an inner array even when we have hit the k value cap
// - this causes us to potentially have extra elements in our output array
// - need to loop through the inner array fully while also checking that our count < k
// - once count = k our j loop will detect it
// - we can probably just use a while loop for our i and also check for the same condition
// - Or we can just include the count < k condition within our existing for loop for i

// The object keys are strings, we need to convert them into integers when pushing into the ouput array
// - this doesnt cause the tests to fail, but in general its a good practice
// - unless you are specifically needing the array to have values that are strings, then of course leave it
// - can use parseInt() to do this but using Number() is prefered  (edge case like '08')

// A style improvement:
// - count isnt really needed, it does make things slightly readable
// - however we can just use the output length within the loop conditions and it would serve the same purpose

//Another:
// - instead of our j loop, we could also do a more modern version seen below

// for (let num of buckets[i]) {
//     if (output.length === k) break;
//     output.push(num);
// }
