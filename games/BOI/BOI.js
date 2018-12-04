var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var mainMenuScreen = document.getElementById("mainMenu");
var gameScreen = document.getElementById("game");
var updateTime, interval;
var player;
var tearImage = document.getElementById("tear");
var tears = [];



function load() {
  canvas.width = 600;
  canvas.height = 400;
  player = new Player();
  window.addEventListener('keydown', function (event) {
    var eventKey = event.which;
    if (eventKey == 37 || eventKey == 38 || eventKey == 39 || eventKey == 40 || eventKey == 90 || eventKey == 81 || eventKey == 83 || eventKey == 68) {
      player.press(eventKey);
    } else if (eventKey == 27) {
      showEscapeMenu();
    }
  });
  document.body.addEventListener('keyup', function (event) {
    var eventKey = event.which;
    if (eventKey == 37 || eventKey == 38 || eventKey == 39 || eventKey == 40 || eventKey == 90 || eventKey == 81 || eventKey == 83 || eventKey == 68) {
      player.release(eventKey);
    } else if (eventKey == 27) {
      hideEscapeMenu();
    }
  });
}

class Tear {
  constructor(xDir, yDir) {
    this.xDirection = xDir;
    this.yDirection = yDir;
    this.x = player.x;
    this.y = player.y;
  }

  update() {
    this.move();
    this.draw();
  }

  move() {
    this.x += this.xDirection;
    this.y += this.yDirection;
  }

  draw() {
    context.drawImage(tearImage, this.x, this.y);
  }
}

function createTear(tear) {
  tears.push(tear);
}

function mainMenu() {

}

function showEscapeMenu() {

}

function play() {
  mainMenuScreen.style.display = "none";
  gameScreen.style.display = "block";
  resetGame();

  updateTime = 10;
  interval = setInterval(update, updateTime);
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  for (var i = 0; i < tears.length; i++) {
    tears[i].update();
  }
}

function resetGame() {
  player.draw();
}

document.onload = load();