const canvas = document.getElementById("game-canvas");
const scoreboard = document.getElementById("scoreboard");
const ctx = canvas.getContext("2d");
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH);
const model = new GameModel(ctx);
let score = 0;

setInterval(() => newGameState(), GAME_CLOCK);

const newGameState = () => {
  fullSend();
  if (!model.fallingPiece) {
    const rand = Math.round(Math.random() * 6) + 1;
    const newPiece = new Piece(SHAPES[rand], ctx);
    model.fallingPiece = newPiece;
  }
  model.moveDown();
};

const fullSend = () => {
  const allFilled = (row) => {
    for (let x of row) {
      if (x === 0) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < model.grid.length; i++) {
    if (allFilled(model.grid[i])) {
      score += SCORE_WORTH;
      model.grid.splice(i, 1);
      model.grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  scoreboard.innerHTML = "Score: " + String(score);
};

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  switch (e.key) {
    case "ArrowRight":
      model.moveSideWays(true);
      break;
    case "ArrowDown":
      model.moveDown();
      break;
    case "ArrowLeft":
      model.moveSideWays(false);
      break;
  }
});
