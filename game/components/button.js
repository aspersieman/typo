export class ButtonComponent {
  constructor(canvas, text, fillColor, textColor) {
    if (fillColor === void 0) {
      fillColor = "#ffffff";
    }
    if (textColor === void 0) {
      textColor = "#000000";
    }
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.text = text;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "VISIBLE";
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.ctx.save();
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = this.fillColor;
      this.ctx.beginPath();
      this.ctx.roundRect(this.x, this.y, this.width, this.height, 5);
      this.ctx.stroke();
      this.ctx.fill();
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
      this.ctx.restore();
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
