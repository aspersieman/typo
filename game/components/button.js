export class ButtonComponent {
  constructor(canvas, text, fillColor, textColor) {
    if (fillColor === undefined) {
      fillColor = "#ffffff";
    }
    if (textColor === undefined) {
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
    this.font = "25px arial";
    this.borderRadius = 5;
    this.circle = new Path2D();
    this.lineWidth = 2;
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.ctx.save();
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = this.textColor;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.beginPath();
      this.ctx.roundRect(
        this.x,
        this.y,
        this.width,
        this.height,
        this.borderRadius,
      );
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.fillStyle = this.textColor;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.font = this.font;
      this.ctx.fillText(
        this.text,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width,
      );
      this.ctx.closePath();
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
