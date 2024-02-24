class Game {
  constructor(state) {
    this.state = state;
    this.score = 0;
    this.stage = 0;
    this.level = 0;
    this.minWordCount = 5;
    this.loadingWordCount = false;
  }
  setState = function (s) {
    this.state = s;
  };
}
