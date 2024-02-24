const CANVAS_DEFAULT_WIDTH = 600;
const CANVAS_DEFAULT_HEIGHT = 600;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const game = new Game("NOT_STARTED");
let buttons = [];
let words = [];
let counter = 0;

const init = async () => {
  const startGame = new Button("Start Game", "#eeaa00", "#001122");
  startGame.setPosition(canvas.width / 2 - 100, 150);
  startGame.setSize(200, 75);
  startGame.onClick = function () {
    buttons.pop();
    game.setState("STARTED");
    return console.log("Start Game!");
  };
  buttons.push(startGame);

  await getDictionary();
  listeners();
  draw();
};

const listeners = () => {
  canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    buttons.forEach(function (b) {
      if (b.inBounds(x, y) && !!b.onClick) b.onClick();
    });
  });
  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key === "Escape" && game.state === "STARTED") {
      game.setState("SET_PAUSE");
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
  buttons.forEach(function (b) {
    return b.draw(ctx);
  });
  if (game.state === "STARTED") {
    let wordCount = words.length;
    if (wordCount > 0) {
      if (!words[wordCount - 1].move(canvas)) {
        words.pop();
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
    continueGame.onClick = function () {
      buttons.pop();
      game.setState("STARTED");
      return console.log("Continued!");
    };
  }
  window.requestAnimationFrame(draw);
};

const getDictionary = async (count = 10) => {
  console.log("Fetching dictionary...");
  const response = await fetch(
    `https://random-word-api.vercel.app/api?words=${count}`,
  );
  if (response.ok) {
    let list = await response.json();
    console.log("Dictionary: ", list);
    list.forEach((w) => {
      const word = new Word(w, "#FF5733", "#001122");
      word.setPosition(canvas.width / 2 - 100, 150);
      word.setSize(200, 75);
      words.push(word);
    });
    game.loadingWordCount = false;
    return list;
  }
  console.error(response);
  alert("Error fetching dictionary");
  return [];
};

window.onload = () => {
  init();
};
