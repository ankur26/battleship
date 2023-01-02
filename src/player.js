import gameboard from "./gameboard";
import _ from "lodash";

const player = () => {
  let playerGameBoard = gameboard();

  const generateGridValue = (l) => {
    let r = _.random(0, 9 - l);
    let c = _.random(0, 9 - l);
    return [r, c];
  };

  const init = () => {
    let lengths = [5, 4, 3, 2, 2];
    for (let index = 0; index < lengths.length; index++) {
      const element = lengths[index];
      let [row, column] = generateGridValue(element);
      let x_axis = _.random(1, false) === 0;
      console.log(
        `Attempting to place ship at ${row} ${column} with length ${element} and ${x_axis? 'Horizontal' : 'Vertical'} orientation` 
      );
      while (!playerGameBoard.placeShip(row, column, x_axis, element)) {
        [row, column] = generateGridValue(element);
        x_axis = _.random(1, false) === 0;
        console.log(
            `Attempting to place ship at ${row} ${column} with length ${element} and ${x_axis? 'Horizontal' : 'Vertical'} orientation` 
          );
      }
    }
    return true;
  };

  const receiveAttack = (row,col)=>{
    return playerGameBoard.receiveAttack(row,col);
  }

  const currentGrid = () =>{
    let grid = [];
    for(let i =0 ; i <=9;i++){
        let row = []
        for(let j=0;j<=9;j++){
            row.push(playerGameBoard.getCellState(i,j));
        }
        grid.push(row)
    }
    return grid;
  }
  const lost = () => {
    return playerGameBoard.areAllShipsSunk();
  }
  return {init,receiveAttack,currentGrid,lost}
};

export default player;
