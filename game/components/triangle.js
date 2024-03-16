export class TriangleComponent {
  /*            pa
   *            *
   *           *  *
   *          *     *
   *      pb ********* pc
   */
  constructor(canvas, pa, pb, pc) {
    this.state = "VISIBLE";
    this.pa = pa;
    this.pb = pb;
    this.pc = pc;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }
  draw() {
    if (this.state === "VISIBLE") {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(this.pa.x, this.pa.y);
      this.ctx.lineTo(this.pb.x, this.pb.y);
      this.ctx.lineTo(this.pc.x, this.pc.y);
      this.ctx.closePath();
      this.ctx.lineWidth = 10;
      this.ctx.strokeStyle = "#666666";
      this.ctx.stroke();
      this.ctx.fillStyle = "#FFCC00";
      this.ctx.fill();
      this.ctx.restore();
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
