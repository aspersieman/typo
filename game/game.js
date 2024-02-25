// TODO: Implement scenes
// TODO: Implement levels
// TODO: Implement child components
export class Game {
  constructor(state) {
    this.state = state;
    this.score = 0;
    this.stage = 0;
    this.level = 0;
    this.minWordCount = 5;
    this.loadingWordCount = false;
  }
  setState(s) {
    this.state = s;
  }
}
