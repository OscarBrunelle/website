var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var updateTime;
var players = [],
  nbrPlayers;
var bubbles = [];
var laser1, laser2;
var imagePlayer1 = document.getElementById('imagePlayer1');
var imagePlayer2 = document.getElementById('imagePlayer2');
var bottom, levelTop;
var level;
var optionsMenuIsDisplayed = false,
  gameIsRunning, gameIsLaunched;

function loadGame(nbrPlayersChosen) {

  /*canvas.setAttribute("tabindex", "1");
  canvas.focus();*/
  gameIsRunning = true;
  gameIsLaunched = true;
  document.getElementById('optionsMenu').style.display = "none";
  optionsMenuIsDisplayed = false;
  document.getElementById('mainMenu').style.display = "none";
  document.getElementById('game').style.display = "block";
  canvas.style.background = "grey";
  canvas.width = window.innerWidth - 30;
  canvas.height = window.innerHeight - 30;
  bottom = canvas.height / 1.25;
  levelTop = 0;
  context.fillStyle = "rgb(0,0,0)";
  level = 1;
  nbrPlayers = nbrPlayersChosen;
  for (let i = 0; i < nbrPlayers; i++) {
    players.push(new Player(i + 1));
  }
  reset();
  window.addEventListener('keydown', function (event) {
    var key = event.which;
    if (key == 27) { //escape
      toggleOptionsMenu();
    }
    if (key == 37) {
      players[0].setMovement(0);
    } else if (key == 38) {
      players[0].shoot();
    } else if (key == 39) {
      players[0].setMovement(1);
    }
    if (nbrPlayers > 1) {
      if (key == 81) {
        players[1].setMovement(0);
      } else if (key == 90) {
        players[1].shoot();
      } else if (key == 68) {
        players[1].setMovement(1);
      }
    }
  });
  window.addEventListener('keyup', function (event) {
    var key = event.which;
    if (key == 37 || key == 39) {
      players[0].setMovement(2);
    }
    if (nbrPlayers > 1) {
      if (key == 81 || key == 68) {
        players[1].setMovement(2);
      }
    }
  });
  updateTime = 15;
  interval = setInterval(update, updateTime);
}

function update() {
  if (!gameIsRunning) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(0, bottom);
  context.lineTo(canvas.width, bottom);
  context.stroke();
  for (let playerNum = 0; playerNum < nbrPlayers; playerNum++) {
    players[playerNum].update();
  }
  for (let i = 0; i < bubbles.length; i++) {
    bubble = bubbles[i];
    bubble.update();
    for (let playerNum = 0; playerNum < nbrPlayers; playerNum++) {
      player = players[playerNum];
      if (bubble.collideWithPlayer(player)) {
        alert("You lose player " + (playerNum + 1));
        player.lives--;
        if (player.lives > 0) {
          reset();
        } else {
          players.splice(playerNum, 1);
          playerNum--;
        }
        if (players.length == 0) {
          alert("You lost");
          stopGame();
          loadMainMenu();
          break;
        }
      } else if (player.laser != null && bubble.collideWithLaser(player.laser)) {
        player.laser = null;
        if (!bubble.type == 0) {
          bubbles.push(new Bubble(bubble.type - 1, bubble.x, bubble.y, "left", true));
          bubbles.push(new Bubble(bubble.type - 1, bubble.x, bubble.y, "right", true));
        }
        bubbles.splice(i, 1);
        i--;
        if (bubbles.length == 0) {
          alert("You won");
          level++;
          reset();
        }
      }
    }
  }
}

function stopGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  interval = null;
  gameIsRunning = false;
  gameIsLaunched = false;
}

function toggleOptionsMenu() {
  if (optionsMenuIsDisplayed) {
    document.getElementById('optionsMenu').style.display = "none";
    optionsMenuIsDisplayed = false;
    if (gameIsLaunched) {
      gameIsRunning = true;
    }
  } else {
    document.getElementById('optionsMenu').style.display = "block";
    optionsMenuIsDisplayed = true;
    gameIsRunning = false;
  }
}

function loadMainMenu(from = "game") {
  if (from == "button") {
    toggleOptionsMenu();
    mainMenu.style.display = "block";
  } else {
    document.getElementById('game').style.display = "none";
    document.getElementById('optionsMenu').style.display = "none";
    mainMenu.style.display = "block";
  }
  stopGame();
}

function reset() {
  bubbles = [];
  for (let playerNum = 0; playerNum < nbrPlayers; playerNum++) {
    players[playerNum].reset();
  }
  loadLevel(level);
}

function nextLevel() {
  level++;
  reset();
}

function loadLevel(num) {
  let tier = canvas.width / 3;
  switch (num) {
    case 1:
      bubbles.push(new Bubble(1, tier, 200, "left"));
      bubbles.push(new Bubble(1, 2 * tier, 200));
      bottom = canvas.height / 1.25;
      levelTop = 0;
      break;
    case 2:
      bubbles.push(new Bubble(2, tier, 50, "left"));
      bubbles.push(new Bubble(2, 2 * tier, 50));
      bottom = canvas.height / 1.25;
      levelTop = 0;
      break;
    case 3:
      bubbles.push(new Bubble(4, tier, 100, "right"));
      bottom = canvas.height / 1.25;
      levelTop = 0;
      break;
    case 4:
      bubbles.push(new Bubble(3, tier, 200, "left"));
      bubbles.push(new Bubble(3, 2 * tier, 200));
      bottom = canvas.height / 1.25;
      levelTop = 0;
      break;
    case 5:
      bubbles.push(new Bubble(3, tier, 200, "left"));
      bubbles.push(new Bubble(4, 2 * tier, 200));
      //mur
      bottom = canvas.height / 1.25;
      levelTop = 0;
      break;
    case 6:
      bubbles.push(new Bubble(1, tier - 45, 200, "left"));
      bubbles.push(new Bubble(1, tier - 15, 200, "left"));
      bubbles.push(new Bubble(1, tier + 15, 200, "left"));
      bubbles.push(new Bubble(1, tier + 45, 200, "left"));
      bubbles.push(new Bubble(1, 2 * tier - 45, 200, "right"));
      bubbles.push(new Bubble(1, 2 * tier - 15, 200, "right"));
      bubbles.push(new Bubble(1, 2 * tier + 15, 200, "right"));
      bubbles.push(new Bubble(1, 2 * tier + 45, 200, "right"));
      bottom = canvas.height / 1.25;
      levelTop = 0;
      break;
    case 7:
      bubbles.push(new Bubble(0, tier - 180, 200, "left"));
      bubbles.push(new Bubble(0, tier - 160, 200, "left"));
      bubbles.push(new Bubble(0, tier - 140, 200, "left"));
      bubbles.push(new Bubble(0, tier - 60, 200, "left"));
      bubbles.push(new Bubble(0, tier - 40, 200, "left"));
      bubbles.push(new Bubble(0, tier - 20, 200, "left"));
      bubbles.push(new Bubble(0, 2 * tier - 180, 200, "right"));
      bubbles.push(new Bubble(0, 2 * tier - 160, 200, "right"));
      bubbles.push(new Bubble(0, 2 * tier - 140, 200, "right"));
      bubbles.push(new Bubble(0, 2 * tier - 60, 200, "right"));
      bubbles.push(new Bubble(0, 2 * tier - 40, 200, "right"));
      bubbles.push(new Bubble(0, 2 * tier - 20, 200, "right"));
      bottom = canvas.height / 1.25;
      levelTop = 0;
      break;
    default:
      loadMainMenu();
      break;
  }
}

document.body.onload = loadMainMenu;