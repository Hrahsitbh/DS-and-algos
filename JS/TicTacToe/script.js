const statusDisplay = document.querySelector(".game--status");
let gameActive = true;
let currentPlayer = "X";
let gameState = new Array(9).fill("");

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

statusDisplay.innerHTML = currentPlayerTurn();

const cellConatiner = document.querySelector(".game--container");
cellConatiner.addEventListener("click", handleCellClick);

const restartBtn = document.querySelector(".game--restart");
restartBtn.addEventListener("click", handleRestartGame);

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index"),
    10
  );
  if (gameState[clickedCellIndex] || !gameActive) return;
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const cellOne = gameState[winCondition[0]];
    const cellTwo = gameState[winCondition[1]];
    const cellThree = gameState[winCondition[2]];

    if (!cellOne || !cellTwo || !cellThree) continue;

    if (cellOne === cellTwo && cellTwo === cellThree) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  const roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState.forEach((item) => (item = ""));
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}
