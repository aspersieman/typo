import { Difficulty, GameState } from "game";

export class DifficultyComponent {
  constructor(game, fillColor, textColor) {
    if (textColor === undefined) {
      textColor = "#33CCFF";
    }
    this.game = game;
    this.canvas = game.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.x = 10;
    this.y = 10;
    this.width = 70;
    this.height = 20;
    this.fillColor = fillColor || null;
    this.textColor = textColor;
    this.state = "VISIBLE";

    const div = document.createElement("div");
    this.createRadio(Difficulty.EASY, "difficulty", "Easy", div, false);
    this.createRadio(Difficulty.NORMAL, "difficulty", "Normal", div, true);
    this.createRadio(Difficulty.HARD, "difficulty", "Hard", div, false);
    this.createRadio(Difficulty.EXPERT, "difficulty", "Expert", div, false);
    const rect = this.canvas.getBoundingClientRect();
    div.style.padding = "0.8rem";
    div.style.margin = rect.x + "px";
    div.style.width = 100 + "px";
    div.style.maxWidth = 100 + "px";
    div.style.position = "absolute";
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.transform = "translate(-50%, -50%)";
    div.style.border = "1px solid " + this.textColor;
    div.style.borderRadius = "5px";
    div.style.color = this.textColor;
    if (this.fillColor) {
      div.style.backgroundColor = this.fillColor;
    }
    div.style.fontFamily = "Arial";

    this.element = div;
    document.body.appendChild(div);
    this.hide();
  }
  createRadio(value, group, title, parentElem, checked = false) {
    const elem = document.createElement("input");
    elem.id = value;
    elem.type = "radio";
    elem.name = group;
    elem.checked = checked;
    elem.value = value;
    elem.style.marginRight = "0.5rem";
    elem.addEventListener("click", (e) => {
      const t = e.target.value.trim().toUpperCase();
      this.game.difficulty = t;
    });
    const label = document.createElement("label");
    label.htmlFor = value;
    label.appendChild(document.createTextNode(title));
    parentElem.appendChild(elem);
    parentElem.appendChild(label);
    const br = document.createElement("br");
    parentElem.appendChild(br);
  }
  hide() {
    this.element.style.display = "none";
    this.state = "HIDDEN";
  }
  show() {
    this.element.style.display = "block";
    this.state = "VISIBLE";
  }
}
