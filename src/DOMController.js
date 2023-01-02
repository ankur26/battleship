import _, { inRange } from "lodash";

const DOMController = () => {
  let app = document.getElementById("app");
  let orientation = false;
  let defaultLength = 5;
  let playerGridDiv = undefined;
  let computerGridDiv = undefined;
  let allShipsSet = false;

  const initialize = () => {
    // console.log(app);
    // length = 5;
    app.innerHTML = "";
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
    updateEventListeners(defaultLength);
  };
  function hoverCells(event) {
    const { row, column, r = +row, c = +column } = event.target.dataset;
    // console.log(r, c);
    for (const cell of document.querySelectorAll(".grid.player>.cell")) {
      cell.classList.remove("red");
      if (orientation) {
        if (
          _.inRange(Number(cell.dataset.column), c, c + defaultLength) &&
          Number(cell.dataset.row) === r
        ) {
          cell.classList.add("red");
        }
      } else {
        // console.log('In Else condition')
        if (
          _.inRange(Number(cell.dataset.row), r, r + defaultLength) &&
          Number(cell.dataset.column) === c
        ) {
            // console.log(cell);
          cell.classList.add("red");
        }
      }
    }
  }
  function updateEventListeners(length) {
    for (const cell of playerGridDiv.children) {
      if (orientation) {
        if (+cell.dataset.column <= length) {
          cell.addEventListener("mouseover", hoverCells);
        }
      } else {
        // console.log("Inside row orientation event handlers");
        if (+cell.dataset.row <= length) {
        //   console.log("updating event listener for ",cell)
          cell.addEventListener("mouseover", hoverCells);
        }
      }
    }
  }

  return { initialize };
};

export default DOMController;
