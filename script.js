import { Game } from "game";

const APP_ENV = "production";

window.onload = () => {
  const game = new Game(APP_ENV);
  game.run();
};
