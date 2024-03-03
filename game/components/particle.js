export class ParticleComponent {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
  }
  move(c) {
    this.draw(c);
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }
  draw(c) {
    c.save();
    c.globalAlpha = this.alpha;
    c.fillStyle = "red";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.restore();
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
