var welcomeScreen = document.getElementById("welcomeScreen");
var gameScreen = document.getElementById("gameScreen");
var levelSelectionScreen = document.getElementById("levelSelectionScreen");
var topBar = document.getElementById("topBar");
var canvasDiv = document.getElementById("canvasDiv");
var bottomBar = document.getElementById("bottomBar");
var image = document.getElementById("image");
var groundImage = document.getElementById("groundImage");
var pathImage = document.getElementById("pathImage");
var monster1Image = document.getElementById("monster1Image");
var monster2Image = document.getElementById("monster2Image");
var classicImage = document.getElementById("classic");
var sniperImage = document.getElementById("sniper");
var fireImage = document.getElementById("fire");
var freezerImage = document.getElementById("freezer");
var moneyText = document.getElementById("money");
var waveText = document.getElementById("wave");
var timeText = document.getElementById("time");
var livesText = document.getElementById("lives");
var canvas;
var context;


var numberOfLevels = 3;
var timeBetweenWaves = 250;
var wave = 1;

var levelSelected = 1;
var pathCoord = [];
var playground = [];
var playgroundLine = [];

var nbrEnemiesKilled = 0;
var nbrLives = 10;
var money = 250;

var spawnIndex =0;// -250;
var nbrEnemiesSpawned = 0;

function initializeCanvas() {
  welcomeScreen.style.display = "none";
  gameScreen.style.display = "block";
  canvas = document.createElement("canvas");
  canvas.setAttribute("width", "768px");
  canvas.setAttribute("height", "640px");
  canvas.setAttribute("onclick", "addTower(event)");
  canvasDiv.appendChild(canvas);
  context = canvas.getContext("2d");
  drawPlayground();
  getPath();
  window.setInterval(update, 50);
}

function drawPlayground() {
  var newTile;
  var x = 0;
  var y = 0;

  for (var i = 0; i < 12; i++) {
    playgroundLine = [];
    for (var j = 0; j < 10; j++) {
      x = i * 64;
      y = j * 64;
      if (i == 5 && (j == 0 || j == 1 || j == 2 || j == 7 || j == 8 || j == 9)) {
        newTile = new createTile("path", x, y);
        newTile.draw();
      } else if (i == 6 && (j == 2 || j == 6 || j == 7)) {
        newTile = new createTile("path", x, y);
        newTile.draw();
      } else if (i == 7 && (j == 2 || j == 3 || j == 4 || j == 5 || j == 6)) {
        newTile = new createTile("path", x, y);
        newTile.draw();
      } else {
        newTile = new createTile("ground", x, y);
        newTile.draw();
      }
    }
  }
}

function createTile(tileImage = "ground", x = 0, y = 0, width = 64, height = 64, fill = "gray", stroke = "skyblue", strokeWidth = 2) {
  this.tileImage = tileImage;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fill = fill;
  this.stroke = stroke;
  this.strokeWidth = strokeWidth;
  this.draw = function() {
    /*context.beginPath();
    context.fillStyle=this.fill;
    context.strokeStyle=this.stroke;
    context.lineWidth=this.strokewidth;
    context.rect(x,y,this.width,this.height);
    context.stroke();
    context.fill();*/
    if (this.tileImage == "ground") {
      this.tileImage = groundImage;
    } else if (this.tileImage == "path") {
      this.tileImage = pathImage;
    }
    context.drawImage(this.tileImage, this.x, this.y, this.width, this.height);
  };
}

function getPath() {
  if (levelSelected == 1) {
    pathCoord = [
      [5, 0],
      [5, 1],
      [5, 2],
      [6, 2],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [6, 6],
      [6, 7],
      [5, 7],
      [5, 8],
      [5, 9]
    ];
  }
}

function spawn() {
  if (spawnIndex == (25 - wave) && nbrEnemiesSpawned < (10 + wave * 5)) {
    spawnIndex = 0;
    addEnemy();
    nbrEnemiesSpawned++;
  } else if (nbrEnemiesSpawned == (10 + wave * 5)) {
    if (wave == 10) {
      alert("You win!");
    } else {
      nbrEnemiesSpawned = 0;
      spawnIndex = (-1) * timeBetweenWaves;
      wave++;
    }
  } else {
    spawnIndex++;
  }
}

function update() {
  moneyText.textContent = "Money: " + money + "$";
  timeText.textContent = "Time: " + spawnIndex + "";
  waveText.textContent = "Wave: " + wave + "/10";
  livesText.textContent = "Lives: " + nbrLives + " <3";
  spawn();
  var enemyFoundIndex = -1;
  var towerDamage = 0;
  var towerDebuff = 0;

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].debuffEffects();
    if (enemies[i].move()) {
      enemies.splice(i, 1);
      nbrLives--;
      i--;
    }
  }

  for (var i = 0; i < towers.length; i++) {
    enemyFoundIndex = towers[i].findEnemy();
    towerDamage = towers[i].damage;
    towerDebuff = towers[i].debuff;
    if (enemyFoundIndex == -1) {
      continue;
    } else {
      enemies[enemyFoundIndex].applyDebuff(towerDebuff);
      if (enemies[enemyFoundIndex].die(towerDamage)) {
        money += enemies[enemyFoundIndex].value;
        moneyText.textContent = "Money: " + money + "$";
        enemies.splice(enemyFoundIndex, 1);
        nbrEnemiesKilled++;
      }
    }
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayground();
  drawTowers();
  drawEnemies();
  drawBullets();
}

function drawTowers() {
  for (var i = 0; i < towers.length; i++) {
    towers[i].draw();
  }
}

function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}

function drawBullets() {
  /*if (true) {
    continue;
  }*/
}

/*
document.onload = initializeCanvas();
*/








function startGame() {
  welcomeScreen.style.display = "none";
  levelSelectionScreen.style.display = "block";

  var levelString;
  var levelImage;

  for (var i = 1; i < numberOfLevels + 1; i++) {
    levelString = "level" + (i);
    levelImage = document.createElement("img");
    levelImage.setAttribute("src", levelString + ".png");
    levelImage.setAttribute("alt", "Level " + (i));
    levelImage.setAttribute("onclick", "selectLevel(" + i + ")");
    levelSelectionScreen.appendChild(levelImage);
  }
}

function selectLevel(levelSelected) {
  levelSelectionScreen.style.display = "none";
}

/*
function createImages() {
  var imagesScreen = document.getElementById("images");
  monster1Image = document.createElement("img");
  monster2Image = document.createElement("img");
  monster1Image.setAttribute("src", "images/monster1.png");
  monster2Image.setAttribute("src", "images/monster2.png");
  monster1Image.setAttribute("alt", "Monster 1");
  monster1Image.setAttribute("alt", "Monster 2");
  imagesScreen.appendChild(monster1Image);
  imagesScreen.appendChild(monster2Image);

  groundImage = document.createElement("img");
  pathImage = document.createElement("img");
  groundImage.setAttribute("src", "images/ground.png");
  pathImage.setAttribute("src", "images/path.png");
  groundImage.setAttribute("alt", "Ground");
  pathImage.setAttribute("alt", "Path");
  imagesScreen.appendChild(groundImage);
  imagesScreen.appendChild(pathImage);
}*/

/*context.beginPath();
context.lineWidth = "1";
context.fillStyle = "blue";
context.rect(x, y, 64, 64);
context.fill();*/
/*context.beginPath();
context.lineWidth = "1";
context.strokeStyle = "blue";
context.rect(x, y, 64, 64);
context.stroke();*/
