import _, { inRange } from "lodash";
import player from "./player";

const DOMController = () => {
  let app = document.getElementById("app");
  let notifier = document.getElementById("notifier");
  let orientationToggle = document.getElementById("orientationToggle");
  let restart = document.getElementById("restart");
  let orientation = false;
  let shipsInitialized = 0;
  let playerGridDiv = undefined;
  let computerGridDiv = undefined;
  let allShipsSet = false;
  let shipObjectArray = [
    { name: "Carrier", size: 5 },
    { name: "Battleship", size: 4 },
    { name: "Destroyer", size: 3 },
    { name: "Submarine", size: 3 },
    { name: "Patrol Boat", size: 2 },
  ];
  let playerGrid = undefined;
  let computerGrid = undefined;
  // let playerTurn = true;
  const initialize = () => {
    // console.log(app);
    // length = 5;

    app.innerHTML = "";
    orientationToggle.classList.remove("none");
    restart.classList.add("none");
    shipsInitialized = 0;
    playerGrid = player();
    computerGrid = player();
    allShipsSet = false;
    computerGrid.init();
    for (let i = 0; i < 2; i++) {
      let div = document.createElement("div");
      div.classList.add("grid");
      if (i === 0) div.classList.add("player");
      else div.classList.add("computer");

      app.append(div);
    }
    playerGridDiv = document.querySelector(".player");
    computerGridDiv = document.querySelector(".computer");

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.row = i;
        div.dataset.column = j;
        playerGridDiv.append(div);
      }
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.row = i;
        div.dataset.column = j;
        computerGridDiv.append(div);
      }
    }
    orientationToggle.addEventListener("click", changeOrientation);
    updateEventListeners(shipObjectArray[shipsInitialized].size);
    notifier.textContent = `Place your ${shipObjectArray[shipsInitialized].name} `;
  };

  function removeEventsAndHighlights() {
    for (const iterator of playerGridDiv.children) {
      iterator.removeEventListener("mouseover", hoverCells);
      iterator.classList.remove("highlight");
    }
  }
  function changeOrientation(event) {
    orientation = !orientation;
    removeEventsAndHighlights();
    updateEventListeners(shipObjectArray[shipsInitialized].size);
  }
  function hoverCells(event) {
    const { row, column, r = +row, c = +column } = event.target.dataset;
    // console.log(r,c,playerGrid.che)
    // console.log(r, c);
    if (
      !playerGrid.checkOverlap(
        r,
        c,
        orientation,
        shipObjectArray[shipsInitialized].size
      )
    ) {
      for (const cell of document.querySelectorAll(".grid.player>.cell")) {
        cell.classList.remove("highlight");
        if (orientation) {
          if (
            _.inRange(
              Number(cell.dataset.column),
              c,
              c + shipObjectArray[shipsInitialized].size
            ) &&
            Number(cell.dataset.row) === r
          ) {
            cell.classList.add("highlight");
          }
        } else {
          // console.log('In Else condition')
          if (
            _.inRange(
              Number(cell.dataset.row),
              r,
              r + shipObjectArray[shipsInitialized].size
            ) &&
            Number(cell.dataset.column) === c
          ) {
            // console.log(cell);
            cell.classList.add("highlight");
          }
        }
      }
    }
  }
  function generateGridValue() {
    return [_.random(9), _.random(9)];
  }
  function attackPending(event) {
    this.classList.add("pending");
    // console.log(this.parent)
    // this.classList.toggle('pending');
  }
  function removeAttackPending(event) {
    this.classList.remove("pending");
  }
  function registerAttack() {
    // this.classList.add("attacked");
    console.log(this);
    let { row, column, r = +row, c = +column } = this.dataset;
    this.removeEventListener("mouseover", attackPending);
    this.removeEventListener("mouseout", removeAttackPending);
    this.removeEventListener("click", registerAttack);
    updateState(r, c);
  }
  function updateBoards() {
    console.log("updating the boards");
    // console.log(playerGridState);
    // console.log(computerGridState);

    for (const cell of computerGridDiv.children) {
      let { row, column, p_r = +row, p_c = +column } = cell.dataset;
      let cell_state = computerGrid.getCellState(p_r, p_c);
      // console.log(computerGridState[p_r][p_c].hit)
      // console.log(p_r,p_c,cell_state.hit)
      if (cell_state.hit) {
        cell.classList.add("attacked");
      }
      if (cell_state.shipPlaced && cell_state.hit) {
        cell.classList.add("hit");
      }
      if (cell_state.missed) {
        cell.classList.add("missed");
      }
    }
    for (const cell of playerGridDiv.children) {
      let { row, column, p_r = +row, p_c = +column } = cell.dataset;
      let cell_state = playerGrid.getCellState(p_r, p_c);
      // console.log(computerGridState[p_r][p_c].hit)
      // console.log(p_r,p_c,cell_state.hit)
      if (cell_state.hit) {
        cell.classList.add("attacked");
      }
      if (cell_state.shipPlaced && cell_state.hit) {
        cell.classList.add("hit");
      }
      if (cell_state.missed) {
        cell.classList.add("missed");
      }
    }
  }
  function endGame(playerWin) {
    for (const cell of computerGridDiv.children) {
      cell.removeEventListener("mouseover", attackPending);
      cell.removeEventListener("mouseout", removeAttackPending);
      cell.removeEventListener("click", registerAttack);
    }
    notifier.textContent = `${
      playerWin ? "Player" : "Computer"
    } Won!! Play again using the restart`;
  }
  function updateState(row, column) {
    console.log("We received attack");
    // console.log(computerGrid.receiveAttack(row,column))
    if (computerGrid.receiveAttack(row, column)) {
      console.log(`We attacked ${row} ${column}`);
      if (computerGrid.lost() && !playerGrid.lost()) {
        endGame(true);
      } else {
        updateBoards();
      }
      //Computer's turn starts here
      let [c_r, c_c] = generateGridValue();
      console.log(`Computer is attacking ${c_r} ${c_r}`);

      while (!playerGrid.receiveAttack(c_r, c_c)) {
        console.log("Found that it was already attacked");
        [c_r, c_c] =
          generateGridValue();
        console.log(`Trying ${c_r} ${c_c}`);
      }
      if (playerGrid.lost() && !computerGrid.lost()) {
        endGame(false);
      } else {
        updateBoards();
      }
      // notifier.textContent = 'The computer attacked you! Your turn'
    }
  }
  function startGameLoop() {
    console.log("Game loop can be started");
    notifier.textContent = `Let's Play!`;
    orientationToggle.classList.add("none");
    restart.classList.remove("none");
    restart.addEventListener("click", initialize);
    removeEventsAndHighlights();
    for (const cell of document.querySelectorAll("cell")) {
      console.log(cell);
      cell.removeEventListener("click", initClick);
    }
    //Add default click listeners here
    for (const cell of document.querySelectorAll(".computer.grid>.cell")) {
      cell.addEventListener("mouseover", attackPending);
      cell.addEventListener("mouseout", removeAttackPending);
      cell.addEventListener("click", registerAttack);
    }
  }
  function initClick(event) {
    if (!allShipsSet) {
      const { row, column, r = +row, c = +column } = event.target.dataset;
      if (
        playerGrid.placeShip(
          r,
          c,
          orientation,
          shipObjectArray[shipsInitialized].size
        )
      ) {
        // console.log(r, c);
        for (const cell of document.querySelectorAll(".grid.player>.cell")) {
          cell.classList.remove("highlight");
          if (orientation) {
            if (
              _.inRange(
                Number(cell.dataset.column),
                c,
                c + shipObjectArray[shipsInitialized].size
              ) &&
              Number(cell.dataset.row) === r
            ) {
              cell.classList.add("placed");
            }
          } else {
            // console.log('In Else condition')
            if (
              _.inRange(
                Number(cell.dataset.row),
                r,
                r + shipObjectArray[shipsInitialized].size
              ) &&
              Number(cell.dataset.column) === c
            ) {
              // console.log(cell);
              cell.classList.add("placed");
            }
          }
        }
        shipsInitialized += 1;
        if (shipsInitialized > 4) {
          allShipsSet = true;
          startGameLoop();
        } else {
          removeEventsAndHighlights();
          updateEventListeners(shipObjectArray[shipsInitialized].size);
          notifier.textContent = `Place your ${shipObjectArray[shipsInitialized].name} `;
        }
      }
    }
  }
  function updateEventListeners(length) {
    for (const cell of playerGridDiv.children) {
      if (orientation) {
        if (+cell.dataset.column <= 10 - length) {
          cell.addEventListener("mouseover", hoverCells);
          cell.addEventListener("click", initClick);
        }
      } else {
        // console.log("Inside row orientation event handlers");
        if (+cell.dataset.row <= 10 - length) {
          //   console.log("updating event listener for ",cell)
          cell.addEventListener("mouseover", hoverCells);
          cell.addEventListener("click", initClick);
        }
      }
    }
  }

  return { initialize };
};

export default DOMController;
