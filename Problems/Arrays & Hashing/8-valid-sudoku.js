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
