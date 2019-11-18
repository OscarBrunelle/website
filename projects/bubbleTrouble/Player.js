class Player {
  constructor(playerNum) {
    this.width = 20;
    this.height = 40;
    if (playerNum == 1) {
      this.image = imagePlayer1;
      this.basePos = canvas.width / 2 - this.width + 40;
    } else {
      this.image = imagePlayer2;
      this.basePos = canvas.width / 2 - this.width - 40;
    }
    this.x = this.basePos;
    this.y = bottom - this.height;
    this.speed = 1.75;
    this.moveDirection = 0;

    this.lives = 5;
    this.lost = false;
  }

  update() {
    if (this.lost) {
      return;
    }
    this.move();
    this.draw();
    if (this.laser != null) {
      this.laser.update();
      if (this.laser.reachTop()) {
        this.laser = null;
      }
    }
  }

  draw() {
    context.drawImage(this.image, this.x, this.y);
  }

  setMovement(direction) {
    switch (direction) {
      case 0:
        this.moveDirection = -this.speed;
        break;
      case 1:
        this.moveDirection = this.speed;
        break;
      default:
        this.moveDirection = 0;
        break;
    }
  }

  move() {
    if (this.moveDirection < 0 && this.x > 0) {
      this.x += this.moveDirection;
    } else if (this.moveDirection > 0 && this.x < canvas.width - this.width) {
      this.x += this.moveDirection;
    }
  }

  shoot() {
    if (this.laser == null) {
      this.laser = new Laser(this.x)
    }
  }

  reset() {
    this.laser = null;
    this.x = this.basePos;
    this.moveDirection = 0;
  }
}