import { Particle } from "game.particle";
import { log } from "utils.log";

export class Word {
  constructor(text, fillColor, textColor) {
    if (fillColor === void 0) {
      fillColor = "#ffffff";
    }
    if (textColor === void 0) {
      textColor = "#000000";
    }
    this.x = 10;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.text = text;
    this.fillColor = fillColor;
    this.textColor = textColor;
    this.state = "INITIALISED";
    this.particleCount = 1;
    this.particles = [];
  }
  draw(c) {
    c.fillStyle = this.fillColor;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fillStyle = this.textColor;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = "25px arial";
    c.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width,
    );
  }
  move(canvas) {
    if (this.y + this.height > canvas.height) {
      return false;
    }
    this.setPosition(this.x, this.y + 1);
    return true;
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
    log("HIDE");
    this.state = "HIDDEN";
    this.setSize(0, 0);
    log("HIDE DONE");
  }
  initParticles() {
    log("INIT PARTICLES");
    for (let i = 1; i <= this.particleCount; i++) {
      let dx = (Math.random() - 0.5) * (Math.random() * 6);
      let dy = (Math.random() - 0.5) * (Math.random() * 6);
      let radius = Math.random() * 10;
      let particle = new Particle(
        this.x + this.width / 2,
        this.y,
        radius,
        dx,
        dy,
      );
      this.particles.push(particle);
    }
    log("INIT PARTICLES DONE: " + this.particles.length);
  }
  explode(c) {
    if (this.state !== "EXPLODING") {
      this.initParticles();
      log("SET STATE TO EXPLODING");
      this.hide();
      this.state = "EXPLODING";
    }
    // console.log("CLEAR CANVAS");
    // c.clearRect(0, 0, canvas.width, canvas.height);
    // c.fillStyle = "rgb(0 0 0)";
    // c.fillRect(0, 0, canvas.width, canvas.height);
    this.particles.forEach((particle, i) => {
      if (particle.alpha <= 0) {
        log("REMOVE PARTICLE");
        this.particles.splice(i, 1);
      } else {
        particle.move(c);
      }
      if (this.particles.length === 0) {
        this.state = "EXPLODED";
      }
    });
  }
}
