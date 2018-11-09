class Ball {
  constructor(canv, ctx, paddle1, paddle2) {
    this.canvas = canv;
    this.context = ctx;
    this.x = 0;
    this.y = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 10;
    this.height = 10;
    this.color = "rgba(255,255,255,1)";
    this.p1 = paddle1, this.p2 = paddle2;
    this.reset();
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    var top = this.y;
    var center = this.y + this.height / 2;
    var bottom = this.y + this.height;
    if (this.x == this.p1.x + this.p1.width) {
      var p1Center = this.p1.y + this.p1.height / 2;
      var p1CenterMinus = p1Center - 0.1 * this.p1.height;
      var p1CenterPlus = p1Center + 0.1 * this.p1.height;
      if (center >= p1CenterMinus && center <= p1CenterPlus) {
        this.speedX *= -1;
      } else if (bottom >= this.p1.y && center < p1Center) {
        this.speedX *= -1;
        this.speedY = -(1 - (p1CenterMinus - center) / (p1CenterMinus - this.p1.y));
      } else if (top <= this.p1.y + this.p1.height && center > p1Center) {
        this.speedX *= -1;
        this.speedY = (1 - (center - p1CenterPlus) / (this.p1.y - p1CenterPlus));
      }
    } else if (this.x + this.width == this.p2.x) {
      var p2Center = this.p2.y + this.p2.height / 2;
      var p2CenterMinus = p2Center - 0.1 * this.p2.height;
      var p2CenterPlus = p2Center + 0.1 * this.p2.height;
      if (center >= p2CenterMinus && center <= p2CenterPlus) {
        this.speedX *= -1;
      } else if (bottom >= this.p2.y && center < p2Center) {
        this.speedX *= -1;
        this.speedY = -(1 - (p2CenterMinus - center) / (p2CenterMinus - this.p2.y));
      } else if (top <= this.p2.y + this.p2.height && center > p2Center) {
        this.speedX *= -1;
        this.speedY = (1 - (center - p2CenterPlus) / (this.p2.y - p2CenterPlus));
      }
    } else if (this.speedY <= 0 && this.y <= 0) {
      this.speedY *= -1;
    } else if (this.speedY >= 0 && this.y >= this.canvas.height) {
      this.speedY *= -1;
    }
    this.draw();
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  reset() {
    this.speedX = 0;
    this.speedY = 0;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;
  }

  start() {
    var randX = Math.floor(Math.random() * 2);
    var randY = Math.floor(Math.random() * 2);
    if (randX == 0) {
      this.speedX = -1;
    } else {
      this.speedX = 1;
    }
    if (randY == 0) {
      this.speedY = -1;
    } else {
      this.speedY = 1;
    }
  }

  changeColor(newColor) {
    this.color = newColor;
    this.draw();
  }
}