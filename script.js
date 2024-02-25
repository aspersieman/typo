import { Game } from "game";
import { Button } from "game.button";
import { Word } from "game.word";
import { log } from "utils.log";

const APP_ENV = "development";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const game = new Game("NOT_STARTED");
let buttons = [];
let words = [];

const init = async () => {
  log();
  const startGame = new Button("Start Game", "#eeaa00", "#001122");
  startGame.setPosition(canvas.width / 2 - 100, 150);
  startGame.setSize(200, 75);
  startGame.onClick = () => {
    buttons.pop();
    game.setState("STARTED");
    return log("Start Game!");
  };
  buttons.push(startGame);

  await getDictionary();
  listeners();
  draw();
};

const listeners = () => {
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    buttons.forEach((b) => {
      if (b.inBounds(x, y) && !!b.onClick) b.onClick();
    });
  });
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Escape" && game.state === "STARTED") {
      game.setState("SET_PAUSE");
    }
    if (key === "Enter" && game.state === "PAUSED") {
      // TODO: Fix
      game.setState("STARTED");
    }
    if (key === "Enter" && game.state === "NOT_STARTED") {
      // TODO: Fix
      game.setState("STARTED");
    }
  });
};

const reset = () => {
  ctx.fillStyle = "rgb(0 0 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const draw = async () => {
  reset();
  // Game loop
  buttons.forEach((b) => {
    return b.draw(ctx);
  });
  if (game.state === "STARTED") {
    let wordCount = words.length;
    if (wordCount > 0) {
      if (!words[wordCount - 1].move(canvas)) {
        words[wordCount - 1].explode(ctx);
        if (words[wordCount - 1].state === "EXPLODED") {
          // TODO: Use splice instead
          words.pop();
          return;
        }
        wordCount = words.length;
      }
      if (wordCount > 0) {
        words[wordCount - 1].draw(ctx);
      }
    }
    if (wordCount < game.minWordCount && game.loadingWordCount === false) {
      game.loadingWordCount = true;
      getDictionary();
    }
  }
  if (game.state === "SET_PAUSE") {
    game.setState("PAUSED");
    const continueGame = new Button("Continue", "#FFFFFF", "#001122");
    continueGame.setPosition(canvas.width / 2 - 100, 150);
    continueGame.setSize(200, 75);
    buttons.push(continueGame);
    continueGame.onClick = () => {
      buttons.pop();
      game.setState("STARTED");
      return log("Continued!");
    };
  }
  window.requestAnimationFrame(draw);
};

const makeWords = (list) => {
  list.forEach((w) => {
    const word = new Word(w, "#FF5733", "#001122");
    word.setPosition(canvas.width / 2 - 100, 0);
    word.setSize(200, 75);
    words.push(word);
  });
};

const getDictionary = async (count = 10) => {
  log("Fetching dictionary...");
  if (APP_ENV === "production") {
    const response = await fetch(
      `https://random-word-api.vercel.app/api?words=${count}`,
    );
    if (response.ok) {
      let list = await response.json();
      makeWords(list);
      game.loadingWordCount = false;
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
    makeWords(list);
  }
  return [];
};

window.onload = () => {
  init();
};
