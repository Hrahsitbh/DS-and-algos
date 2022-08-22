const diagonals = [];
let highlightedDiagonals = [];
const squareDiagonals = new Map();

generateChessBoard();

function generateChessBoard() {
  // diagonal collections
  for (let i = 0; i < 30; i++) {
    diagonals.push([]);
  }

  const boardEl = document.getElementById("board");
  for (let i = 0; i < 8; i++) {
    const rowEl = document.createElement("div");
    for (let j = 0; j < 8; j++) {
      const squareEl = document.createElement("div");
      rowEl.appendChild(squareEl);

      // select the top-left-bottom-right diagonal collection
      let TLdiag = diagonals[7 - (i - j)];
      // select the top-right-bottom-left diagonal collection
      let TRdiag = diagonals[15 + (i + j)];

      // save a reference to this square in each of its
      // two diagonals collections
      TLdiag.push(squareEl);
      TRdiag.push(squareEl);
      console.log(i, j, 7 -(i - j), 15 + (i  + j))
      // save a reference to each of a square's two diagonal
      // collections
      squareDiagonals.set(squareEl, [TLdiag, TRdiag]);
    }
    boardEl.appendChild(rowEl);
  }
  boardEl.addEventListener("click", onClickSquare);
}

function onClickSquare(evt) {
  // clear all currently highlighted squares (if any)
  for (let diagonal of highlightedDiagonals) {
    for (let el of diagonal) {
      el.classList.remove("highlighted");
    }
  }
  highlightedDiagonals = [];

  // clicked on a board square?
  if (evt.target.matches("#board > div > div")) {
    // retrieve the clicked square's two diagonal collections
    highlightedDiagonals = squareDiagonals.get(evt.target);

    // highlight all squares in both diagonal collections
    for (let diagonal of highlightedDiagonals) {
      for (let el of diagonal) {
        el.classList.add("highlighted");
      }
    }
  }
}
