import player from "./player";
import _ from "lodash";
`
We will have our basic level AI coded in the main game loop.
And make a seperate UI level controller to do DOM manipulation
`;
class gameLoop {
  constructor() {
    this.p = player();
    this.c = player();
    this.playerTurn = true;
    this.p.init();
    this.c.init();
  }
  generateGridValue() {
    return [_.random(9), _.random(9)];
  }

  start() {

    while (!this.p.lost() && !this.c.lost()) {
      if (this.playerTurn) {
        console.log("It's player's turn !")
        let row = Number(prompt("Enter a row to attack between 0-9"));
        let column = Number(prompt("Enter a row to attack between 0-9"));
        if(this.c.receiveAttack(row,column)){
            console.log("your attack was registered successfully!")
        }
        else{
            console.log("you missed!");
        }
            this.playerTurn = !this.playerTurn;
      } else {
        let [row,col] = this.generateGridValue();
        let playerGrid = this.p.currentGrid();
        console.log(playerGrid)
        while(playerGrid[row][col].hit){
            [row,col]=this.generateGridValue();
        }
        console.log("The computer attacks!");
        if(this.p.receiveAttack(row,col)){
            console.log("The computer registered a hit!")
        }else{
            console.log("The computer missed!")
        }

        this.playerTurn = !this.playerTurn;
      }
    }
    console.log("Someone won!")
  }
}

export default gameLoop;