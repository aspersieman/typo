import { Game } from "game";

const APP_ENV = "development";

window.onload = () => {
  const game = new Game(APP_ENV);
  game.run();
};
