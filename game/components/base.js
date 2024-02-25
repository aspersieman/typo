// TODO: Flesh this out.
export class BaseComponent {
  constructor(fillColor) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.fillColor = fillColor;
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
    console.log("HIDE");
    this.state = "HIDDEN";
    this.setSize(0, 0);
  }
}
