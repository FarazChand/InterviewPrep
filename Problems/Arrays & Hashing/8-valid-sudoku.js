class Solution {
  /**
   * @param {character[][]} board
   * @return {boolean}
   */

  // 9 x 9 grid, 9 rows, 9 columns, 9 3x3 internal squares
  // cannot have duplicates within any single row, column or square
  // need to track the values of each row, column and square
  // each 1x1 cell represents a value in a row, column and square

  // loop through external array that represents rows
  // loop through internal array that represents the column
  // check to see if the current value of the cell exists in its corresponding row/column/square
  // if it does, the board is not valid
  // if not, we can track the value in the respective maps
  // if we  get through the whole array, it means there are no duplicates among any single row, column or square
  // this means the board is valid

  isValidSudoku(board) {
    // creating maps for external structures, used to keep track of what individual row/column/square we are on
    let rows = {};
    let columns = {};
    let squares = {};

    // looping through both the given external array and its internal arrays
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        // value of current 1x1 cell
        let value = board[i][j];

        // continue if value represents empty square
        if (value == ".") continue;

        // calculate what 3x3 square the cell belongs to
        let gridCord = [Math.floor(i / 3), Math.floor(j / 3)]; //uses Math.floor for integer division

        // checks if respective internal map exists, if one does not exist - it is created here
        if (!rows[i]) rows[i] = {};
        if (!columns[j]) columns[j] = {};
        if (!squares[gridCord]) squares[gridCord] = {};

        // checks respective internal map for a duplicate of the current value
        if (
          rows[i].hasOwnProperty(value) ||
          columns[j].hasOwnProperty(value) ||
          squares[gridCord].hasOwnProperty(value)
        ) {
          // if a duplicate value does exist, the board is not valid
          return false;
        }

        // if no duplicate value exists, we track the current value in each respective internal map
        rows[i][value] = true;
        columns[j][value] = true;
        squares[gridCord][value] = true;
      }
    }

    // if we loop through the entire external array without finding a duplicate, the board is valid
    return true;
  }
}

// Common mistakes:
// not using == in our if condition, rookie mistake
// not using Math.floor for integer division - this is not C++
// basic syntax like incrementing i in our j loop etc..

// Improvements:
// we can replace our basic object maps for actual Map structures, allowing us to use more readable code

// Deeper Dive:
// - we are given an array that represents a standard 9x9 sudoku board
// - if we think along the terms of x and y axis, x being horizontal and y being vertical.. in our code we use j for x, i for y
// - i would be the current row (y axis), j would be the current column (x axis)
// - we need to map every individual row and column
// - so i represents the row the current cell belongs to, and j represents the current column the cell belongs to
// - e.g. all of the values that have "0" as their j value belong in the "0" column map (the intuition for the y(i) axis is more obvious)

// - the hardest part of this problem is understanding how we determine what 3x3 square each 1x1 cell value belongs to
// - we can take advantage of integer division to achieve this
// - we can think of each square as having its own coordinates e.g. 0,0 1,2, 2,2  etc
// - the board is 9x9, each grid square is 3x3, which is 1/3 of the size of the original board
// - we can use that pattern and apply it to each index of the external array (representing rows) and each index of its internal array (representing columns)
// - the possible indecies are 0 - 8, 9 values. If we divide the current index by 3, we get the values 0,1, or 2 depending on the index
// - doing this for both the x and y axis index will give you the coordinates of the grid that the current cell belongs to

// - its also important to note that we can use arrays for the rows and columns group structure - however each individual row and column need to be a map in order to track duplicates OR I guess it can also bet a Set
// - the grid squares group must be a map though, as we need to identify each grid square using a string that represents the grid coordinates

// General Teaching:
// - this problem is really about applying basic concepts such as array tracking using maps, to a complex problem
// - the specific concept of implementing the 3x3 grid squares is much more complex than the general concepts used to solve the problem
// - basic knowledge of understanding how to track values, find duplicates and exit loops on specific conditions - is enough to implement the solution ONCE you understand how to solve the problem of the coordinates.
