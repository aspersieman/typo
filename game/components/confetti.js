export class ConfettiComponent {
  constructor(canvas, x, y, velocityX, velocityY) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10;
    this.startingSize = this.size;
    // color should be wither white or pink or purple
    this.colors = ["white", "lightpink"];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.velocityX = velocityX * 0.05;
    this.velocityY = 1 + Math.random() + velocityY * 0.005;
    this.gravity = 0.02;
    this.drag = 0.97;
    this.timeToLive = 1000; // milliseconds = 2 seconds
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();

    const spikes = 4;
    const outerRadius = this.size;
    const innerRadius = this.size / 2;

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / spikes) * Math.PI;

      const x = this.x + Math.cos(angle) * radius;
      const y = this.y + Math.sin(angle) * radius;

      this.ctx.lineTo(x, y);
    }

    this.ctx.closePath();
    this.ctx.fill();
  }

  move(deltaTime) {
    this.x += this.velocityX;
    this.velocityX *= this.drag;
    this.y += this.velocityY;
    this.velocityY += this.gravity;
    this.size = Math.max(
      0,
      this.size - (this.size * deltaTime) / this.timeToLive,
    );
    if (this.size / this.startingSize <= 0.2) this.size = 0;
  }
}
