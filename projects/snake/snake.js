var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var eatingSound = new Audio('eating.mp3');
eatingSound.loop = false;
var deathSound = new Audio('death.mp3');
deathSound.loop = false;

var snake;
var fruit;

var updateTime = 100;
var interval;

function loadGame() {

  /*canvas.setAttribute("tabindex", "1");
  canvas.focus();*/
  canvas.style.background = "grey";
  /*if (window.innerWidth > 500) {
    canvas.width = window.innerWidth - 30;
    canvas.height = window.innerHeight - 120;
  } else {
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 80;
  }*/
  canvas.width = 600;
  canvas.height = 400;

  document.addEventListener('keydown', function (event) {
    var key = event.key;
    if (key == "ArrowUp") {
      if (snake.yDir != 1) {
        snake.xDir = 0;
        snake.yDir = -1;
      }
    } else if (key == "ArrowLeft") {
      if (snake.xDir != 1) {
        snake.xDir = -1;
        snake.yDir = 0;
      }
    } else if (key == "ArrowDown") {
      if (snake.yDir != -1) {
        snake.xDir = 0;
        snake.yDir = +1;
      }
    } else if (key == "ArrowRight") {
      if (snake.xDir != -1) {
        snake.xDir = +1;
        snake.yDir = 0;
      }
    }
    key = event.which;
    if (key == 49) {
      changeGameSpeed(0.5);
    } else if (key == 50) {
      changeGameSpeed(1);
    } else if (key == 51) {
      changeGameSpeed(2);
    } else if (key == 52) {
      changeGameSpeed(4);
    }
  });
  interval = setInterval(update, updateTime);
  restartGame();
}

class BodyPart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.outline = 2;
    this.speed = 20;
    this.child = null;
    this.xDir = 0;
    this.yDir = 0;
  }

  addNewChild() {
    var newChild = new BodyPart(this.x - this.xDir * this.speed, this.y - this.yDir * this.speed);
    if (this.child != null) {
      this.child.addChild(newChild);
    } else {
      this.child = newChild;
    }
  }

  addChild(child) {
    var newChild = new BodyPart(this.x - this.xDir * this.speed, this.y - this.yDir * this.speed);
    if (this.child != null) {
      this.child.addChild(newChild);
    } else {
      this.child = newChild;
    }
  }

  draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(this.x + this.outline, this.y + this.outline, this.width - 2 * this.outline, this.height - 2 * this.outline);
    if (this.child != null) {
      this.child.draw();
    }
  }

  die() {
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      console.log("Hit a wall!");
      return true;
    }
    if (this.child != null) {
      return this.child.isHit(this);
    }
    return false;
  }

  isHit(other) {
    if ((this.x + this.outline <= other.x + other.width && this.x + this.width - this.outline >= other.x) && (this.y + this.outline <= other.y + other.height && this.y + this.height - this.outline >= other.y)) {
      console.log("Hit your own body!");
      return true;
    }
    if (this.child != null) {
      return this.child.isHit(other);
    }
    return false;
  }

  move(prevPartXDir, prevPartYDir) {
    this.x += prevPartXDir * this.speed;
    this.y += prevPartYDir * this.speed;
    if (this.child != null) {
      this.child.move(this.xDir, this.yDir);
    }
    this.xDir = prevPartXDir;
    this.yDir = prevPartYDir;
  }
}

class Snake {
  constructor(x = 0, y = 0) {
    this.head = new BodyPart(x, y);
    this.xDir = 0;
    this.yDir = 0;
  }
  move() {
    this.head.move(this.xDir, this.yDir);
  }
  draw() {
    this.head.draw();
  }
  eat(fruit) {
    if ((this.head.x <= fruit.x && (this.head.x + this.head.width) >= (fruit.x + fruit.width)) && (this.head.y <= fruit.y && (this.head.y + this.head.height) >= (fruit.y + fruit.height))) {
      this.head.addNewChild();
      return true;
    }
    return false;
  }
  die() {
    return this.head.die();
  }
}

function initializeSnake() {
  snake = new Snake(20, 20);
}

function initializeFruit() {
  fruit = new Fruit();
}

class Fruit {
  constructor() {
    this.setNewPos();
    this.width = 10;
    this.height = 10;
  }
  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  setNewPos() {
    this.x = Math.floor((Math.random() * canvas.width + 1) / 20) * 20 + 5;
    this.y = Math.floor((Math.random() * canvas.height + 1) / 20) * 20 + 5;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.move();
  snake.draw();
  if (snake.die()) {
    deathSound.play();
    restartGame();
  }
  if (snake.eat(fruit)) {
    eatingSound.play();
    fruit.setNewPos();
  }
  fruit.draw();
}

function restartGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initializeSnake();
  initializeFruit();
}

function changeGameSpeed(gameSpeed = 1) {
  if (gameSpeed == 4) {
    updateTime = 50;
  } else if (gameSpeed == 2) {
    updateTime = 100;
  } else if (gameSpeed == 0.5) {
    updateTime = 400;
  } else {
    updateTime = 200;
  }
  clearInterval(interval);
  interval = setInterval(update, updateTime);
}

document.body.onload = loadGame();