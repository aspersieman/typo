import { GameState } from "game";

export class CountdownScreen {
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
    this.countdown = 3;
    this.timer = null;
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
      this.ctx.fillText(
        this.countdown.toString(),
        this.x + this.width / 2,
        this.y + this.height * 0.5,
        this.width,
      );
      if (this.countdown > 0) {
        const now = new Date().getTime();
        this.tick(now);
      } else {
        this.game.textInput.style.display = "block";
        this.game.textInput.focus();
        this.state = "HIDDEN";
        this.game.state = GameState.STARTED;
        this.timer = null;
        this.countdown = 3;
      }
      this.ctx.closePath();
      this.ctx.restore();
    }
  }
  tick(ts) {
    if (!this.timer) {
      this.timer = ts;
      return;
    }
    if (ts - this.timer > 1000) {
      this.timer = ts;
      this.countdown--;
    }
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
  }
  show() {
    this.state = "VISIBLE";
  }
}
