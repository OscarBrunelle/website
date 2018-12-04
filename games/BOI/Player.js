class Player {
  constructor() {
    this.width = 40;
    this.height = 80;
    this.image = document.getElementById("player");
    this.reset();
  }

  reset() {
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;
    this.leftDirection = false;
    this.upDirection = false;
    this.rightDirection = false;
    this.downDirection = false;
    this.leftFire = false;
    this.upFire = false;
    this.rightFire = false;
    this.downFire = false;
    this.movementDirection = 0;
    this.fireDirection = 0;
    this.cooldown = 0;
  }

  update() {
    if (this.cooldown > 0) {
      this.cooldown--;
    }
    this.move();
    this.fire();
    this.draw();
  }

  press(eventCase) {
    switch (eventCase) {
      case 37: //left
        this.leftFire = true;
        break;
      case 38: //up
        this.upFire = true;
        break;
      case 39: //right
        this.rightFire = true;
        break;
      case 40: //down
        this.downFire = true;
        break;
      case 81: //left
        this.leftDirection = true;
        break;
      case 90: //up
        this.upDirection = true;
        break;
      case 68: //right
        this.rightDirection = true;
        break;
      case 83: //down
        this.downDirection = true;
        break;
    }
    this.changeDirections();
  }

  release(eventCase) {
    switch (eventCase) {
      case 37: //left
        this.leftFire = false;
        break;
      case 38: //up
        this.upFire = false;
        break;
      case 39: //right
        this.rightFire = false;
        break;
      case 40: //down
        this.downFire = false;
        break;
      case 81: //left
        this.leftDirection = false;
        break;
      case 90: //up
        this.upDirection = false;
        break;
      case 68: //right
        this.rightDirection = false;
        break;
      case 83: //down
        this.downDirection = false;
        break;
    }
    this.changeDirections();
  }

  changeDirections() {
    if (this.leftDirection && !this.upDirection && !this.rightDirection && !this.downDirection) {
      this.movementDirection = 1;
    } else if (this.leftDirection && this.upDirection && !this.rightDirection && !this.downDirection) {
      this.movementDirection = 2;
    } else if (!this.leftDirection && this.upDirection && !this.rightDirection && !this.downDirection) {
      this.movementDirection = 3;
    } else if (!this.leftDirection && this.upDirection && this.rightDirection && !this.downDirection) {
      this.movementDirection = 4;
    } else if (!this.leftDirection && !this.upDirection && this.rightDirection && !this.downDirection) {
      this.movementDirection = 5;
    } else if (!this.leftDirection && !this.upDirection && this.rightDirection && this.downDirection) {
      this.movementDirection = 6;
    } else if (!this.leftDirection && !this.upDirection && !this.rightDirection && this.downDirection) {
      this.movementDirection = 7;
    } else if (this.leftDirection && !this.upDirection && !this.rightDirection && this.downDirection) {
      this.movementDirection = 8;
    } else {
      this.movementDirection = 0;
    }
    if (this.leftFire) {
      this.fireDirection = 1;
    } else if (this.leftFire && this.upFire) {
      this.fireDirection = 2;
    } else if (this.upFire) {
      this.fireDirection = 3;
    } else if (this.upFire && this.rightFire) {
      this.fireDirection = 4;
    } else if (this.rightFire) {
      this.fireDirection = 5;
    } else if (this.rightFire && this.downFire) {
      this.fireDirection = 6;
    } else if (this.downFire) {
      this.fireDirection = 7;
    } else if (this.downFire && this.leftFire) {
      this.fireDirection = 8;
    } else {
      this.fireDirection = 0;
    }
  }

  fire() {
    if (!this.cooldown) {
      switch (this.fireDirection) {
        case 1:
          createTear(new Tear(-1, 0));
          break;
        case 2:
          createTear(new Tear(-1, -1));
          break;
        case 3:
          createTear(new Tear(0, -1));
          break;
        case 4:
          createTear(new Tear(1, -1));
          break;
        case 5:
          createTear(new Tear(1, 0));
          break;
        case 6:
          createTear(new Tear(1, 1));
          break;
        case 7:
          createTear(new Tear(0, 1));
          break;
        case 8:
          createTear(new Tear(-1, 1));
          break;
      }
    }
  }

  move() {
    switch (this.movementDirection) {
      case 1:
        this.x--;
        break;
      case 2:
        this.x--;
        this.y--;
        break;
      case 3:
        this.y--;
        break;
      case 4:
        this.x++;
        this.y--;
        break;
      case 5:
        this.x++;
        break;
      case 6:
        this.x++;
        this.y++;
        break;
      case 7:
        this.y++;
        break;
      case 8:
        this.x--;
        this.y++;
        break;
    }
  }

  draw() {
    context.drawImage(this.image, this.x, this.y);
  }
}