export class ScoreComponent {
  constructor(fillColor, textColor) {
    if (fillColor === void 0) {
      fillColor = "rgba(0, 0, 0, 1)";
    }
    if (textColor === void 0) {
      textColor = "#33CCFF";
    }
    this.x = 10;
    this.y = 10;
    this.width = 70;
    this.height = 20;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "VISIBLE";
    this.score = 0;
  }
  draw(c) {
    if (this.state === "VISIBLE") {
      c.lineWidth = 3;
      c.strokeStyle = this.textColor;
      c.stroke();
      c.beginPath();
      c.fillStyle = this.fillColor;
      c.roundRect(this.x, this.y, this.width, this.height, 2);
      c.fill();
      c.stroke();
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.font = "13px arial";
      c.fillStyle = this.textColor;
      c.fillText(
        `Score: ${this.score}`,
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width,
      );
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
