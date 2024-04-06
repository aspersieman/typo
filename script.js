import { Game } from "game";

// TODO: Set to production
const APP_ENV = "dev";

window.onload = () => {
  const game = new Game(APP_ENV);
  game.run();
};
