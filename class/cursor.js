const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  left() {
    if (this.col - 1 >= 0) {
      this.col -= 1;
    }
  }

  right() {
    if (this.col + 1 < this.numCols) {
      this.col += 1;
    }
  }

  up() {
    if (this.row - 1 >= 0) {
      this.row -= 1;
    }
  }

  down() {
    if (this.row + 1 < this.numRows) {
      this.row += 1;
    }
  }

}


module.exports = Cursor;
