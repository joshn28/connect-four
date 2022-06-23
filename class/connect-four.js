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
          return win;
        }
      }
    });

    return win;
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
