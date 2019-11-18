class Bubble {
  constructor(type = 0, x = 0, y = 0, direction = "right", isChild = false) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.speedX = 1.5;
    this.speedY = 0;
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.bounce = 0.7;
    this.minSpeedY = 5 + 1.5 * this.type;
    this.size = 5 + 5 * this.type;
    this.color = "rgb(" + 255 * ((this.type + 2) % 1) + ", " + 255 * ((this.type + 2) % 2) + ", " + 255 * ((this.type + 2) % 3) + ")";
    if (direction == "left") {
      this.speedX *= -1;
    }
    if (isChild) {
      this.gravitySpeed = -(this.minSpeedY * 0.75);
    }
    this.height = this.size / 2;
  }

  update() {
    this.move();
    this.draw();
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fill();
  }

  move() {
    if (this.x <= 0 || this.x >= canvas.width) {
      this.speedX *= -1;
    }
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }

  hitBottom() {
    if (this.y > bottom - this.height) {
      this.y = bottom - this.height;
      if (this.gravitySpeed <= this.minSpeedY) {
        this.gravitySpeed = this.minSpeedY;
      } else {
        this.gravitySpeed = -(this.gravitySpeed * this.bounce);
      }
    }
  }

  collideWithPlayer(player) {
    return (this.x <= player.x + player.width && this.x + this.size >= player.x) && (this.y <= player.y + player.height && this.y + this.size >= player.y);
  }

  collideWithLaser(laser) {
    return (this.x <= laser.x + laser.width && this.x + this.size >= laser.x) && (this.y <= laser.y + laser.height && this.y + this.size >= laser.y);
  }
}