class Paddle {
  constructor(canv, ctx, isFirst) {
    this.canvas = canv;
    this.context = ctx;
    if (isFirst) {
      this.x = canv.width * 0.1;
    } else {
      this.x = canv.width * 0.9;
    }
    this.width = 6;
    this.height = 40;
    this.reset();
  }

  press(direction) {
    if (direction == "up") {
      this.speedY = -1.5;
    } else if (direction == "down") {
      this.speedY = 1.5;
    }
  }

  release(direction) {
    if (direction == "up" && this.speedY > 0) {
      this.speedY = 0;
    } else if (direction == "down" && this.speedY < 0) {
      this.speedY = 0;
    }
    this.speedY = 0;
  }

  move() {
    if (this.speedY < 0 && this.y > 0) {
      this.y += this.speedY;
    } else if (this.speedY > 0 && this.y < (canvas.height - this.height)) {
      this.y += this.speedY;
    }

    this.draw();
  }

  draw() {
    this.context.fillStyle = 'rgba(255, 255, 255, 1)';
    this.context.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
  }

  reset() {
    this.y = this.canvas.height / 2 - this.height / 2;
    this.speedY = 0;
  }
}