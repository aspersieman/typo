import { ButtonComponent } from "game.button";
import { WordComponent } from "game.word";
import { ParticleComponent } from "game.particle";
import { TriangleComponent } from "game.triangle";
import { ScoreComponent } from "game.score";
import { GameOverScreen } from "game.gameover";
import { log } from "utils.log";
// TODO: Implement scenes, include base class with common functions
// TODO: Implement levels
// TODO: Implement child components
// TODO: Implement pallette for various colours

export const GameState = {
  NOT_STARTED: "NOT_STARTED",
  STARTED: "STARTED",
  SET_PAUSE: "SET_PAUSE",
  PAUSED: "PAUSED",
  GAME_OVER: "GAME_OVER",
};

// TODO: Use these
export const GameScenes = {
  NOT_STARTED: "NOT_STARTED",
  PAUSED: "PAUSED",
  GAME_OVER: "GAME_OVER",
};

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Game {
  constructor(appEnv) {
    this.appEnv = appEnv;
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.state = GameState.NOT_STARTED;
    this.score = 0;
    this.stage = 1;
    this.level = 1;
    this.minWordCount = 5;
    this.loadingWordCount = false;
    this.words = [];
    this.buttons = {};
    this.explosionParticleCount = 50;
    this.explosionParticles = [];
    this.exploding = false;
    this.floor = [];
    this.wordMaxHeight = this.canvas.height - 25;
    this.score = new ScoreComponent();
    this.gameOverScreen = new GameOverScreen(
      this,
      this.canvas,
      this.ctx,
      "Game Over",
      "#001122",
      "#FF5733",
    );
    this.init();
  }

  reset() {
    this.ctx.fillStyle = "rgb(0 0 0)";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  setState(s) {
    if (Object.keys(GameState).includes(s)) {
      this.state = s;
    } else {
      throw new Error(`Invalid game state: ${s}`);
    }
  }

  makeWords(list) {
    list.forEach((w) => {
      const word = new WordComponent(w, "#FF5733", "#001122");
      word.setPosition(canvas.width / 2 - 100, 0);
      word.setSize(200, 75);
      this.words.push(word);
    });
  }

  getDictionary = async (count = 10) => {
    log("Fetching dictionary...");
    if (this.appEnv === "production") {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${count}`,
      );
      if (response.ok) {
        let list = await response.json();
        makeWords(list);
        this.loadingWordCount = false;
        return list;
      }
      console.error(response);
      alert("Error fetching dictionary");
    } else {
      let list = [
        "aching",
        // "capable",
        // "handclasp",
        // "eloquent",
        // "submarine",
        // "enamel",
        // "bargraph",
        // "unicycle",
        // "unbounded",
        // "shaded",
      ];
      this.makeWords(list);
    }
    return [];
  };

  init() {
    log();
    this.getDictionary();
    this.initButtons();
    this.initFloor();
    this.initTextInput();
    this.listeners();
  }

  addButton(id, button) {
    if (!id) {
      throw new Error("Button id is required");
    }
    if (!button) {
      throw new Error("Button is required");
    }
    if (!Object.keys(this.buttons).includes(id)) {
      this.buttons[id] = button;
    }
  }

  initButtons() {
    const btnStartGame = new ButtonComponent(
      "Start Game",
      "#eeaa00",
      "#001122",
    );
    btnStartGame.setPosition(this.canvas.width / 2 - 100, 150);
    btnStartGame.setSize(200, 75);
    btnStartGame.onClick = () => {
      btnStartGame.hide();
      this.setState(GameState.STARTED);
      this.textInput.style.display = "block";
      return log("Start Game!");
    };
    this.addButton("BTN_START_GAME", btnStartGame);

    const btnContinueGame = new ButtonComponent(
      "Continue",
      "#FFFFFF",
      "#001122",
    );
    btnContinueGame.setPosition(this.canvas.width / 2 - 100, 150);
    btnContinueGame.setSize(200, 75);
    btnContinueGame.hide();
    btnContinueGame.onClick = () => {
      btnContinueGame.hide();
      this.textInput.style.display = "block";
      this.setState(GameState.STARTED);
      return log("Continued!");
    };
    this.addButton("BTN_CONTINUE_GAME", btnContinueGame);
  }

  initParticles(startX, startY) {
    for (let i = 1; i <= this.explosionParticleCount; i++) {
      let dx = (Math.random() - 0.5) * (Math.random() * 6);
      let dy = (Math.random() - 0.5) * (Math.random() * 6);
      let radius = Math.random() * 10;
      let particle = new ParticleComponent(startX, startY, radius, dx, dy);
      this.explosionParticles.push(particle);
    }
  }

  handleTextInput = (e) => {
    if (e.key === "Enter" && this.state === GameState.STARTED) {
      const t = e.target.value.trim().toLowerCase();
      if (t !== "") {
        if (t === this.words[this.words.length - 1].text) {
          this.score.increment();
        }
        e.target.value = "";
        e.target.focus();
      }
    }
  };

  initTextInput() {
    const input = document.createElement("input");
    const rect = this.canvas.getBoundingClientRect();
    input.style.display = "none";
    input.type = "text";
    input.style.border = "1px solid #000";
    input.style.borderRadius = "5px";
    input.style.fontSize = "large";
    input.style.padding = "1rem";
    input.style.position = "fixed";
    input.style.left = rect.x + "px";
    input.style.top = rect.y + rect.height + 10 + "px";
    input.style.width = rect.width + "px";
    input.style.maxWidth = rect.width - 35 + "px";
    input.placeholder = "Type the falling text here...";

    input.onkeydown = this.handleTextInput;

    document.body.appendChild(input);

    input.focus();
    this.textInput = input;
  }

  initFloor() {
    let x1 = 50;
    let x2 = 0;
    let x3 = 100;
    for (let i = 0; i < canvas.width; i += 100) {
      this.floor.push(
        new TriangleComponent(
          new Point(x1, 575),
          new Point(x2, 600),
          new Point(x3, 600),
        ),
      );
      x1 += 100;
      x2 += 100;
      x3 += 100;
    }
  }

  listeners() {
    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      Object.keys(this.buttons).forEach((b) => {
        const btn = this.buttons[b];
        if (btn.inBounds(x, y) && !!btn.onClick) btn.onClick();
      });
      // TODO: This is ugly find a way to handle this per screen
      Object.keys(this.gameOverScreen.buttons).forEach((b) => {
        const btn = this.gameOverScreen.buttons[b];
        if (btn.inBounds(x, y) && !!btn.onClick) btn.onClick();
      });
    });
    document.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key === "Escape" && this.state === GameState.STARTED) {
        this.textInput.style.display = "none";
        this.setState(GameState.SET_PAUSE);
      }
    });
  }

  explosion() {
    this.exploding = true;
    this.explosionParticles.forEach((particle, i) => {
      if (particle.alpha <= 0) {
        this.explosionParticles.splice(i, 1);
      } else {
        particle.move(this.ctx);
      }
    });
    if (this.explosionParticles.length === 0) {
      this.exploding = false;
    }
  }

  drawFloor() {
    this.floor.forEach((triangle) => {
      triangle.draw(this.ctx);
    });
  }

  drawButtons() {
    Object.keys(this.buttons).forEach((b) => {
      return this.buttons[b].draw(this.ctx);
    });
  }

  drawWord() {
    let wordCount = this.words.length;
    if (wordCount > 0) {
      if (!this.words[wordCount - 1].move(this.wordMaxHeight)) {
        const px =
          this.words[wordCount - 1].x + this.words[wordCount - 1].width / 2;
        this.initParticles(px, this.words[wordCount - 1].y);
        this.words.pop();
        wordCount = this.words.length;
      }
      if (wordCount > 0) {
        this.words[wordCount - 1].draw(this.ctx);
      }
    }
    // if (wordCount < this.minWordCount && this.loadingWordCount === false) {
    //   this.loadingWordCount = true;
    //   this.getDictionary();
    // }

    this.explosion();
    if (wordCount <= 0 && this.loadingWordCount === false && !this.exploding) {
      this.setState(GameState.GAME_OVER);
    }
  }

  run() {
    this.reset();
    this.drawButtons();
    if (this.state === GameState.STARTED) {
      this.gameOverScreen.hide();
      this.score.draw(this.ctx);
      this.drawFloor();
      this.drawWord();
    }
    if (this.state === GameState.SET_PAUSE) {
      this.setState(GameState.PAUSED);
      this.buttons["BTN_CONTINUE_GAME"].show();
    }
    if (this.state === GameState.GAME_OVER) {
      this.textInput.style.display = "none";
      this.gameOverScreen.show();
      this.gameOverScreen.draw();
    }
    window.requestAnimationFrame(() => this.run());
  }
}
