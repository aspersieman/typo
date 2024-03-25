import { ButtonComponent } from "game.button";
import { ScoreComponent } from "game.score";

export class GameOverScreen {
  constructor(game, title, fillColor, textColor) {
    if (fillColor === void 0) {
      fillColor = "#ffffff";
    }
    if (textColor === void 0) {
      textColor = "#000000";
    }
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 0.1 * this.canvas.width;
    this.y = 0.1 * this.canvas.height;
    this.width = this.canvas.width * 0.8;
    this.height = this.canvas.height * 0.8;
    this.title = title;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "HIDDEN";
    this.buttons = {};
    this.initButtons();
    this.score = new ScoreComponent(this.canvas);
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.ctx.save();
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = "#555555";
      this.ctx.beginPath();
      this.ctx.roundRect(this.x, this.y, this.width, this.height, 5);
      this.ctx.lineWidth = 10;
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.strokeStyle = this.textColor;
      this.ctx.fillStyle = this.textColor;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.font = "25px arial";
      this.ctx.fillText(
        this.title,
        this.x + this.width / 2,
        this.y + this.height * 0.25,
        this.width,
      );
      this.ctx.closePath();
      this.ctx.restore();
      this.drawButtons();
      this.score.setScore(this.game.score.score);
      this.score.setPosition(
        this.canvas.width / 2 - this.score.width / 2,
        this.canvas.height * 0.45 - this.score.height / 2,
      );
      this.score.draw();
    }
  }
  addButton(id, button) {
    if (!id) {
      throw new Error("Button id is required");
    }
    if (!button) {
      throw new Error("Button is required");
    }
    if (!Object.keys(this.buttons).includes(id)) {
      this.buttons[id] = button;
    }
  }
  initButtons() {
    const btnRestartGame = new ButtonComponent(
      this.canvas,
      "Restart",
      "#FF5733",
      "#001122",
    );
    btnRestartGame.setPosition(
      this.canvas.width / 2 - 100,
      this.canvas.height * 0.75,
    );
    btnRestartGame.setSize(200, 75);
    btnRestartGame.hide();
    btnRestartGame.onClick = () => {
      if (btnRestartGame.state === "VISIBLE") {
        btnRestartGame.hide();
        this.game.restartGame();
        this.hide();
        return console.log("Restarted!");
      }
    };
    this.addButton("BTN_RESTART_GAME", btnRestartGame);
    this.buttons["BTN_RESTART_GAME"].show();
  }
  drawButtons() {
    Object.keys(this.buttons).forEach((b) => {
      return this.buttons[b].draw();
    });
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }
  inBounds(mouseX, mouseY) {
    return !(
      mouseX < this.x ||
      mouseX > this.x + this.width ||
      mouseY < this.y ||
      mouseY > this.y + this.height
    );
  }
  hide() {
    this.state = "HIDDEN";
    this.buttons["BTN_RESTART_GAME"].hide();
  }
  show() {
    this.state = "VISIBLE";
    this.buttons["BTN_RESTART_GAME"].show();
  }
}
