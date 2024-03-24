export class ScoreComponent {
  constructor(canvas, fillColor, textColor) {
    if (fillColor === undefined) {
      fillColor = "rgba(0, 0, 0, 1)";
    }
    if (textColor === undefined) {
      textColor = "#33CCFF";
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 10;
    this.y = 10;
    this.width = 70;
    this.height = 20;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "VISIBLE";
    this.score = 0;
    this.lineWidth = 2;
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = this.textColor;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.roundRect(this.x, this.y, this.width, this.height, 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.font = "13px arial";
      this.ctx.fillStyle = this.textColor;
      this.ctx.fillText(
        `Score: ${this.score}`,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width,
      );
      this.ctx.closePath();
    }
  }
  setScore(score) {
    if (typeof score !== "number") {
      score = 0;
    }
    if (score < 0) {
      score = 0;
    }
    this.score = score;
  }
  increment() {
    this.setScore(this.score + 1);
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
