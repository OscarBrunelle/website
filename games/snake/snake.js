var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var eatingSound = new Audio('eating.mp3');
eatingSound.loop = false;
var deathSound = new Audio('death.mp3');
deathSound.loop = false;

var key;
var speedx;
var speedy;

var head;
var tail = [];
var fruit;

var updateTime = 100;

function move(direction) {
  if (direction == "up") {
    if (speedy != 1) {
      speedx = 0;
      speedy = -1;
    }
  } else if (direction == "left") {
    if (speedx != 1) {
      speedx = -1;
      speedy = 0;
    }
  } else if (direction == "down") {
    if (speedy != -1) {
      speedx = 0;
      speedy = 1;
    }
  } else if (direction == "right") {
    if (speedx != -1) {
      speedx = 1;
      speedy = 0;
    }
  }
}

function drawPlayground() {

  /*canvas.setAttribute("tabindex", "1");
  canvas.focus();*/
  canvas.style.background = "grey";

  document.body.addEventListener('keydown', function (event) {
    var key = event.key;
    if (key == "ArrowUp") {
      if (speedy != 1) {
        speedx = 0;
        speedy = -1;
      }
    } else if (key == "ArrowLeft") {
      if (speedx != 1) {
        speedx = -1;
        speedy = 0;
      }
    } else if (key == "ArrowDown") {
      if (speedy != -1) {
        speedx = 0;
        speedy = +1;
      }
    } else if (key == "ArrowRight") {
      if (speedx != -1) {
        speedx = +1;
        speedy = 0;
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

function Snake(xpos = 0, ypos = 0, isHead = false) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.isHead = isHead;
  this.setNewPos = function (xspeed, yspeed) {
    this.xpos += xspeed * 20;
    this.ypos += yspeed * 20;
  };
  this.draw = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(this.xpos + 1, this.ypos + 1, 18, 18);
  };
  this.eat = function (fruitX, fruitY) {
    if ((this.xpos <= fruitX && (this.xpos + 20) >= (fruitX + 10)) && (this.ypos <= fruitY && (this.ypos + 20) >= (fruitY + 10))) {
      return true;
    } else {
      return false;
    }
  };
  this.die = function () {
    if (this.xpos < 0 || this.xpos > canvas.width || this.ypos < 0 || this.ypos > canvas.height) {
      return true;
    } else {
      return false;
    }
  }
}

function initializeSnake() {
  speedx = 0;
  speedy = 0;
  head = new Snake(20, 20, true);
  head.draw();
  tail.push(head);
}

function addSnake(x, y) {
  var newS = new Snake(x, y);
  tail.push(newS);
}

function initializeFruit() {
  fruit = new Fruit();
  fruit.draw();
}

function Fruit() {
  this.x = Math.floor((Math.random() * canvas.width + 1) / 20) * 20 + 5;
  this.y = Math.floor((Math.random() * canvas.height + 1) / 20) * 20 + 5;
  this.draw = function () {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(this.x, this.y, 10, 10);
  };
  this.newFruit = function () {
    this.x = Math.floor((Math.random() * canvas.width + 1) / 20) * 20 + 5;
    this.y = Math.floor((Math.random() * canvas.height + 1) / 20) * 20 + 5;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = tail.length - 1; i >= 0; i--) {

    if (tail[i].isHead) {
      tail[i].setNewPos(speedx, speedy);
      tail[i].draw();
      if (tail[i].die()) {
        deathSound.play();
        restartGame();
        break;
      }
      if (tail[i].eat(fruit.x, fruit.y)) {
        eatingSound.play();
        addSnake(tail[tail.length - 1].xpos, tail[tail.length - 1].ypos);
        fruit.newFruit();
      }

    } else {
      tail[i].xpos = tail[i - 1].xpos;
      tail[i].ypos = tail[i - 1].ypos;
      tail[i].draw();
    }
  }
  fruit.draw();
}

function restartGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  tail = [];
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

var interval;
document.body.onload = drawPlayground();

/*TO DO:
snake dies if touches itself
controls with buttons
death sound
eating sound
*/