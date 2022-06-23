const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    if (ConnectFour.gridIsEmpty(grid)) {
      return false;
    } else if (ConnectFour.checkHorizontalWin(grid, 'X')) {
      return 'X';
    } else if (ConnectFour.checkHorizontalWin(grid, 'O')) {
      return 'O';
    } else if (ConnectFour.checkVerticalWin(grid, 'X')) {
      return 'X';
    } else if (ConnectFour.checkVerticalWin(grid, 'O')) {
      return 'O';
    } else if (ConnectFour.checkDiagonalWin(grid, 'X')) {
      return 'X';
    } else if (ConnectFour.checkDiagonalWin(grid, 'O')) {
      return 'O';
    }

  }

  static gridIsEmpty(grid) {

    let isEmpty = true;
    grid.forEach(row => {
      if (!row.every(char => char === ' ')) {
        isEmpty = false;
        return;
      }
    });

    return isEmpty;
  }

  static checkHorizontalWin(grid, player) {

    let win = false;
    grid.forEach(row => {
      for (let i = 0; i < row.length - 3; i++) {
        let arr = row.slice(i, i + 4);

        if (arr.every(char => char === player)) {
          win = true;
          return;
        }
      }
    });

    return win;
  }

  static checkVerticalWin(grid, player) {

    for (let col = 0; col < grid[0].length; col++) {
      if (ConnectFour.checkSingleCol(grid, player, col)) {
        return true;
      }
    }

    return false;
  }

  static checkSingleCol(grid, player, col) {

    for (let i = 0; i < grid.length - 3; i++) {
      let arr = [];

      for (let row = i; row < i + 4; row++) {
        const char = grid[row][col];
        arr.push(char);
      }
      
      if (arr.every(char => char === player)) {
        return true;
      }
    }

    return false;
  }

  static checkDiagonalWin(grid, player) {

    let win = false;
    grid.forEach((row, i) => {

      row.forEach((char, j) => {
        if (char === player && ConnectFour.checkDiagonals(grid, player, i, j)) {
          win = true;
          return;
        }
      });
      
    });

    return win;
  }

  static checkDiagonals(grid, player, row, col) {

    let index = 1;
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;

    while (index < 4) {
      const upperRow = grid[row + index];
      const lowerRow = grid[row - index];
      let char;

      if (upperRow !== undefined) {
        char = upperRow[col + index];
        if (char === player) {
          count1++;
        }

        char = upperRow[col - index];
        if (char === player) {
          count3++;
        }
      }
      
      if (lowerRow !== undefined) {
        char = lowerRow[col - index];
        if (char === player) {
          count2++;
        }

        char = lowerRow[col + index];
        if (char === player) {
          count4++;
        }
      }

      index++;
    }

    return [count1, count2, count3, count4].some(num => num === 3);
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
