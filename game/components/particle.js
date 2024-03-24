export class ParticleComponent {
  constructor(canvas, x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }
  move() {
    this.draw(this.ctx);
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }
  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
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
