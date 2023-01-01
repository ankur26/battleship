import ship from "./ship";

const gameboard = () => {
  const grid = [];
  const ships = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push({
        empty: true,
        hit: false,
        shipPlaced: false,
        missed: false,
        ship_id: undefined,
      });
    }
    grid.push(row);
  }

  const getCellState = (row, col) => {
    if (!grid[row][col]) {
      throw new Error("Grid position is undefined or invalid");
    }
    return grid[row][col];
  };

  const checkOverlap = (row, col, placeAlongXaxis, length) => {
    if (placeAlongXaxis) {
      for (let i = col; i < col + length; i++) {
        if (grid[row][i].shipPlaced) {
          return true;
        }
      }
      return false;
    } else {
      for (let i = row; i < row + length; i++) {
        if (grid[i][col].shipPlaced) {
          return true;
        }
      }
      return false;
    }
  };
  const placeShip = (row, col, placeAlongXaxis, length) => {
    if (!checkOverlap(row, col, placeAlongXaxis, length)) {
      ships.push(ship(length));
      if (placeAlongXaxis) {
        for (let i = col; i < col + length; i++) {
          grid[row][i].shipPlaced = true;
          grid[row][i].empty = false;
          grid[row][i].ship_id = ships.length - 1;
        }
        return true;
      } else {
        for (let i = row; i < row + length; i++) {
          grid[i][col].shipPlaced = true;
          grid[i][col].empty = false;
          grid[i][col].ship_id = ships.length - 1;
        }
        return true;
      }
    }
    return false;
  };

  return { getCellState, checkOverlap, placeShip };
};

export default gameboard;
