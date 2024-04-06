export class ParticleComponent {
  constructor(game, x, y) {
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 400;
    this.height = 200;
    this.vx = 0.8 + Math.random() * 1;
    this.v = Math.random() * 5;
    this.g = 1 + Math.random() * 3;
    this.down = false;
    this.hue = 0;
  }
  draw() {
    this.ctx.save();
    this.ctx.fillStyle = "hsla(" + (this.hue + 0.3) + ", 100%, 40%, 1)";
    let size = Math.random() * 2;
    this.ctx.fillRect(this.x, this.y, size, size);
    this.ctx.restore();
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
  }
}
