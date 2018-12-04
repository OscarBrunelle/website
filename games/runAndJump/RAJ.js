var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var mainMenuScreen = document.getElementById("mainMenu");
var gameScreen = document.getElementById("game");
var updateTime, interval;
var player;
var tears = [];

function load() {
  canvas.width = 600;
  canvas.height = 400;
  player = new Player();
}

function play() {
  mainMenuScreen.style.display = "none";
  gameScreen.style.display = "block";

  attachEventListeners();

  resetGame();

  updateTime = 10;
  interval = setInterval(update, updateTime);
}

function attachEventListeners(){
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