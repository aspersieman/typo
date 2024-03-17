export class LifeComponent {
  constructor(canvas, fillColor, textColor) {
    if (fillColor === undefined) {
      fillColor = "rgba(0, 0, 0, 1)";
    }
    if (textColor === undefined) {
      textColor = "rgba(255, 40, 40, 1)";
    }
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = 70;
    this.height = 20;
    this.x = this.canvas.width - this.width - 10;
    this.y = 40;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "VISIBLE";
    this.lives = 3;
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.ctx.save();
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = this.fillColor;
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.fillStyle = this.fillColor;
      this.ctx.roundRect(this.x, this.y, this.width, this.height, 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.font = "13px arial";
      this.ctx.fillStyle = this.textColor;
      for (let i = 0; i < this.lives; i++) {
        this.ctx.fillText(
          "❤️",
          this.x + i * 20 + 15,
          this.y + this.height / 2,
          this.width,
        );
      }
      this.ctx.restore();
    }
  }
  setLives(lives) {
    if (typeof lives !== "number") {
      lives = 0;
    }
    if (lives < 0) {
      lives = 0;
    }
    this.lives = lives;
  }
  increment() {
    this.setLives(this.lives + 1);
  }
  decrement() {
    this.setLives(this.lives - 1);
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
