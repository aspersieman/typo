import { Point } from "utils.geometry";

export const WordState = {
  VISIBLE: "VISIBLE",
  HIDDEN: "HIDDEN",
  CORRECT: "CORRECT",
  INCORRECT: "INCORRECT",
};

export class WordComponent {
  constructor(canvas, text, fillColor, textColor) {
    if (fillColor === undefined) {
      fillColor = "#ffffff";
    }
    if (textColor === undefined) {
      textColor = "#000000";
    }
    this.x = 10;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.width = 0;
    this.minWidth = 0;
    this.height = 0;
    this.minHeight = 0;
    this.text = text;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = WordState.VISIBLE;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.target = null;
    this.speedDefault = 200;
    this.speed = this.speedDefault;
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
      }
      this.ctx.closePath();
      this.ctx.restore();
    }
  }
  move() {
    const shouldMove =
      Math.abs(this.x - this.target.x) > 1 ||
      Math.abs(this.y - this.target.y) > 1;
    if (!shouldMove) {
      this.dx = 0;
      this.dy = 0;
      if (this.state !== WordState.CORRECT) {
        this.state = WordState.INCORRECT;
      }
      return false;
    }
    this.setPosition(this.x + this.dx, this.y + this.dy);
    return true;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setDestination(x, y) {
    this.target = new Point(x, y);
    this.dx = ((this.x - this.target.x) / this.speed) * -1;
    this.dy = ((this.y - this.target.y) / this.speed) * -1;
  }
  setSize(width, height) {
    this.width = width;
    this.minWidth = width * 0.1;
    this.height = height;
    this.minHeight = height * 0.1;
  }
  setCorrect() {
    this.state = WordState.CORRECT;
    this.speed = 10;
  }
  setLevel(level = 1) {
    const decrement = level * 10;
    this.speed = Math.max(this.speedDefault - decrement, 10);
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
