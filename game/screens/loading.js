import { GameState } from "game";

export class LoadingScreen {
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
    this.width = 200;
    this.height = 200;
    this.centerRadius = 30;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height / 2 - this.height / 2;
    this.translateX = this.x + this.width / 2;
    this.translateY = this.y + this.height / 2;
    this.title = title;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "HIDDEN";
    this.lineWidth = 15;
    this.lineLength = this.height / 2;
    this.rotateAngle = 3;
    this.borderRadius = this.lineWidth;

    const loadingText = document.createElement("h1");
    const textNode = document.createTextNode(this.title);
    loadingText.appendChild(textNode);
    loadingText.id = "loadingText";
    loadingText.style.display = "hidden";
    loadingText.type = "text";
    loadingText.style.color = this.textColor;
    loadingText.style.borderRadius = "5px";
    loadingText.style.fontSize = "1rem";
    loadingText.style.fontFamily = "Arial";
    loadingText.style.padding = "1rem";
    loadingText.style.position = "fixed";
    const rect = this.canvas.getBoundingClientRect();
    loadingText.style.left = rect.x + "px";
    loadingText.style.top = rect.y + rect.height * 0.8 + "px";
    loadingText.style.width = rect.width + "px";
    loadingText.style.textAlign = "center";
    loadingText.style.maxWidth = rect.width - 35 + "px";
    document.body.appendChild(loadingText);
    this.loadingText = loadingText;
    this.totalRotations = [];
  }
  drawLine(deg, style = "rgba(255,255,255,1)") {
    this.ctx.beginPath();
    this.ctx.lineWidth = 0;
    this.ctx.fillStyle = style;
    this.ctx.strokeStyle = style;
    this.ctx.translate(this.translateX, this.translateY);
    this.ctx.lineCap = "round";
    const rotation = (deg * Math.PI) / 180;
    this.ctx.rotate(rotation);
    this.ctx.roundRect(
      -this.lineWidth / 2,
      this.centerRadius,
      this.lineWidth,
      this.lineLength,
      this.borderRadius,
    );
    this.ctx.fill();
    this.ctx.rotate(-rotation);
    this.ctx.translate(-this.translateX, -this.translateY);
    this.ctx.closePath();
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.loadingText.style.display = "block";
      this.ctx.save();

      this.ctx.translate(this.translateX, this.translateY);
      const rotation = (this.rotateAngle * Math.PI) / 180;
      this.ctx.rotate(rotation);
      this.ctx.translate(-this.translateX, -this.translateY);

      this.ctx.beginPath();
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = "#FFF";
      this.ctx.stroke();
      this.drawLine(0, "rgba(255,255,255,0.2)");
      this.drawLine(45, "rgba(255,255,255,0.35)");
      this.drawLine(90, "rgba(255,255,255,0.5)");
      this.drawLine(135, "rgba(255,255,255,0.6)");
      this.drawLine(180, "rgba(255,255,255,0.7)");
      this.drawLine(225, "rgba(255,255,255,0.8)");
      this.drawLine(270, "rgba(255,255,255,0.9)");
      this.drawLine(315);
      this.ctx.closePath();

      this.ctx.save();

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
    this.loadingText.style.display = "none";

    this.ctx.restore();
  }
  show() {
    this.state = "VISIBLE";
  }
}
