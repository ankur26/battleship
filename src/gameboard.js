import ship from "./ship";

const gameboard = () => {
  let grid = [];
  let ships = [];
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
  const rangeValidator = (input, min, max) => {
    return input > max || input < min;
  };

  const inputValidator = (row, col, placeAlongXaxis, length) => {
    // Start with input check
    if (
      typeof row === "number" &&
      typeof col === "number" &&
      typeof placeAlongXaxis === "boolean" &&
      typeof length === "number"
    ) {
      //Limit checks, length cannot be greater than 5 and less than 2
      if (rangeValidator(length, 2, 5)) {
        throw new Error("length cannot be greater than 5 or less than 2");
      }
      if (rangeValidator(row, 0, 9)) {
        throw new Error("Row value cannot be greater than 9 or less than 0");
      }
      if (rangeValidator(col, 0, 0)) {
        throw new Error("Column value cannot be greater than 9 or less than 0");
      }
      if (placeAlongXaxis) {
        for (let i = col; i < col + length; i++) {
          if (rangeValidator(i, 0, 9)) {
            throw new Error("Ship is exceeding grid size");
          }
        }
      } else {
        for (let i = row; i < row + length; i++) {
          if (rangeValidator(i, 0, 9)) {
            throw new Error("Ship is exceeding grid size");
          }
        }
      }
    } else {
      throw new Error("One or more inputs are invalid");
    }
  };

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

  const receiveAttack = (row, col) => {
    if (typeof row === "number" && typeof col === "number") {
      if (grid[row][col]) {
        // console.log("found object");
        if (grid[row][col].shipPlaced) {
          // console.log("found ship");
          if (!grid[row][col].hit) {
            // console.log("took hit");
            ships[grid[row][col].ship_id].hit();
            grid[row][col].hit = true;
            return true;
          }
          return false;
        } else {
          grid[row][col].hit = true;
          grid[row][col].missed = true;
          return false;
        }
      }
    }
  };

  const areAllShipsSunk = () => {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  };

  return {
    getCellState,
    checkOverlap,
    placeShip,
    receiveAttack,
    areAllShipsSunk,
  };
};

export default gameboard;
