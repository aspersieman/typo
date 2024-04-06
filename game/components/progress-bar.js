export const ProgressBarState = {
  VISIBLE: "VISIBLE",
  HIDDEN: "HIDDEN",
};

export class ProgressBarComponent {
  constructor(game, x, y, w, h) {
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.step = 1;
    this.progress = 0;
    this.hue = 0;
    this.saturation = 100;
    this.hueChange = false;
    this.luminance = 40;
    this.width = w;
    this.height = h;
    this.state = ProgressBarState.VISIBLE;
  }
  draw() {
    if (this.state !== ProgressBarState.HIDDEN) {
      this.ctx.fillStyle = "rgba(237,231,255,0.1)";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle =
        "hsla(" +
        this.hue +
        ", " +
        this.saturation +
        "%," +
        this.luminance +
        "%, 1)";
      this.ctx.fillRect(this.x, this.y, this.progress, this.height);
      var grad = this.ctx.createLinearGradient(0, 0, 0, 130);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(1, "rgba(0,0,0,0.5)");
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(this.x, this.y, this.progress, this.height);
    }
  }
  update() {
    if (this.hueChange) {
      this.hue += 0.8 * this.step;
      if (this.hue >= 360) {
        this.hue = 0;
      }
    }
    const s = 1 * this.step;
    this.progress += s;
  }
  reset() {
    this.progress = 0;
  }
  isDone() {
    return this.progress >= this.width;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }
  hide() {
    this.state = ProgressBarState.HIDDEN;
  }
  show() {
    this.state = ProgressBarState.VISIBLE;
  }
}
