const gameboard = () => {
  const grid = [];
  const ships = [];
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      row.push("E");
    }
    grid.push(row);
  }
  
  const getCellState = (row, col) => {
    if (row && col) {
      if (typeof row === "number" && typeof col === "number") {
        if (row >= 10 || row < 0) {
          throw new Error("Row cannot be less than 0 or greater than 9");
        }
        if (col >= 10 || col < 0) {
          throw new Error("Column cannot be less than 0 or greater than 9");
        }
        return grid[row][col];
      }
      throw new TypeError("Row and col should have number types")
    }
    throw new Error("Row and/or column cannot be empty");
  };
  return {getCellState};
};

export default gameboard;
