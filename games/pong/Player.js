class Player {
  constructor(name, playerScoreSpan) {
    this.name = name;
    this.score = 0;
    this.scoreSpan = playerScoreSpan;
    this.reset();
  }

  addPoint() {
    this.score++;
    this.scoreSpan.innerHTML = this.name + ": " + this.score;
  }

  reset() {
    this.score = 0;
    this.scoreSpan.innerHTML = this.name + ": " + this.score;
  }
}