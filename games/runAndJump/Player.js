class Player {
  constructor() {
    this.width = 30;
    this.height = 60;
    this.imageStep1 = document.getElementById("playerStep1");
    this.imageStep2 = document.getElementById("playerStep2");
    this.imageJump = document.getElementById("playerJump");
    this.imageCrouch = document.getElementById("playerCrouch");
    this.reset();
  }

  reset() {
    this.x = canvas.width / 2 - this.width / 2;
    this.ground = canvas.height / 2;
    this.y = this.ground;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 1;
    this.cooldown = 0;
    this.image = this.imageStep1;
  }

  update() {
    if (this.cooldown > 0) {
      this.cooldown--;
    }
    this.move();
    this.draw();
  }

  press(eventCase) {
    switch (eventCase) {
      case 37: //left
        this.left = true;
        break;
      case 38: //up
        if (this.y == this.ground) {
          this.jump();
        }
        break;
      case 39: //right
        this.right = true;
        break;
      case 40: //down
        this.crouch();
        break;
      case 32: //left
        this.fire();
        break;
    }
  }

  release(eventCase) {
    switch (eventCase) {
      case 37: //left
        this.left = false;
        break;
      case 39: //right
        this.right = false;
        break;
      case 40: //down
        this.stopCrouch();
        break;
    }
  }

  fire() {
    if (!this.cooldown) {
      this.createFireball();
    }
  }

  createFireball() {

  }

  move() {
    if (this.left && !this.right && this.speedX > -1) {
      this.speedX -= 0.1;
    } else if (!this.left && this.right && this.speedX < 1) {
      this.speedX += 0.1;
    } else if ((this.left && this.right) || (!this.left && !this.right)) {
      if (this.speedX > 0) {
        this.speedX -= 0.05;
      } else if (this.speedX < 0) {
        this.speedX += 0.05;
      }
    }
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.speedY < 0) {
      this.speedY += this.gravity;
    }
    if (this.y >= 0) {
      this.speedY = 0;
    }
    if (this.y < 0) {
      this.image = this.imageJump;
    } else if (this.crouch) {
      this.image = this.imageCrouch;
    } /*else if (this.image == this.imageStep1 && this.speedX != 0) {
      this.image = this.imageStep2;
    } else if (this.image == this.imageStep2 && this.speedX != 0) {
      this.image = this.imageStep1;
    }*/
  }

  jump() {
    this.speedY -= 10;
  }

  crouch() {
    this.crouch = true;
    this.height = 30;
    this.image = this.imageCrouch;
  }

  stopCrouch() {
    this.crouch = false;
    this.height = 60;
    this.image = this.imageStep1;
  }

  isBlockedBy(object) {
    if ((this.x == object.x + object.width && this.xSpeed > 0) && (this.y + this.height <= object.y && this.y)) {

    }
  }

  draw() {
    context.drawImage(this.image, this.x, this.y);
  }
}