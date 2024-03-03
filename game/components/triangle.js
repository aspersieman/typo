export class TriangleComponent {
  /*            pa
   *            *
   *           *  *
   *          *     *
   *      pb ********* pc
   */
  constructor(pa, pb, pc) {
    this.state = "VISIBLE";
    this.pa = pa;
    this.pb = pb;
    this.pc = pc;
  }
  draw(c) {
    if (this.state === "VISIBLE") {
      c.beginPath();
      c.moveTo(this.pa.x, this.pa.y);
      c.lineTo(this.pb.x, this.pb.y);
      c.lineTo(this.pc.x, this.pc.y);
      c.closePath();

      c.lineWidth = 10;
      c.strokeStyle = "#666666";
      c.stroke();

      c.fillStyle = "#FFCC00";
      c.fill();
    }
  }
  inBounds(mouseX, mouseY) {
    console.log("TODO Triangle inBounds :", mouseX, mouseY);
    return false;
  }
  hide() {
    this.state = "HIDDEN";
  }
  show() {
    this.state = "VISIBLE";
  }
}
