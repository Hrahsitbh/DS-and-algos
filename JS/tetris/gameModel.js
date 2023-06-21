function GameModel(ctx) {
  this.ctx = ctx;
  this.fallingPiece = null;
  this.grid = this.makeStartingGrid();
}

GameModel.prototype.makeStartingGrid = function () {
  const grid = new Array(ROWS).fill(0).map(() => new Array(COLS).fill(0));
  return grid;
};

GameModel.prototype.collision = function (x, y) {
  const shape = this.fallingPiece.shape;
  const n = shape.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (shape[i][j] > 0) {
        let p = x + j;
        let q = y + i;
        if (p >= 0 && p < COLS && q < ROWS) {
          if (this.grid[q][p] > 0) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
  }
  return false;
};

GameModel.prototype.renderGameState = function () {
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      let cell = this.grid[i][j];
      this.ctx.fillStyle = COLORS[cell];
      this.ctx.fillRect(j, i, 1, 1);
    }
  }
  if (this.fallingPiece) this.fallingPiece.renderPiece();
};

GameModel.prototype.moveDown = function () {
  if (!this.fallingPiece) {
    this.renderGameState();
    return;
  } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
    const shape = this.fallingPiece.shape;
    const x = this.fallingPiece.x;
    const y = this.fallingPiece.y;
    shape.map((row, i) => {
      row.map((cell, j) => {
        let p = x + j;
        let q = y + i;
        if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
          this.grid[q][p] = shape[i][j];
        }
      });
    });
    if (this.fallingPiece.y === 0) {
      alert("Game over!");
      this.grid = this.makeStartingGrid();
    }
    this.fallingPiece = null;
  } else {
    this.fallingPiece.y += 1;
  }
  this.renderGameState();
};

GameModel.prototype.moveSideWays = function (isRight) {
  if (!this.fallingPiece) return;
  const x = this.fallingPiece.x;
  const y = this.fallingPiece.y;
  if (isRight) {
    if (!this.collision(x + 1, y)) {
      this.fallingPiece.x += 1;
    }
  } else {
    if (!this.collision(x - 1, y)) {
      this.fallingPiece.x -= 1;
    }
  }
  this.renderGameState();
};
