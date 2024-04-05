import { ProgressBarComponent } from "../components/progress-bar.js";

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
    this.width = 400;
    this.height = 200;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height / 2 - this.height / 2;
    this.title = title;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "HIDDEN";
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

    this.progressBar = new ProgressBarComponent(
      this.game,
      this.x,
      this.y,
      400,
      10,
    );
    this.progressBar.hue = 0;
    this.progressBar.saturation = 0;
    this.progressBar.luminance = 100;
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.loadingText.style.display = "block";
      this.progressBar.update();
      if (this.progressBar.isDone()) {
        this.progressBar.reset();
      }
      this.progressBar.draw();
    }
  }
  reset() {
    this.ctx.fillStyle = "rgba(0,0,0,0)";
    this.ctx.fillRect(0, 0, this.width, this.height);
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
  }
  show() {
    this.state = "VISIBLE";
    this.loadingText.style.display = "block";
  }
}
