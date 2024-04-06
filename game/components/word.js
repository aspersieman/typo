import { Point } from "utils.geometry";
import { Difficulty } from "game";
import { ProgressBarComponent } from "../components/progress-bar.js";

export const WordState = {
  VISIBLE: "VISIBLE",
  HIDDEN: "HIDDEN",
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT",
};

export class WordComponent {
  constructor(game, text, x, y, w, h, fillColor, textColor) {
    if (fillColor === undefined) {
      fillColor = "#ffffff";
    }
    if (textColor === undefined) {
      textColor = "#000000";
    }
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.width = w;
    this.minWidth = 0;
    this.height = h;
    this.minHeight = 0;
    this.text = text;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = WordState.VISIBLE;
    this.target = null;
    this.speedDefault = 200;
    this.speed = this.speedDefault;
    this.countdown = 300;
    this.progressBar = new ProgressBarComponent(
      this.game,
      this.x,
      this.y,
      this.width,
      this.height * 0.1,
    );
  }
  draw() {
    if (this.state !== WordState.HIDDEN) {
      this.ctx.save();
      this.ctx.fillStyle = this.fillColor;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = this.textColor;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.font = "25px arial";
      this.ctx.fillText(
        this.text,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width,
      );
      if (this.state === WordState.CORRECT) {
        const dw = ((this.width - this.minWidth) / this.speed) * -1;
        const dh = ((this.height - this.minHeight) / this.speed) * -1;
        this.width += dw;
        this.height += dh;
        this.move();
      }
      this.ctx.closePath();
      this.ctx.restore();
      if (this.progressBar.isDone()) {
        if (this.state !== WordState.CORRECT) {
          this.state = WordState.INCORRECT;
          this.progressBar.reset();
          this.progressBar.hide();
        }
      } else {
        const now = new Date().getTime();
        this.tick(now);
        this.progressBar.draw();
      }
    }
  }
  move() {
    const shouldMove =
      (this.target !== null && Math.abs(this.x - this.target.x) > 1) ||
      Math.abs(this.y - this.target.y) > 1;
    if (!shouldMove) {
      this.dx = 0;
      this.dy = 0;
      return false;
    }
    this.setPosition(this.x + this.dx, this.y + this.dy);
    this.progressBar.setPosition(this.x + this.dx, this.y + this.dy);
    return true;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setDestination(x, y) {
    this.target = new Point(x, y);
  }
  setSize(width, height) {
    this.width = width;
    this.minWidth = width * 0.1;
    this.height = height;
    this.minHeight = height * 0.1;
  }
  setCorrect() {
    this.state = WordState.CORRECT;
    this.setSpeed(10);
  }
  setLevel(level = 1) {
    const decrement = level * 10;
    this.setSpeed(this.speed - decrement);
  }
  setSpeed(speed = 200) {
    this.speed = speed < 10 ? 10 : speed;
    if (this.target) {
      this.dx = ((this.x - this.target.x) / this.speed) * -1;
      this.dy = ((this.y - this.target.y) / this.speed) * -1;
    }
  }
  setDifficulty(difficulty = Difficulty.NORMAL) {
    switch (difficulty) {
      case Difficulty.EASY:
        this.countdown = 10;
        break;
      case Difficulty.NORMAL:
        this.countdown = 6;
        break;
      case Difficulty.HARD:
        this.countdown = 4;
        break;
      case Difficulty.EXPERT:
        this.countdown = 4;
        break;
    }
  }
  isDone() {
    return this.progressBar.progress >= this.width;
  }
  tick(ts) {
    if (!this.timer) {
      this.timer = ts;
      return;
    }
    if (ts - this.timer > 1000) {
      this.timer = ts;
      this.progressBar.update();
      this.countdown--;
    }
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
    this.state = WordState.HIDDEN;
  }
  show() {
    this.state = WordState.VISIBLE;
  }
}
