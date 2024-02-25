import { log } from "utils.log";

export class Particle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
  }
  move(c) {
    log("MOVE PARTICLE");
    this.draw(c);
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
    log("MOVED PARTICLE: ", this.x, this.y);
  }
  draw(c) {
    log("DRAW PARTICLE: ", this.x, this.y);
    c.save();
    c.globalAlpha = this.alpha;
    c.fillStyle = "red";
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.restore();
    log("DRAW PARTICLE DONE", this.x, this.y);
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
