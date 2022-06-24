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

    Screen.addCommand('w', 'move up', () => {
      this.cursor.up();
    });
    Screen.addCommand('a', 'move left', () => {
      this.cursor.left();
    });
    Screen.addCommand('s', 'move down', () => {
      this.cursor.down();
    });
    Screen.addCommand('d', 'move right', () => {
      this.cursor.right();
    });
    Screen.addCommand('p', 'place move', () => {
      this.placeMove();
    })

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  placeMove() {
    const { row, col } = this.cursor.getCurrentPosition();

    if (this.grid[row][col] === ' ') {
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(row, col, this.playerTurn);
      Screen.render();
      
      if (this.playerTurn === 'O') {
        this.playerTurn = 'X';
      } else {
        this.playerTurn = 'O';
      }
    } else {
      console.log('space is occupied');
    }
  }

  static checkWin(grid) {

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
    } else if (ConnectFour.checkTie(grid)) {
      return 'T';
    } else {
      return false;
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

  static checkTie(grid) {

    let tie = true;
    grid.forEach(row => {
      if (row.includes(' ')) {
        tie = false;
        return;
      }
    });

    return tie;
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
      if (ConnectFour.checkColumn(grid, player, col)) {
        return true;
      }
    }

    return false;
  }

  static checkColumn(grid, player, col) {

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
    let downRight = 0;
    let downLeft = 0;
    let upLeft = 0;
    let upRight = 0;

    while (index < 4) {
      const lowerRow = grid[row + index];
      const upperRow = grid[row - index];
      let char;

      if (lowerRow !== undefined) {
        char = lowerRow[col + index];
        if (char === player) {
          downRight++;
        }

        char = lowerRow[col - index];
        if (char === player) {
          downLeft++;
        }
      }
      
      if (upperRow !== undefined) {
        char = upperRow[col - index];
        if (char === player) {
          upLeft++;
        }

        char = upperRow[col + index];
        if (char === player) {
          upRight++;
        }
      }

      index++;
    }

    return [downRight, upLeft, downLeft, upRight].some(num => num === 3);
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
